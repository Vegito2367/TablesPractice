"use client"
import { use, useEffect, useState } from "react"
import validateLogin from "../../middle";
import Timer from "@/customComponents/timer";
import { Button } from "@/components/ui/button";
import QuestionBox from "@/customComponents/questionBox";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoadingButton from "@/customComponents/loadingButton";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Title } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";



export default function Attempt({ params }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [questionTypes, setQuestionTypes] = useState(["type1", "type2", "type3"]);
    const [currentQuestion, setCurrentQuestion] = useState({ opA: 0, opB: 0, symbol: '+', answer: 0 });
    const [timerActive, setTimerActive] = useState(false);
    const [questionExportList, setquestionExportList] = useState([]);
    const [attempt, setCompleteAttempt] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            try {

                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id);
                const tempslug = (await params).slug;
                setSlug(tempslug);
                if (status === 200) {
                    setLoggedIn(true);
                }
                else {
                    throw new Error(`User not logged in - ${response}`);
                }
                retrieveQuestionType(tempslug);

            }
            catch (err) {
                console.log(err)

            }

        }


        async function deleteEngine() {
            const response = await fetch(`/api/startingEngine?slug=${slug}`, {
                method: "DELETE",
            })
            try {
                const data = await response.json();
                console.log(data);
            }
            catch (e) {
                console.log(e);

            }
        }



        checkUser();



    }, [])

    useEffect(() => {
        console.log(questionExportList);
    }, [questionExportList])

    useEffect(() => {
        /*
        Step 1: consolidate export info:
        Step 2: Create new attempt in database(slug,timecreated,totalQs, userID)
        Step 3: Get attempt ID and populate questions(id,symbol,opA,opB,answer,userAnswer,attemptID)
        all http requests should be {status, response and optionally payload}
        */
        if (attempt) {
            exportAttempt();
        }
    }, [attempt])

    async function exportAttempt() {
        const newAttempt = {
            id: slug,
            createdAt: new Date().toISOString(),
            totalQuestions: questionExportList.length,
            userID: userID,
            numCorrect: correctAnswers,
        }
        const exportPacket = {
            type: "attempt",
            payload: newAttempt,
        }
        const res = await fetch("/api/export", {
            method: "POST",
            body: JSON.stringify(exportPacket),

        })
        try {
            const data = await res.json();
            console.log(data.status, data.response);

        }
        catch (e) {
            console.log(e);
        }
        let questionCallbacks = [];
        questionExportList.forEach((question, index) => {
            const newQuestion = {
                operand: question.symbol,
                operandA: question.opA,
                operandB: question.opB,
                correctAns: question.answer,
                userAns: question.userAnswer,
                attemptID: slug,
                id: index + 1,
            }

            questionCallbacks.push(exportQuestions(newQuestion));

        })

        Promise.all(questionCallbacks).then((results) => {
            results.forEach((res) => { console.log(res) });
            toast({
                title: "Attempt Data Saved",
                description: "Redirecting back to Dashboard",
            })
            setTimeout(router.push("/dashboard"), 2000);
        }).catch((e) => {
            console.log(e);
        })

    }

    async function exportQuestions(question) {
        const expPacket = {
            type: "question",
            payload: question,
        }
        try {
            const response = await fetch("/api/export", {
                method: "POST",
                body: JSON.stringify(expPacket),
            })

            const data = await response.json();
            if (data.status === 200) {
                console.log(data.response, question.id);
            }
            else {
                throw new Error(data.response);
            }
        }
        catch (e) {
            console.log(e.message)
        }



    }
    async function retrieveQuestionType(localSlug) {

        const response = await fetch(`/api/getQuestionType?slug=${localSlug}`, {
            method: "GET",
        })
        try {
            const data = await response.json();
            if (data.status === 200) {

                setQuestionTypes(data.payload);

            }
            else {
                throw new Error(data.response)
            }
        }
        catch (e) {
            console.log(e.message);

        }

    }

    function handleDialog() {
        setShowDialog(!showDialog);
    }

    function startTimer() {
        setTimerActive(!timerActive);
    }

    function handleTimerEnd() {
        setTimerActive(false);
        handleDialog();
        setTimeout(() => { setCompleteAttempt(true) }, 2000);
    }

    async function handleTimerStart() {
        startTimer();
        await getQuestion();
    }

    function handleError(message) {
        toast({
            title: "Error occured!",
            description: `${message} - Ending attempt`,
        })

        setTimeout(redirect("/dashboard"), 1500)

    }


    async function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const a = Number(e.target.value)
            e.target.value = "";
            if (!isNaN(a)) {
                const correctOrNot = currentQuestion.answer === a;
                if (correctOrNot) {
                    setCorrectAnswers(correctAnswers => correctAnswers + 1);
                }
                const expQuestion = {
                    opA: currentQuestion.opA,
                    opB: currentQuestion.opB,
                    symbol: currentQuestion.symbol,
                    answer: currentQuestion.answer,
                    userAnswer: a,
                    correctAns: correctOrNot,
                }

                setquestionExportList(questionExportList => [...questionExportList, expQuestion]);
                await getQuestion();

            }

        }
    }


    async function getQuestion() {
        const operation = questionTypes[Math.floor(Math.random() * questionTypes.length)];

        const response = await fetch(`/api/questions?slug=${slug}&operation=${operation}`, {
            method: "GET",
        })
        try {
            const data = await response.json();
            if (data.status === 200) {
                setCurrentQuestion(data.payload);
            }
            else {
                console.log(data);
                throw new Error(data.response);
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    if (!loggedIn) {
        return (
            <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                <h1>User not logged in</h1>
            </section>
        )
    }
    else {
        return (
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.75 }}>
                <section className="h-screen w-screen bg-gray-950 text-white">
                    <div className="flex flex-row justify-center gap-5 w-screen">
                        <div>
                            <Button className="" variant="secondary" onClick={() => { redirect("/") }}>Home</Button>
                        </div>
                        <div>
                            <Button className="" variant="secondary" onClick={() => { redirect("/dashboard") }}>Dashboard</Button>
                        </div>
                    </div>

                    <h1 className="text-white text-5xl text-center font-serif my-4">Get Ready To Math!</h1>
                    <p className="text-3xl text-center my-4">Attempt ID: {slug}</p>
                    <p className="text-2xl text-center my-3">user email: {data.response.user.email}</p>
                    <Timer totalTime={60} completionCallback={handleTimerEnd} preCallback={handleTimerStart} />

                    <AlertDialog open={showDialog} onOpenChange={handleDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Time has elapsed.</AlertDialogTitle>
                                <AlertDialogDescription>Good job on the attempt!</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {timerActive && (
                        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center items-center border-</div>white m-3 border-2 rounded-md p-4">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-2xl mb-3">{currentQuestion.opA} {currentQuestion.symbol} {currentQuestion.opB} = </p>
                                <form>
                                    <input onFocus={(e) => { e.target.value = "" }} autoFocus={true} type="number"
                                        className="w-20 h-7 border-2 border-gray-500 rounded-md bg-gray-900"
                                        onKeyDown={handleKeyDown}
                                    />
                                </form>

                            </div>
                        </motion.div>
                    )}
                    <div className="text-center text-white text-3xl my-5">
                        <p>Score: {correctAnswers}</p>
                    </div>





                </section>
            </motion.div>

        )
    }

}