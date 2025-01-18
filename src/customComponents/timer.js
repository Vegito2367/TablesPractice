import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Timer({ totalTime, callback }) {

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
        if(callback){
            callback();
        }
    }

    function startTimer(){
        setActive(true);
    }

    return (
        <div>
            <h1>Time Left: {timeLeft}</h1>
            <Button onClick={startTimer}>Start Timer</Button>
        </div>
    )
}