import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function Attempt({ numberOfQuestions, numberOfRights, numberOfWrongs, date, slug }) {
    const router = useRouter();
    const percentageCorrect=(numberOfRights/numberOfQuestions)*100;
    const percentageWrong=(numberOfWrongs/numberOfQuestions)*100;
    return (
        <>
            <div className="flex flex-col bg-gray-800 p-5 m-5 hover:bg-gray-900 mb-0 rounded-lg" onClick={()=>{router.push(`/dashboard/${slug}`)}}>
                <p className="text-2xl">Date of attempt: {date}</p>
                <p className="text-xl"> Attempt ID: {slug}</p>
                <p className="text-md text-white text-left">Total Questions: {numberOfQuestions}</p>
                <div className="w-full h-4 bg-slate-400 flex flex-row rounded-md">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="h-full bg-green-200" style={{width:`${percentageCorrect}%`}}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{numberOfRights} correct questions</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="h-full bg-red-200" style={{width:`${percentageWrong}%`}}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{numberOfWrongs} wrong questions</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* <Progress className="h-full rounded-md" value={percentageCorrect} text={`${numberOfRights} correct questions`} /> */}
                    
                </div>
            </div>
        </>
    )
}