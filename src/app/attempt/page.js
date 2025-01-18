"use client"
import { useEffect, useState } from "react"
import validateLogin from "../middle";
import Timer from "@/customComponents/timer";
export default function Attempt(){

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({});
    useEffect(()=>{
        async function checkUser() {
            try{
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                if(status === 200){
                    setLoggedIn(true);
                }
            }
            catch(err){
                console.log(err)
            }
            
        }
        checkUser();
    },[])

    if(!loggedIn){
        return (
            <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                <h1>User not logged in</h1>
            </section>
        )
    }
    else{
        return (
            <section className="h-screen w-screen bg-gray-950 text-white">
                <h1>Attempt page</h1>
                <p>user logged in is : {data.response.user.email}</p>
                <Timer totalTime={10} />
            </section>
        )
    }
    
}