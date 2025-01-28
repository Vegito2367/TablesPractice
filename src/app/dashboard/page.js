"use client"
import { redirect } from "next/navigation";
import validateLogin from "../middle";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useEffect, useState } from "react";
import Attempt from "@/customComponents/attemptBlob";
import { Logout } from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
export default function Dashboard() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { toast } = useToast();
    const slugLength = 8;
    const router = useRouter();
    const [includeAddition, setIncludeAddition] = useState(false);
    const [includeSubtraction, setIncludeSubtraction] = useState(false);
    const [includeMultiplication, setIncludeMultiplication] = useState(false);
    const [includeDivision, setIncludeDivision] = useState(false);
    const operations = [includeAddition, includeSubtraction, includeMultiplication, includeDivision];
    const [props, setProps] = useState({});
    const [userID, setUserID] = useState("");
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        async function checkUser() {
            try {
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id)
                if (status === 200) {
                    setLoggedIn(true);
                }
                fetchAttempts(response.user.id);
            }
            catch (err) {
                console.log(err)
            }

        }

        async function fetchAttempts(id) {
            try{
                const response = await fetch(`/api/retrieveAttempt?userID=${id}`,{
                    method: "GET"
                })
                const data = await response.json();
                if(data.status===200){
                    data.payload.forEach(att=>{
                        const date = att.created_at.substring(0,att.created_at.indexOf("T"));
                        const numberOfQuestions = att.total_questions;
                        const numberOfRights = att.num_correct;
                        const numberOfWrongs = att.total_questions - att.num_correct;
                        const newAttempt = {
                            date: date,
                            totalQuestions: numberOfQuestions,
                            numCorrect: numberOfRights,
                            numWrong: numberOfWrongs,
                            slug: att.id
                        }
                        setAttempts(prev=>[...prev,newAttempt]);

                    })
                    attempts.sort((a,b)=>{
                        return new Date(b.date) - new Date(a.date);
                    })
                }
                else{
                    toast({
                        variant: "destructive",
                        title: "Error fetching attempts",
                        description: data.response
                    })
                }
            }
            catch(e){
                console.log(e);
            }
            
        }


        checkUser();

    }, []);

    useEffect(() => {
        console.log(attempts)
    },[attempts])


    function debugFunction() {
        console.log(includeAddition, includeSubtraction)
    }




    function handleDelay() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }
    async function handleLogout() {
        if (loggedIn) {
            const { status, response } = await Logout();
            if (status === 200) {
                toast({
                    title: "Logout successful",
                    description: "You will be redirected to the home page",
                })
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Logout failed",
                    description: response,
                })
            }

        }
    }

    async function newAttempt() {
        handleDelay();
        if (Object.keys(props).length === 0) {
            toast({
                variant: "destructive",
                title: "No constraints set",
                description: "Please set constraints before starting a new attempt"
            })
            return;
        }
        function generateSlug() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let slug = '';
            for (let i = 0; i < slugLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                slug += characters[randomIndex];
            }
            return slug;
        }
        const newSlug = generateSlug();

        const response = await fetch("/api/startingEngine", {
            method: "POST",
            body: JSON.stringify({
                attemptSlug: newSlug,
                constraints: props
            })
        })
        const data = await response.json();
        if (data.status === 400) {
            toast({
                variant: "destructive",
                title: "Error Occured!",
                description: data.response
            })
            return;
        }


        
        router.push(`/attempt/${newSlug}`);
        

    }
    function resetCheckboxes() {
        setIncludeAddition(false);
        setIncludeSubtraction(false);
        setIncludeMultiplication(false);
        setIncludeDivision(false);
    }

    async function savePreferences(formData) {

        let atleatstOneOp = false
        for (let i = 0; i < operations.length; i++) {
            if (operations[i]) {
                atleatstOneOp = true;
                break;
            }
        }

        if (!atleatstOneOp) {
            toast({
                variant: "destructive",
                title: "No operation selected",
                description: "Please select at least one operation"
            })
            resetCheckboxes();
            return;
        }

        const llad = Number(formData.get("lowerLimitAdd"));
        const ulad = Number(formData.get("upperLimitAdd"));
        const llsub = Number(formData.get("lowerLimitSub"));
        const ulsub = Number(formData.get("upperLimitSub"));
        const llmul = Number(formData.get("lowerLimitMul"));
        const ulmul = Number(formData.get("upperLimitMul"));
        const lldiv = Number(formData.get("lowerLimitDiv"));
        const uldiv = Number(formData.get("upperLimitDiv"));

        if (includeAddition) {
            if (isNaN(llad) || isNaN(ulad)) {
                toast({
                    variant: "destructive",
                    title: "Invalid addition input",
                    description: "Please enter a number"
                })
                resetCheckboxes();
                return;
            }

            if (llad === 0 || ulad === 0) {
                toast({
                    variant: "destructive",
                    title: "Invalid addition input",
                    description: "Please enter a number greater than 0"
                })
                resetCheckboxes();
                return;
            }

            if (llad >= ulad) {
                toast({
                    variant: "destructive",
                    title: "Invalid Addition limits",
                    description: "Upper limit must be greater than lower limit"
                })
                resetCheckboxes();
                return;
            }
        }

        if (includeSubtraction) {
            if (isNaN(llsub) || isNaN(ulsub)) {
                toast({
                    variant: "destructive",
                    title: "Invalid Subtraction input",
                    description: "Please enter a number"
                })
                resetCheckboxes();
                return;
            }

            if (llsub === 0 || ulsub === 0) {
                toast({
                    variant: "destructive",
                    title: "Invalid Subtraction input",
                    description: "Please enter a number greater than 0"
                })
                resetCheckboxes();
                return;
            }



            if (llsub >= ulsub) {
                toast({
                    variant: "destructive",
                    title: "Invalid Subtraction limits",
                    description: "Upper limit must be greater than lower limit"
                })
                resetCheckboxes();
                return;
            }
        }

        if (includeMultiplication) {
            if (isNaN(llmul) || isNaN(ulmul)) {
                toast({
                    variant: "destructive",
                    title: "Invalid Mulitplication input",
                    description: "Please enter a number"
                })
                resetCheckboxes();
                return;
            }

            if (llmul === 0 || ulmul === 0) {
                toast({
                    variant: "destructive",
                    title: "Invalid Mulitplication input",
                    description: "Please enter a number greater than 0"
                })
                resetCheckboxes();
                return;
            }

            if (llmul >= ulmul) {
                toast({
                    variant: "destructive",
                    title: "Invalid Multiplication limits",
                    description: "Upper limit must be greater than lower limit"
                })
                resetCheckboxes();
                return;
            }
        }

        if (includeDivision) {
            if (isNaN(lldiv) || isNaN(uldiv)) {
                toast({
                    variant: "destructive",
                    title: "Invalid Division input",
                    description: "Please enter a number"
                })
                resetCheckboxes();
                return;
            }

            if (lldiv === 0 || uldiv === 0) {
                toast({
                    variant: "destructive",
                    title: "Invalid Division input",
                    description: "Please enter a number greater than 0"
                })
                resetCheckboxes();
                return;
            }

            if (lldiv >= uldiv) {
                toast({
                    variant: "destructive",
                    title: "Invalid Division limits",
                    description: "Upper limit must be greater than lower limit"
                })
                resetCheckboxes();
                return;
            }
        }




        const additionObject = {
            lowerLimit: llad,
            upperLimit: ulad,
            include: includeAddition
        }
        const subtractionObject = {
            lowerLimit: llsub,
            upperLimit: ulsub,
            include: includeSubtraction
        }
        const multiplicationObject = {
            lowerLimit: llmul,
            upperLimit: ulmul,
            include: includeMultiplication
        }
        const divisionObject = {
            lowerLimit: lldiv,
            upperLimit: uldiv,
            include: includeDivision
        }
        const mathProps = {
            "addition": {
                ...additionObject
            },
            "subtraction": {
                ...subtractionObject
            },
            "multiplication":{
                ...multiplicationObject
            },
            "division": {
                ...divisionObject
            }
        }

        setProps(mathProps);
        toast({
            title: "Preferences saved",
            description: "Preferences saved successfully",
        })
        resetCheckboxes();


    }
    if (data.status === 400) {
        return (
            <>
                <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                    <Button className="absolute top-5 left-0" variant="secondary" onClick={() => { router.push("/") }}>Home</Button>
                    <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                    <p> You are not logged in</p>
                </section>
            </>
        )
    }
    return (
        <>
            <section className="w-screen bg-gray-950">
                <div className="flex flex-row justify-center gap-5 w-screen">
                    <div>
                        <LoadingButton loading={loading} classes="" variant="secondary" title="Logout" callback={handleLogout} />
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={() => { router.push("/") }}>Home</Button>
                    </div>
                    <div>
                        <LoadingButton className="" loading={loading} variant="secondary" title="New Attempt" callback={newAttempt} />
                    </div>

                </div>

                <div className="flex flex-col justify-center pt-5">
                    <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                    <p className="pt-10">each attempt, as a number of questions, each question has number of rights and wrongs.</p>
                    {data.response && data.response.user && <p>{data.response.user.email}</p>}
                    <Button className="mt-5" variant="secondary" onClick={debugFunction}>Click me</Button>
                    <div className="flex flex-row">
                        <div name="attempts" className="w-1/2">
                        {userID && attempts.length===0 && <Skeleton className="w-1/2 h-1/2" />}
                            {attempts.map((attempt,index) => {
                                return <Attempt key={index} numberOfQuestions={attempt.totalQuestions}
                                    numberOfRights={attempt.numCorrect}
                                    numberOfWrongs={attempt.numWrong}
                                    date={attempt.date}
                                    slug={attempt.slug}
                                />
                            })}
                        </div>
                        <div name="constraints" className="text-white w-1/2 items-center flex flex-col border-2 border-white rounded-md">
                            <p className="text-3xl mt-3">Constraints</p>
                            <Separator decorative={true} className="opacity-35 m-3" />
                            <form className="w-2/6 flex flex-col items-center gap-4">
                                <div name="additionBox" className="flex flex-col items-center">
                                    <p className="text-center text-2xl">Addition</p>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Lower Limit:</p>
                                        <Input name="lowerLimitAdd" id="lowerLimitAdd" type="number" defaultValue={2} />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitAdd" id="upperLimitAdd" type="number" defaultValue={15} />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeAddition} className="w-6 h-6 border-white border-2" name="addition" id="addition" />

                                </div>

                                <Separator decorative={true} className="opacity-35 m-3" />
                                <div name="subtractionBox" className="flex flex-col items-center">
                                    <p className="text-center text-2xl">Subtraction</p>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Lower Limit:</p>
                                        <Input name="lowerLimitSub" id="lowerLimitSub" type="number" defaultValue={2} />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitSub" id="upperLimitSub" type="number" defaultValue={15} />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeSubtraction} className="w-6 h-6 border-white border-2" name="subtraction" id="subtraction" />
                                </div>
                                <Separator decorative={true} className="opacity-35 m-3" />
                                <div name="subtractionBox" className="flex flex-col items-center">
                                    <p className="text-center text-2xl">Multiplication</p>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Lower Limit:</p>
                                        <Input name="lowerLimitMul" id="lowerLimitMul" type="number" defaultValue={2} />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitMul" id="upperLimitMul" type="number" defaultValue={100} />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeMultiplication} className="w-6 h-6 border-white border-2" name="multiplication" id="multiplication" />
                                </div>
                                <Separator decorative={true} className="opacity-35 m-3" />
                                <div name="subtractionBox" className="flex flex-col items-center">
                                    <p className="text-center text-2xl">Division</p>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Lower Limit:</p>
                                        <Input name="lowerLimitDiv" id="lowerLimitDiv" type="number" defaultValue={3} />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitDiv" id="upperLimitDiv" type="number" defaultValue={50} />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeDivision} className="w-6 h-6 border-white border-2" name="division" id="division" />
                                </div>
                                <Button variant="secondary" className="w-full" formAction={savePreferences}>Submit</Button>
                            </form>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )

}