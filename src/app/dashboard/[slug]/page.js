"use client"
import { useState, useEffect } from "react"
import validateLogin from "@/app/middle";
import { motion } from "motion/react";
import { useParams, useSearchParams } from "next/navigation";

export default function AttemptPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [data, setData] = useState({});
    const [attemptProps, setAttemptProps] = useState({});
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        setSlug(params.slug);
        const numQ = searchParams.get("numQ");
        const numR = searchParams.get("numR");
        const numW = searchParams.get("numW");
        const d = searchParams.get("date");
        setAttemptProps({
            numQuestions: numQ,
            numCorrect: numR,
            numWrong: numW,
            date: d
        })
        async function checkUser() {
            try {
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id)
                retrieveQuestions();

            }
            catch (err) {
                console.log(err)
            }

        }

        
        checkUser();
    }, [])

    async function retrieveQuestions(){
        try{
            const response = await fetch(`/api/fetchQuestion?userID=${userID}&attemptID=${slug}`);
            const data = await response.json();
            if(data.status === 200){
                console.log(data.payload)
                setQuestions(data.payload);
            }
            else{
                throw new Error(data.response);
            }
        }
        catch(e){
            console.log(e);
        }
    }

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
                <h2 className="text-3xl text-white text-center">Date of attempt: {attemptProps.date}</h2>
                <h3 className="text-2xl text-white text-center">Number of questions: {attemptProps.numQuestions}</h3>
                <h3 className="text-2xl text-white text-center">Number of correct answers: {attemptProps.numCorrect}</h3>
                <h3 className="text-2xl text-white text-center">Number of wrong answers: {attemptProps.numWrong}</h3>
                
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-1/2">

                    </div>
                </div>

            </motion.div>
        )
    }

}