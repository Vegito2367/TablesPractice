"use client"
import { useState, useEffect } from "react"
import validateLogin from "@/app/middle";
import { motion } from "motion/react";
import { useParams, useSearchParams } from "next/navigation";
import { AirVent } from "lucide-react";
import QuestionBlob from "@/customComponents/questionBlob";

export default function AttemptPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [data, setData] = useState({});
    const [attemptProps, setAttemptProps] = useState({});
    const [questions, setQuestions] = useState([]);
    useEffect(() => {

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
                const sl = params.slug;
                setSlug(sl);
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id)
                retrieveQuestions(response.user.id, sl);

            }
            catch (err) {
                console.log(err)
            }

        }


        checkUser();
    }, [])

    async function retrieveQuestions(uID, aID) {
        console.log("attempt page",uID, aID)
        try {
            const response = await fetch(`/api/fetchQuestion?userID=${uID}&attemptID=${aID}`);
            const data = await response.json();
            if (data.status === 200) {
                console.log(data.payload)
                data.payload.forEach((elem)=>{
                    const newQ={
                        opA:elem.operand_a,
                        opB:elem.operand_b,
                        symbol:elem.operand,
                        correctA:elem.correct_ans,
                        userA:elem.user_ans,
                        id: elem.qID.substring(9)
                    }
                    setQuestions((prev)=>{
                        return [...prev,newQ]
                    })
                })

                questions.sort((a,b)=>{
                    return a.id-b.id;
                })
            }
            else {
                throw new Error(data.response);
            }
        }
        catch (e) {
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

                <div className="flex flex-row justify-center items-center mt-5 w-full">
                    <div className="flex flex-col justify-center items-center w-full">
                        {
                            questions.map((question, index) => {
                                return <QuestionBlob key={index} opA={question.opA} opB={question.opB} symbol={question.symbol} userA={question.userA} correctA={question.correctA} />
                            })
                        }
                    </div>
                </div>

            </motion.div>
        )
    }

}