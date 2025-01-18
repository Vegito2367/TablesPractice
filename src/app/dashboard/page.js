"use client"
import { redirect } from "next/navigation";
import validateLogin from "../middle";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useEffect, useState } from "react";
import Attempt from "@/customComponents/attemptBlob";
import { Logout } from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";
export default function Dashboard() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { toast } = useToast();
    useEffect(() => {
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

    },[]);

    
    console.log(data.response)
        function handleClick() {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }

    

    const attempts=[
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

    
    async function handleLogout(){
        handleClick();
        if(loggedIn){
            const {status, response} = await Logout();
            if(status === 200){
                toast({
                    title: "Logout successful",
                    description: "You will be redirected to the home page",
                })
                setTimeout(()=>{
                    redirect("/")
                },2000)
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Logout failed",
                    description: response,
                })
            }

        }
    }
        if (data.status === 400) {
            return (
                <>
                    <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                    <Button className="absolute top-5 left-0" variant="secondary" onClick={()=>{redirect("/")}}>Home</Button>
                        <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                        <p> You are not logged in</p>
                    </section>
                </>
            )
        }
        return (
            <>
            <section className="h-screen w-screen bg-gray-950">
                <div className="flex flex-row justify-center gap-5 w-screen">
                    <div>
                        <LoadingButton loading={loading} classes="" variant="secondary" title="Logout" callback={handleLogout}/>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={()=>{redirect("/")}}>Home</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={()=>{redirect("/attempt")}}>New Attempt</Button>
                    </div>
                    
                </div>
                
                <div className="flex flex-col justify-center pt-5">
                <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                <p className="pt-10">each attempt, as a number of questions, each question has number of rights and wrongs.</p>
                {data.response && data.response.user && <p>{data.response.user.email}</p>}
                <div className="w-1/2">
                    {attempts.map((attempt) => {
                    return <Attempt key={attempt.id} numberOfQuestions={attempt.numberOfQuestions} 
                    numberOfRights={attempt.numberOfRights} 
                    numberOfWrongs={attempt.numberOfWrongs}
                    date={attempt.dateOfAttempt}
                    />
                    })}
                </div>
                
                </div>

            </section>
            </>
        )
    
}