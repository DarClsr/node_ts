import { Router, Request, Response } from "express";
import {  readdirSync } from "fs";
import { resolve } from "path";

interface LoginBody {
    password:string
    username:string
}

interface RequestWithBody extends Request {
    body:LoginBody
}

const router = Router();

router.get("/getData", async (req: Request, res: Response) => {
    const files=readdirSync(resolve(__dirname,"../../public/pages"));
    res.send(files);
})

router.post("/login", async (req: RequestWithBody, res: Response) => {

    const { password, username } = req.body;

    if (password == "123" && username == "iwan") {
        res.send("login success")
    } else {
        res.redirect("/")
    }

})


export default router;