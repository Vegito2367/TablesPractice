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


export async function validateLogin(){
    const supabase = await createClient();
    const {data ,error} = await supabase.auth.getUser();
    if(error || !data){
        return {status: 400, response: "User not logged in"}
    }
    else{
        return {status: 200, response: data}
    }
    
}


export async function Logout() {
    const supabase = await createClient();
    const {data,error} = await supabase.auth.signOut();
    if(error){
        return {status: 400, response: error.message}
    }
    else{
        return {status: 200, response: "Logout successful"}
    }
}