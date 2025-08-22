import connect from '@/DBconfig/dbconfig';
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { use } from 'react';


connect();


export async function POST(request: NextRequest) {
    try{
        const reqBody= await request.json();
        const {email, password}= reqBody;
        
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "user not found"}, {status: 400});
        }

        const isValidPassword= await bcryptjs.compare(password, user.password);
        if(!isValidPassword){
            return NextResponse.json({error: "invalid password!"}, {status: 400});
        }

        const tokenData={
            id: user._id,
            username:user.username,
            email: user.email
        }

        const token= await jwt.sign(tokenData, process.env.TOKEN_SECRECT!, {expiresIn: "1h"});
        

        const response= NextResponse.json({message:"user login successfully!", success: true}, {status: 200});

        response.cookies.set("token",token,{
            httpOnly: true
        })

        return response;
    }
    catch(error: any){
            return NextResponse.json({error: error.message}, {status: 500});
    }
}