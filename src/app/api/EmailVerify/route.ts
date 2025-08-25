import connect from "@/DBconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";


await connect;


export async function POST(request: NextRequest){
    const reqBody=await request.json();

    const {email}=reqBody;

    if(email.length <= 0){
        return NextResponse.json({error:"on email found please fill the email!"}, {status: 400});
    }

    try{

        const user=await User.findOne({email: email});
        if(!user){
            return NextResponse.json({
                message:"User Not found!",
                data: false
            })
        }

          await sendEmail({email:user.email, emailType: "ResetPassword", userId: user._id});

        return NextResponse.json({
            message:"User found!",
            data: true
        })
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}