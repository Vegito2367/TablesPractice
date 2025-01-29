import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";
//POSSIBLE EDGE CASE: REPEATED ATTEMPT IDs for MULTIPLE USERS.
export async function GET(request){
    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");
    const attemptID = url.searchParams.get("attemptID");
    const supabase = await createClient();
    try{
        const {data , error, status, statusText} = await supabase
        .from("Attempts")
        .select("*")
        .eq("user_id",userID)
        .eq("id",attemptID)

        if(data){
            const {data,error,status,statusText} = await supabase
            .from("Question")
            .select("*")
            .eq("attempt_id",attemptID)

            if(status>=200 && status<300){
                return NextResponse.json({status:200, payload: data, response: "Questions found"});
            }
            else{
                throw new Error(`Questions not found for attempt ${attemptID} with following status message:${statusText}`);
            }
        }
        else{
            throw new Error(`Attempt ${attemptID} not found for user ${userID} with following status message:${statusText}`);
        }
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status:500, response: e.message});
    }
}