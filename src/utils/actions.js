"use server"
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";
export async function attemptSignup(data) {

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(data)
    if (error) {
        return {status: 400, response: error.message}
        console.log(error)
    }

    return {status: 200, response: "Sign up successful" }
}

export async function attemptLogin(data) {
    console.log(data)
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        return {status: 400, response: error.message}
    }
    
    return {status: 200, response: "Login successful"}
} 