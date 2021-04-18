import { Config, ConfigModel } from "./config"
import { serialize, addUrl,serializeJson } from "./utils"
import { HTTP_GET,CONTENTTYPE_FORM_URLENCODED,CONTENTTYPE_JSON } from "./constans"


class Axios {
    private ajax: XMLHttpRequest = new XMLHttpRequest();
    options: ConfigModel;
    url: string = "";
    constructor(url: string, options: ConfigModel = Config) {
        this.url = url;
        this.options = options;
    }
    // 初始化ajax
    init() {
        //绑定ajax监听状态
        this.bindEvents()

        const { method } = this.options;

        // 开始请求

        this.ajax.open(method, this.addParams(), true);


        //  设置请求头

        this.setResponseType()


        // 设置超时时间


        this.setTimeout();


        // 发送数据

        this.sendData()
    }

    setTimeout() {
        const { timeout } = this.options;
        this.ajax.timeout = timeout;

    }

    setResponseType() {
        const { responseType } = this.options;
        this.ajax.responseType = (responseType as any);
    }

    sendData() {

        // 判断是否需要发送数据

        if(!this.isSendData){
           this.ajax.send(null);

           return false;
        }


        // 需要发送数据
        const {body}=this.options

        let sendData:any=null;

        if(this.isFormData){
            sendData=body;
        }else if(this.isFormUrlEncoded){
            sendData=serialize(body);
        }else if(this.isjSON){
            sendData=serializeJson(body);

        }
        this.ajax.send(sendData)
    }
    get isFormUrlEncoded(){
        return this.options.contentType.includes(CONTENTTYPE_FORM_URLENCODED.toUpperCase());
    }
    get isjSON(){
        return this.options.contentType.includes(CONTENTTYPE_JSON.toUpperCase());

    }
    
    get isSendData() {
        const { method, body } = this.options;
        if (!body) return null;
        if (method.toUpperCase === HTTP_GET.toUpperCase) return null;

        return true;
    }

    get isFormData() {
        return this.options.body instanceof FormData;
    }

    addParams(): string {
        const paramsString: string = serialize(this.options);
        return addUrl(this.url, paramsString)
    }

    bindEvents() {

        const xhr = this.ajax;
        const { success, httpError, error, timeOut, abort } = this.options;

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200) {
                success()
            } else {
                httpError()
            }
        })

        xhr.addEventListener("error", () => {
            error(xhr)
        })

        xhr.addEventListener("timeout", () => {
            timeOut(xhr);
        })

        xhr.addEventListener("abort", () => {
            abort(xhr);
        })
    }


}

export default Axios;