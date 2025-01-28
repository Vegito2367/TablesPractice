import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";
export async function GET(request) {
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");
    const supabase = await createClient();
    try{
        const {data , error, status, statusText} = await supabase
        .from("Attempts")
        .select("id, created_at, total_questions, num_correct")
        .eq("user_id",userID)

        console.log("Attempts", statusText, data)
        if(status===200){
            return NextResponse.json({status:200, payload: data});
        }
        else{
            return NextResponse.json({status:status, response: statusText});
        }
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status:400, response: "Unknown Error occured!"});
    }
    
    
}