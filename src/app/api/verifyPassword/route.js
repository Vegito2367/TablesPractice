import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const password = body.password;
    if (!password) {
        return NextResponse.json({ status: 400, response: "Invalid password" });
    }
    try{
        const currentPassword = process.env.NEXT_DEVELOPER_PASSWORD;
        console.log(currentPassword)
        if(password===currentPassword){
            return NextResponse.json({ status: 200, response: "Password verified" });
        }
        else{
            return NextResponse.json({ status: 400, response: "Invalid password" });
        }
    }
    catch{
        console.log(e);
        return NextResponse.json({ status: 400, response: "Unknown Error occured!" });
    }
    
    
}