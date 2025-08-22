import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { getUserData } from "@/helper/getUserData";
import connect from "@/DBconfig/dbconfig";

connect();

export async function GET(request: NextRequest){
        try {

            const userId= await getUserData(request);
            const user=await User.findById({_id: userId}).select("-password");

            return NextResponse.json({
                message: "user found",
                data: user
            })

            
        } catch (error:any) {
            return NextResponse.json({error: error.message}, {status: 400})
        }
}