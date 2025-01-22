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
export default function Dashboard() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { toast } = useToast();
    const slugLength = 8;
    const router = useRouter();
    const [includeAddition, setIncludeAddition] = useState(false);
    const [includeSubtraction, setIncludeSubtraction] = useState(false);
    const operations = [includeAddition, includeSubtraction]
    const [props,setProps] = useState({});
    useEffect(() => {
        async function checkUser() {
            try {
                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                if (status === 200) {
                    setLoggedIn(true);
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        checkUser();

    }, []);


    function debugFunction() {
        console.log(includeAddition, includeSubtraction)
    }



    const attempts = [
        {
            id: 1,
            numberOfQuestions: 10,
            numberOfRights: 5,
            numberOfWrongs: 5,
            dateOfAttempt: "2021-09-01"
        },
        {
            id: 2,
            numberOfQuestions: 10,
            numberOfRights: 6,
            numberOfWrongs: 4,
            dateOfAttempt: "2021-09-02"
        },
        {
            id: 3,
            numberOfQuestions: 10,
            numberOfRights: 7,
            numberOfWrongs: 3,
            dateOfAttempt: "2021-09-03"
        },
        {
            id: 4,
            numberOfQuestions: 10,
            numberOfRights: 3,
            numberOfWrongs: 7,
            dateOfAttempt: "2021-09-04"
        },
        {
            id: 5,
            numberOfQuestions: 10,
            numberOfRights: 4,
            numberOfWrongs: 6,
            dateOfAttempt: "2021-09-05"
        },
    ]


    async function handleLogout() {
        handleClick();
        if (loggedIn) {
            const { status, response } = await Logout();
            if (status === 200) {
                toast({
                    title: "Logout successful",
                    description: "You will be redirected to the home page",
                })
                setTimeout(() => {
                    redirect("/")
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
        if(Object.keys(props).length===0){
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
        console.log("new slug: ",newSlug);
        const response = await fetch("/api/startingEngine", {
            method: "POST",
            body: JSON.stringify({
                attemptSlug: newSlug,
                constraints: props
            })
        })
        const data = await response.json();
        console.log(data.status, data.response)
        if(data.status===400){
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
    }

    async function savePreferences(formData) {

        let atleatstOneOp = false
        for (let i = 0; i < operations.length; i++) {
            if (operations[i]) {
                atleatstOneOp = true;
                break;
            }
        }
        console.log(atleatstOneOp, operations)
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
                    title: "Invalid input",
                    description: "Please enter a number"
                })
                resetCheckboxes();
                return;
            }

            if (llsub === 0 || ulsub === 0) {
                toast({
                    variant: "destructive",
                    title: "Invalid input",
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
        const mathProps = {
            "addition": {
                ...additionObject
            },
            "subtraction": {
                ...subtractionObject
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
                    <Button className="absolute top-5 left-0" variant="secondary" onClick={() => { redirect("/") }}>Home</Button>
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
                        <Button className="" variant="secondary" onClick={() => { redirect("/") }}>Home</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={newAttempt}>New Attempt</Button>
                    </div>

                </div>

                <div className="flex flex-col justify-center pt-5">
                    <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                    <p className="pt-10">each attempt, as a number of questions, each question has number of rights and wrongs.</p>
                    {data.response && data.response.user && <p>{data.response.user.email}</p>}
                    <Button className="mt-5" variant="secondary" onClick={debugFunction}>Click me</Button>
                    <div className="flex flex-row">
                        <div name="attempts" className="w-1/2">
                            {attempts.map((attempt) => {
                                return <Attempt key={attempt.id} numberOfQuestions={attempt.numberOfQuestions}
                                    numberOfRights={attempt.numberOfRights}
                                    numberOfWrongs={attempt.numberOfWrongs}
                                    date={attempt.dateOfAttempt}
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
                                        <Input name="lowerLimitAdd" id="lowerLimitAdd" type="number" defaultValue={2} label="Lower Limit" />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitAdd" id="upperLimitAdd" type="number" defaultValue={15} label="Upper Limit" />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeAddition} className="w-6 h-6 border-white border-2" name="addition" id="addition" label="Addition" />

                                </div>

                                <Separator decorative={true} className="opacity-35 m-3" />
                                <div name="subtractionBox" className="flex flex-col items-center">
                                    <p className="text-center text-2xl">Subtraction</p>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Lower Limit:</p>
                                        <Input name="lowerLimitSub" id="lowerLimitSub" type="number" defaultValue={2} label="Lower Limit" />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Upper Limit:</p>
                                        <Input name="upperLimitSub" id="upperLimitSub" type="number" defaultValue={15} label="Upper Limit" />
                                    </div>
                                    Include this attempt
                                    <Checkbox onCheckedChange={setIncludeSubtraction} className="w-6 h-6 border-white border-2" name="subtraction" id="subtraction" label="Subtraction" />
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