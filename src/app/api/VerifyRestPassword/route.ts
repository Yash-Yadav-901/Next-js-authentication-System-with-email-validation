import connect from "@/DBconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        console.log("Received token:", token);

        const user = await User.findOne({
            forgetPasswordToken: token,
            forgetPasswordTokenExpiry: { $gt: Date.now() }
        });

        console.log(user);
        if (!user) {

            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }


        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        user.password=hashedPassword;


        await user.save();

        return NextResponse.json({
            message: "verified successfully",
            success: true,
        });
    } catch (error: any) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}