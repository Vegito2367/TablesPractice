import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function Timer({ totalTime }) {

    const [timeLeft, setTimeLeft] = useState(totalTime);

    function startTimer() {
        const eventID = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        setTimeout(() => {
            clearInterval(eventID)
        }, totalTime * 1000)
    }





    return (
        <div>
            <h1>Time Left: {timeLeft}</h1>
            <Button onClick={startTimer}>Start Timer</Button>
        </div>
    )
}