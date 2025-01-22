import { getMathEngine } from "@/utils/mathExport";
import { NextResponse } from "next/server";

export async function GET(request){
    const url = new URL(request.url);
    const attemptSlug = url.searchParams.get("slug");
    console.log("question GET Request",attemptSlug)
    try{
        if(attemptSlug){
            const data = await getMathEngine(attemptSlug);
            const engine = await data.object;

            if(engine){
                return NextResponse.json({status:200, payload: engine.types});
            }
            else{
                return NextResponse.json({status:400, response: "Engine not found - Try reloading dashboard and try again"});
            }
            
        }
        
        return NextResponse.json({status:400, response: "Invalid slug"})

    }
    catch(e){
        console.log(e);
        return NextResponse.json({status:400, response: "Unknown Error occured!"});
    }
}