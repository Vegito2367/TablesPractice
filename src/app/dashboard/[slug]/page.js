"use client"
import { useState, useEffect } from "react"
import validateLogin from "@/app/middle";
import { motion } from "motion/react";
import { MoonIcon } from "lucide-react";

export default function AttemptPage({params})
{
    const [slug,setSlug] = useState("");
    const [userID,setUserID] = useState("");
    const [data,setData] = useState({});
    useEffect(() => {
        async function fetchData()
        {
            const temp = (await params).slug
            setSlug(temp)
        }
        fetchData();
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
    },[])
    if(data.status!=200){
        return (
            <div>
                <h1>Not logged in</h1>
            </div>
        )
    }
    else{
        return (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="bg-gray-950 w-screen">
                <h1 className="text-5xl text-white text-center">Attempt Slug: {slug}</h1>
            </motion.div>
        )
    }
    
}