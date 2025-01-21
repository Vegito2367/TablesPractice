"use server"
import { MathEngine } from "@/utils/math";

export async function POST(request){
    const outRequest = await request.json();
    const {status, response} = await MathEngine(outRequest)
    return Response.json({status, response})
}