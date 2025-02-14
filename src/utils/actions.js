"use server"
import { redirect } from "next/navigation";
import { createClient } from "./server";
export async function attemptSignup(signUpdata) {

    const supabase = await createClient();

    const { data, error, status} = await supabase.auth.signUp(signUpdata)

    if (error) {
        console.log(error)
        if(error.status === 422){
            return {status: 400, response: "Email already exists"}
        }
        return {status: 400, response: error}
        
    }
    try{
        const {insertError}  = await supabase
                    .from("userTable")
                    .insert({user_id:data.user.id, created_at: data.user.created_at, email:data.user.email})
        if(insertError){
            throw Error(insertError.message)
        }
        return {status: 200, response: "Sign up successful" }
    }
    catch(err){
        console.log(err)
        return {status: 400, response: err.message}
    }
    
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
        return {status: 400, response: error.message}
    }
    if(data){
        const lastSignin = new Date(data.user.last_sign_in_at);
        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - lastSignin);

        if(timeDiff>10800000){
            const {error} = await supabase.auth.signOut();
            return {status: 400, response: "User session expired, please login again"}
    
        }
        else{
            return {status: 200, response: data}
        }
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