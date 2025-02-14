"use client"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Timer({ totalTime, completionCallback, preCallback }) {

    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [active, setActive] = useState(false);
    const timeReference = useRef(null);


    useEffect(() => {
        if (active) {
            timeReference.current = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    if (timeLeft <= 0) {
                        clearInterval(timeReference.current);
                        setActive(false);
                        timerFinished();
                        return 0;
                    }
                    return timeLeft - 1;
                })
            }, 1000)
        }
        else {
            clearInterval(timeReference.current);
        }
        return () => {
            clearInterval(timeReference.current);
        }
    }, [active])



    function timerFinished() {
        if (completionCallback) {
            completionCallback();
        }
    }

    function startTimer() {
        setActive(true);
        if (preCallback) {
            preCallback();
        }
    }

    return (
        <div className="text-center w-full p-6 font-sans border-2 border-white rounded-lg shadow-lg bg-gray-900">
            <h1 className="text-4xl text-white font-bold pb-4">
                Remaining Time: <span className="text-orange-400">{timeLeft}</span>
            </h1>
            <Button
                onClick={startTimer}
                disabled={active}
                className="px-6 py-3 text-lg font-semibold rounded transition-all duration-200 cursor-pointer 
                   bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
                {active ? "Timer Running..." : "Start Timer"}
            </Button>
        </div>

    )
}