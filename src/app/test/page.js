"use client"
import { Bar, BarChart, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import TestChart from "@/customComponents/testChart"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import validateLogin from "../middle"
import { useToast } from "@/hooks/use-toast";

export default function TestPage() {

    const [testMode,setTestMode] = useState(false);
    const [password,setPassword] = useState("");
    const [data,setData] = useState({});
    const [userID, setUserID] = useState("");
    const [loggedIn,setLoggedIn]=useState(false);
    const myAttempt = "RmIViktB";
    const { toast } = useToast();
    useEffect(()=>{
        async function checkUser() {
            try {
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id)
                if (status === 200) {
                    setLoggedIn(true);
                }
                
            }
            catch (err) {
                console.log(err)
            }

        }
        checkUser();
    },[])


    async function testAPI(){
        try {
            const response = await fetch(`/api/getAttempt?userID=${userID}&attemptID=${myAttempt}`);
            const data = await response.json();
            console.log(data.payload)
        }
        catch (err){
            console.log(err)
        }
    }
    async function showTest()
    {
        const response = await fetch("/api/verifyPassword",{
            method: "POST",
            body: JSON.stringify({password: password})
        });
        const data = await response.json();
        console.log(data); 
        if(data.status===200){
            setTestMode(true);
            toast({
                variant: "primary",
                title: "Login successful",
                description: data.response,
            })
        }
        else{
            toast({
                variant: "destructive",
                title: "Logout failed",
                description: data.response,
            })
        }
        
    }
    if(!loggedIn){
        return(
            <section className="h-screen bg-gray-950 flex flex-col justify-center items-center font-mono">
                <h1>Not logged in</h1>
            </section>
        )
    }
    else{
        return (
            <>
                <section className="h-screen bg-gray-950 flex flex-col justify-center items-center font-mono">
                    <h2>Developer Interfacce enter password</h2>
                    <input type="password" width={200} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <br/>
                   <Button onClick={showTest}>Validate Password</Button>
                   <br/>
                   {testMode &&(
                    <>
                        <Button onClick={testAPI}>Test API</Button>
                    </>
                   )}
                   
                </section>
            </>
        )
    }
    
}


