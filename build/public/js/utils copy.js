"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeJson = exports.addUrl = exports.serialize = void 0;
var serialize = function (params) {
    var result = [];
    for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        result.push(key + "=" + value);
    }
    return result.join("&");
};
exports.serialize = serialize;
var addUrl = function (url, params) {
    if (!params)
        return "";
    var mark = url.includes("?") ? "&" : "?";
    return "" + url + mark + params;
};
exports.addUrl = addUrl;
var serializeJson = function (body) {
    return JSON.stringify(body);
};
exports.serializeJson = serializeJson;
