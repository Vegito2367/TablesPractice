"use client"
import { redirect } from "next/navigation";
import { validateLogin } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useState } from "react";
export default function Dashboard()
{
    const {status,response}={status:200,response:{user:{email:"tej.gumaste@gmail.com"}}}
    const [loading,setLoading]=useState(false);

    function handleClick(){
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },2000)
    }

    if(status===400){
        return(
            <>
                <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                    <h1>Dashboard</h1>
                    <p> You are not logged in</p>
                </section>
            </>
        )
    }

    
    else{
        return(
            <>
               <section className="h-screen w-screen bg-gray-950 ">
                <Button className="absolute top-5 right-0 " variant="secondary" >Logout</Button>
                <LoadingButton callback={handleClick} loading={loading} title="Click me"/>
                <div className="flex flex-col justify-center ">
                    <h1>Dashboard</h1>
                    <p> You are logged in as {response.user.email}</p>
                </div>
                    
                </section>
            </>
        )
    }
}