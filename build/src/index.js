"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var socket_1 = require("./socket");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "5mb" }));
app.use(body_parser_1.default.json());
app.use(router_1.default);
app.use(function (req, res, next) {
    req.username = "iwan";
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
var server = app.listen(3000, function () { return console.log("server is running"); });
socket_1.initIo(server);
