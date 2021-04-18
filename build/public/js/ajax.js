"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var utils_1 = require("./utils");
var constans_1 = require("./constans");
var Axios = /** @class */ (function () {
    function Axios(url, options) {
        if (options === void 0) { options = config_1.Config; }
        this.ajax = new XMLHttpRequest();
        this.url = "";
        this.url = url;
        this.options = options;
    }
    // 初始化ajax
    Axios.prototype.init = function () {
        //绑定ajax监听状态
        this.bindEvents();
        var method = this.options.method;
        // 开始请求
        this.ajax.open(method, this.addParams(), true);
        //  设置请求头
        this.setResponseType();
        // 设置超时时间
        this.setTimeout();
        // 发送数据
        this.sendData();
    };
    Axios.prototype.setTimeout = function () {
        var timeout = this.options.timeout;
        this.ajax.timeout = timeout;
    };
    Axios.prototype.setResponseType = function () {
        var responseType = this.options.responseType;
        this.ajax.responseType = responseType;
    };
    Axios.prototype.sendData = function () {
        // 判断是否需要发送数据
        if (!this.isSendData) {
            this.ajax.send(null);
            return false;
        }
        // 需要发送数据
        var body = this.options.body;
        var sendData = null;
        if (this.isFormData) {
            sendData = body;
        }
        else if (this.isFormUrlEncoded) {
            sendData = utils_1.serialize(body);
        }
        else if (this.isjSON) {
            sendData = utils_1.serializeJson(body);
        }
        this.ajax.send(sendData);
    };
    Object.defineProperty(Axios.prototype, "isFormUrlEncoded", {
        get: function () {
            return this.options.contentType.includes(constans_1.CONTENTTYPE_FORM_URLENCODED.toUpperCase());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Axios.prototype, "isjSON", {
        get: function () {
            return this.options.contentType.includes(constans_1.CONTENTTYPE_JSON.toUpperCase());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Axios.prototype, "isSendData", {
        get: function () {
            var _a = this.options, method = _a.method, body = _a.body;
            if (!body)
                return null;
            if (method.toUpperCase === constans_1.HTTP_GET.toUpperCase)
                return null;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Axios.prototype, "isFormData", {
        get: function () {
            return this.options.body instanceof FormData;
        },
        enumerable: false,
        configurable: true
    });
    Axios.prototype.addParams = function () {
        var paramsString = utils_1.serialize(this.options);
        return utils_1.addUrl(this.url, paramsString);
    };
    Axios.prototype.bindEvents = function () {
        var xhr = this.ajax;
        var _a = this.options, success = _a.success, httpError = _a.httpError, error = _a.error, timeOut = _a.timeOut, abort = _a.abort;
        xhr.addEventListener("load", function () {
            if (xhr.status >= 200) {
                success();
            }
            else {
                httpError();
            }
        });
        xhr.addEventListener("error", function () {
            error(xhr);
        });
        xhr.addEventListener("timeout", function () {
            timeOut(xhr);
        });
        xhr.addEventListener("abort", function () {
            abort(xhr);
        });
    };
    return Axios;
}());
exports.default = Axios;
