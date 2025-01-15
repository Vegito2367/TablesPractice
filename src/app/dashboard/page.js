"use client"
import { redirect } from "next/navigation";
import validateLogin from "./dashboardData";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/customComponents/loadingButton";
import { useEffect, useState } from "react";
import Attempt from "@/customComponents/attempt";
export default function Dashboard() {
    const [data, setData] = useState({});
    
    // useEffect(() => {
    //     console.log("Dashboard starts")
    //     async function checkUser() {
    //         console.log("code ran")
    //         try{
    //             const { status, response } = await validateLogin();
    //             setData({ status: status, response: response });
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
            
    //     }
    //     checkUser();

    // },[]);

    const [loading, setLoading] = useState(false);
    console.log(data)
    function handleClick() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    // if (data.status === 400) {
    //     return (
    //         <>
    //             <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
    //                 <h1>Dashboard</h1>
    //                 <p> You are not logged in</p>
    //             </section>
    //         </>
    //     )
    // }

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

    
        return (
            <>
                <section className="h-screen w-screen bg-gray-950">
                    <Button className="absolute top-5 right-0 " variant="secondary" >Logout</Button>
                    <LoadingButton callback={handleClick} loading={loading} title="Click me" />
                    <div className="flex flex-col justify-center ">
                        <h1 className="text-white text-5xl text-center font-serif">Dashboard</h1>
                        <p>each attempt, as a number of questions, each question has number of rights and wrongs.</p>
                        <div className="w-1/2">
                            {attempts.map((attempt)=>{
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