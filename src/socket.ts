import { SocketType } from "node:dgram";
import {Server, Socket} from "socket.io"


let io:any="";

let userCount=0;


export  const initIo=(server:any)=>{
    io=new Server(server)
    io.on("connection",(socket:Socket)=>{
        socket=socket;
        socket.on("send",(data:any)=>{
        //  谁发送消息谁接受
        //  socket.emit("send_msg",data)
        //  广播 则是 除了自己 所有的客户端都可以收到
          socket.broadcast.emit("send_msg",data)
        })

        socket.on("join",({name}:{name:string})=>{
            userCount++;
            console.log("join",name)
            socket.broadcast.emit("join_msg",{
                text:`a user ${name} join the chat`,
                count:userCount
            })

        })
    })


}











