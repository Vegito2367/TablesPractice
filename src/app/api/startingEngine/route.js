"use server"
import { createEngine} from "@/utils/mathExport";
import { deleteEngine } from "@/utils/mathExport";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();
    try{
        const response = await createEngine(body.attemptSlug,body.constraints);
        console.log(response);
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status: 400, response: "Unknown Error occured!"});
    }
    
    return NextResponse.json({status: 200, response: "Engine created successfully"});
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

