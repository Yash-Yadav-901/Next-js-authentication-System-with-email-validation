import { tree } from "next/dist/build/templates/app-page";
import { NextRequest , NextResponse} from "next/server";


export async function GET() {
    try {
        const response= NextResponse.json({
            message: "logout success fully!",
            success: true
        })

        response.cookies.set("token", "",{
            httpOnly: true, expires: new Date(0)
        })

        return response;
        
    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


