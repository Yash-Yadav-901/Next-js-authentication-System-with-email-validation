import connect from "@/DBconfig/dbconfig";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken"
import { NextRequest } from "next/server";

connect();

export const getUserData=(request: NextRequest)=>{
        try {
            const token= request.cookies.get("token")?.value || "";
            const decodeToken:any= jwt.verify(token, process.env.TOKEN_SECRECT!);
            return decodeToken.id;
        } catch (error:any) {
            throw   new Error(error.message);
        }
}