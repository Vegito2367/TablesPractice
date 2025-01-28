"use client"
import { useState, useEffect } from "react"
import validateLogin from "@/app/middle";
import { motion } from "motion/react";
import { useParams,useSearchParams } from "next/navigation";

export default function AttemptPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [data, setData] = useState({});
    const [attemptProps,setAttemptProps]=useState({});
    
    useEffect(() => {
        setSlug(params.slug);
        const numQ = searchParams.get("numQ");
        const numR = searchParams.get("numR");
        const numW = searchParams.get("numW");
        const d = searchParams.get("date");
        setAttemptProps({
            numQuestions:numQ,
            numCoreect:numR,
            numWrong:numW,
            date:d
        })
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
    }, [])
    if (data.status != 200) {
        return (
            <div>
                <h1>Not logged in</h1>
            </div>
        )
    }
    else {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="bg-gray-950 w-screen">
                <h1 className="text-5xl text-white text-center">Attempt Slug: {slug}</h1>

            </motion.div>
        )
    }

}