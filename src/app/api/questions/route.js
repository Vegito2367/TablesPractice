import { getMathEngine } from "@/utils/mathExport";
import { NextResponse } from "next/server";

export async function GET(request){
    const url = new URL(request.url);
    const attemptSlug = url.searchParams.get("slug");
    console.log(attemptSlug)
    try{
        if(attemptSlug){
            const engine = getMathEngine(attemptSlug);
            const qTypes = engine.getTypes;
            Response.json({status:200, response: qTypes});
        }
        
        NextResponse.json({status:400, response: "Invalid slug"})

    }
    catch(e){
        console.log(e);
        Response.json({status:400, response: "Unknown Error occured!"});
    }
}