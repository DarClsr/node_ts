export interface ConfigModel {
    method: string
    params: {
        [key: string]: any
    } | null
    body: {
        [key: string]: any
    } | null
    timeout: number
    success: Function
    error: Function
    timeOut: Function
    abort: Function
    httpError: Function,
    responseType: string,
    contentType:string
}


export const Config: ConfigModel = {
    method: "GET",
    params: null,
    body: null,
    timeout: 0,
    success() {

    },
    error() {

    },
    abort() {

    },
    timeOut() {

    },
    responseType: "text",
    contentType:"application/json",

    httpError() {

    }
}