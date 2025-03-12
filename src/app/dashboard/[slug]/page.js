"use client"
import { useState, useEffect } from "react"
import validateLogin from "@/app/middle";
import { motion } from "motion/react";
import { useParams, useSearchParams } from "next/navigation";
import { AirVent } from "lucide-react";
import QuestionBlob from "@/customComponents/questionBlob";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useRouter } from "next/navigation";

export default function AttemptPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [data, setData] = useState({});
    const [attemptProps, setAttemptProps] = useState({});
    const [questions, setQuestions] = useState([]);
    useEffect(() => {

        // const numQ = searchParams.get("numQ");
        // const numR = searchParams.get("numR");
        // const numW = searchParams.get("numW");
        // const d = searchParams.get("date");
        // setAttemptProps({
        //     numQuestions: numQ,
        //     numCorrect: numR,
        //     numWrong: numW,
        //     date: d
        // })
        async function checkUser() {
            try {
                const sl = params.slug;
                setSlug(sl);
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id)
                retrieveQuestions(response.user.id, sl);
                getAttemptDetails(response.user.id,sl);

            }
            catch (err) {
                console.log(err)
            }

        }


        checkUser();
    }, [])
    async function getAttemptDetails(uID,aID){
        try {
            const response = await fetch(`/api/getAttempt?userID=${uID}&attemptID=${aID}`);
            const data = await response.json();
            if (data.status===200){
                console.log(data.payload)
                const wrongQuestions = data.payload.total_questions - data.payload.num_correct;
                const interDate = data.payload.created_at;
                console.log(data.payload.created_at)
                const date = interDate.substring(0, data.payload.created_at.indexOf("T"));
                const attemptProps = {
                    numQuestions: data.payload.total_questions,
                    numCorrect: data.payload.num_correct,
                    numWrong: wrongQuestions,
                    date: date
                }
                setAttemptProps(attemptProps);
            }
            else{
                throw new Error(data.response)
            }
        }
        catch (err){
            console.log(err)
        }
    }
    async function retrieveQuestions(uID, aID) {
        console.log("attempt page", uID, aID)
        try {
            const response = await fetch(`/api/fetchQuestion?userID=${uID}&attemptID=${aID}`);
            const data = await response.json();
            if (data.status === 200) {
                // console.log(data.payload)
                data.payload.forEach((elem) => {
                    const newQ = {
                        opA: elem.operand_a,
                        opB: elem.operand_b,
                        symbol: elem.operand,
                        correctA: elem.correct_ans,
                        userA: elem.user_ans,
                        id: elem.qID.substring(9)
                    }
                    setQuestions((prev) => {
                        return [...prev, newQ]
                    })
                })

                questions.sort((a, b) => {
                    return a.id - b.id;
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="bg-gray-950 w-screen font-mono">
                <div className="flex flex-row justify-center gap-5 py-4 w-screen">
                    <div>
                        <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => { router.push("/dashboard") }}>Back To Dashboard</Button>
                    </div>


                </div>
                <div className="bg-gray-900 text-center text-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
                    <h1 className="text-5xl font-bold text-orange-400 mb-4">
                        Attempt Slug: {slug}
                    </h1>

                    <h2 className="text-3xl font-semibold mb-3">
                        Date of Attempt: <span className="text-gray-300">{attemptProps.date}</span>
                    </h2>

                    <h3 className="text-2xl font-medium mb-2">
                        Total Questions: <span className="text-orange-400">{attemptProps.numQuestions}</span>
                    </h3>

                    <h3 className="text-2xl font-medium mb-2">
                        Correct Answers: <span className="text-green-400">{attemptProps.numCorrect}</span>
                    </h3>

                    <h3 className="text-2xl font-medium">
                        Wrong Answers: <span className="text-red-400">{attemptProps.numWrong}</span>
                    </h3>
                </div>


                <div className="flex flex-row mt-5 justify-center items-center">
                    <div className="flex flex-col w-1/2">
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