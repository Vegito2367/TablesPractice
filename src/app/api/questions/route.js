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

            console.log(engine)
            return NextResponse.json({status:200, payload: engine.types});
            
        }
        
        return NextResponse.json({status:400, response: "Invalid slug"})

    }
    catch(e){
        console.log(e);
        return NextResponse.json({status:400, response: "Unknown Error occured!"});
    }
}