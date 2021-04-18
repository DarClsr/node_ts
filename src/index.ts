import express, { NextFunction, Request,Response } from "express";
import router from "./router";
import path from "path";
import BodyParser from "body-parser";
import { initIo } from "./socket";

const app:any=express();

app.use(BodyParser.urlencoded({extended:true,limit:"5mb"}))
app.use(BodyParser.json());

app.use(router);






app.use((req:Request,res:Response,next:NextFunction)=>{
    req.username="iwan";
    next();
})
app.use(express.static(path.join(__dirname,"../../public")));




const server=app.listen(3000,()=> console.log("server is running"));



initIo(server)

  




