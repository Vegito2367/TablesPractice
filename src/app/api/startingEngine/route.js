"use server"
import { createEngine} from "@/utils/mathExport";

export async function POST(request){
    const body = await request.json();
    try{
        const response = createEngine(body.attemptSlug,body.constraints);
    }
    catch(e){
        console.log(e);
        return Response.json({status: 400, response: "Unknown Error occured!"});
    }
    
    return Response.json({status: 200, response: "Engine created successfully"});
}

