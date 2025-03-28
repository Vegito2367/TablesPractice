import { getMathEngine } from "@/utils/mathExport";
import { NextResponse } from "next/server";

export async function GET(request){
    const url = new URL(request.url);
    const attemptSlug = url.searchParams.get("slug");
    const operation = url.searchParams.get("operation");
    console.log("question GET Request",attemptSlug)
    try{
        if(attemptSlug){
            const data = await getMathEngine(attemptSlug);
            const engine = await data.object;
            if(engine){
                const res = await engine.generateQuestion(operation);
                if(res){
                    return NextResponse.json({status:200, response: "Question found", payload: res.response});
                }
                else{
                    return NextResponse.json({status:404, response: "Question not found - Try again with a new attempt"});
                }
            }
            
            else{
                return NextResponse.json({status:404, response: "Engine not found - Try reloading dashboard and try again"});
            }
            
        }
        
        return NextResponse.json({status:400, response: "Invalid slug"})

    }
    catch(e){
        console.log(e);
        return NextResponse.json({status:400, response: "Unknown Error occured!"});
    }
}