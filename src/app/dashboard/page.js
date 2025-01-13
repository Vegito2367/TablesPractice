"use client"
import { redirect } from "next/navigation";
import validateLogin from "./dashboardData";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useEffect, useState } from "react";
export default function Dashboard() {
    const [data, setData] = useState({});
    
    useEffect(() => {
        console.log("Dashboard starts")
        async function checkUser() {
            console.log("code ran")
            try{
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
            }
            catch(err){
                console.log(err)
            }
            
        }
        checkUser();

    },[]);

    const [loading, setLoading] = useState(false);
    console.log(data)
    function handleClick() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    if (data.status === 400) {
        return (
            <>
                <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                    <h1>Dashboard</h1>
                    <p> You are not logged in</p>
                </section>
            </>
        )
    }


    else {
        return (
            <>
                <section className="h-screen w-screen bg-gray-950 ">
                    <Button className="absolute top-5 right-0 " variant="secondary" >Logout</Button>
                    <LoadingButton callback={handleClick} loading={loading} title="Click me" />
                    <div className="flex flex-col justify-center ">
                        <h1>Dashboard</h1>
                        <p> You are logged in as {response.user.email}</p>
                    </div>

                </section>
            </>
        )
    }
}