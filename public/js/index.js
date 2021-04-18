import Axios from "./ajax.js";
export const axios = (url, options) => {
    new Axios(url, options)
}

export const getDom = (name) => {
    const doms = document.querySelectorAll(name);

    if (doms.length > 1) {
        return doms
    } else {
        return doms[0];
    }
}



