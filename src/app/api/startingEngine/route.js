"use server"
import { createEngine} from "@/utils/mathExport";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();
    const slug = body.attemptSlug;
    const cons = body.constraints;

    if(!slug || !cons){
        return NextResponse.json({status: 400, response: "Invalid attempt slug or constraints, please try again"});
    }
    try{
        const response = await createEngine(slug,cons);
        console.log(response);
        return NextResponse.json({status: 200, response: response.message});
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status: 400, response: "Unknown Error occured!"});
    }
    
    
}


export async function DELETE(request){
    const url = new URL(request.url);
    const attemptSlug = url.searchParams.get("slug");

    try{
        if(!attemptSlug){
            return Response.json({status: 400, response: "Invalid slug"});
        }
        const message = await deleteEngine(attemptSlug);
        if(message === "Engine deleted successfully"){
            return Response.json({status: 200, response: message});
        }
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status: 400, response: "Unknown Error occured!"});
    }
}

