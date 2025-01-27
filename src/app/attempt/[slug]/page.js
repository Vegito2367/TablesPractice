"use client"
import { useEffect, useState } from "react"
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

export default function Attempt({ params }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [questionTypes, setQuestionTypes] = useState(["type1", "type2", "type3"]);
    const [currentQuestion, setCurrentQuestion] = useState({ opA: 0, opB: 0, symbol: '+', answer: 0 });
    const [timerActive, setTimerActive] = useState(false);
    const [newQuestion, setNewQuestion] = useState(false);
    const [answer, setAnswer] = useState(0);
    let exportQuestions = [];
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

    async function retrieveQuestionType() {

        const response = await fetch(`/api/getQuestionType?slug=${slug}`, {
            method: "GET",
        })
        try {
            const data = await response.json();
            if (data.status === 200) {

                setQuestionTypes(data.payload);

            }
            else {
                handleError(data.response)
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
        console.log(exportQuestions);
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
                setAnswer(a)
                exportQuestions.push(
                    {
                        opA: currentQuestion.opA,
                        opB: currentQuestion.opB,
                        symbol: currentQuestion.symbol,
                        answer: currentQuestion.answer,
                        userAnswer: a
                    }
                )
                await getQuestion();
                
            }

        }
    }


    async function getQuestion() {
        const operation = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        console.log(operation)
        const response = await fetch(`/api/questions?slug=${slug}&operation=${operation}`, {
            method: "GET",
        })
        try {
            const data = await response.json();
            if (data.status === 200) {
                console.log(data.payload);
                setCurrentQuestion(data.payload);
            }
            else {
                console.log(data);
                console.log(data.response);
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
            <section className="h-screen w-screen bg-gray-950 text-white">
                <div className="flex flex-row justify-center gap-5 w-screen">
                    <div>
                        <Button className="" variant="secondary" onClick={() => { redirect("/") }}>Home</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={() => { redirect("/dashboard") }}>Dashboard</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={retrieveQuestionType}>Test Backend</Button>
                    </div>

                </div>
                <h1>Attempt page</h1>
                <p>user logged in is : {data.response.user.email}</p>
                <p>Slug: {slug}</p>
                <p>user ID: {userID}</p>
                <p>Question Types: {questionTypes}</p>
                <Timer totalTime={10} completionCallback={handleTimerEnd} preCallback={handleTimerStart} />

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
                    <div className="flex flex-col justify-center items-center border-</div>white m-3 border-2 rounded-md p-4">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-2xl mb-3">{currentQuestion.opA} {currentQuestion.symbol} {currentQuestion.opB} = </p>
                            <form>
                                <input onFocus={(e)=>{e.target.value=""}} autoFocus={true} type="number"
                                    className="w-20 h-7 border-2 border-gray-500 rounded-md bg-gray-900"
                                    onKeyDown={handleKeyDown}
                                />
                            </form>

                        </div>
                    </div>
                )}





            </section>
        )
    }

}