"use server"
import { validateServerLogin } from "@/utils/actions";
export default async function validateLogin(){
    const {status, response} = await validateServerLogin();
    return {status, response}
}


