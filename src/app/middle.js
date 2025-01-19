"use server"
import { validateServerLogin } from "@/utils/actions";
import { createClient } from "@/utils/client";
export default async function validateLogin(){
    const {status, response} = await validateServerLogin();
    return {status, response}
}