"use server"
import { redirect } from "next/navigation";
import { createClient } from "./server";
export async function attemptSignup(signUpdata) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp(signUpdata)
    if (error) {
        return {status: 400, response: error.message}
        console.log(error)
    }

    console.log(data.user)
    try{
        const {insertError}  = await supabase
                    .from("userTable")
                    .insert({user_id:data.user.id, created_at: data.user.created_at, email:data.user.email})
    }
    catch(err){
        console.log(err)
    }
    

    return {status: 200, response: "Sign up successful" }
}

export async function attemptLogin(data) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        return {status: 400, response: error.message}
    }
    
    return {status: 200, response: "Login successful"}
} 


export async function validateServerLogin(){
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
    const {error} = await supabase.auth.signOut();
    if(error){
        return {status: 400, response: error.message}
    }
    else{
        return {status: 200, response: "Logout successful"}
    }
}