"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIo = void 0;
var socket_io_1 = require("socket.io");
var io = "";
var userCount = 0;
var initIo = function (server) {
    io = new socket_io_1.Server(server);
    io.on("connection", function (socket) {
        socket = socket;
        socket.on("send", function (data) {
            //  谁发送消息谁接受
            //  socket.emit("send_msg",data)
            //  广播 则是 除了自己 所有的客户端都可以收到
            socket.broadcast.emit("send_msg", data);
        });
        socket.on("join", function (_a) {
            var name = _a.name;
            userCount++;
            console.log("join", name);
            socket.broadcast.emit("join_msg", {
                text: "a user " + name + " join the chat",
                count: userCount
            });
        });
    });
};
exports.initIo = initIo;
