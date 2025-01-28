"use client"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Timer({ totalTime, completionCallback, preCallback }) {

    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [active,setActive]=useState(false);
    const timeReference=useRef(null);


    useEffect(()=>{
        if(active){
            timeReference.current=setInterval(()=>{
                setTimeLeft((timeLeft)=>{
                    if(timeLeft<=0){
                        clearInterval(timeReference.current);
                        setActive(false);
                        timerFinished();
                        return 0;
                    }
                    return timeLeft-1;
                })
            },1000)
        }
        else{
            clearInterval(timeReference.current);
        }
        return ()=>{
            clearInterval(timeReference.current);
        }
    },[active])

    

    function timerFinished(){
        if(completionCallback){
            completionCallback();
        }
    }

    function startTimer(){
        setActive(true);
        if(preCallback){
            preCallback();
        }
    }

    return (
        <div className="text-center p-5 font-sans border-white border-2 border-spacing-1">
            <h1 className="text-4xl text-white pb-3">Remaining Time: {timeLeft}</h1>
            <Button onClick={startTimer} disabled={active} variant="secondary" className="px-5 py-2 text-lg rounded cursor-pointer">
                Start Timer
            </Button>
        </div>
    )
}