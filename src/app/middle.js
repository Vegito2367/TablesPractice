"use server"
import { validateServerLogin } from "@/utils/actions";
import { createClient } from "@/utils/client";
import { MathEngine } from "@/utils/math";
export default async function validateLogin(){
    const {status, response} = await validateServerLogin();
    return {status, response}
}


export async function sendMathProps(props){
    const { status, response } = await MathEngine(props)
    return {status, response}
}