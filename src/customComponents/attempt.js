import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Attempt({ numberOfQuestions, numberOfRights, numberOfWrongs, date }) {

    const percentageCorrect=(numberOfRights/numberOfQuestions)*100;
    const percentageWrong=(numberOfWrongs/numberOfQuestions)*100;
    return (
        <>
            <div className="flex flex-col bg-gray-800 p-5 m-5 hover:bg-gray-900 mb-0 rounded-lg">
                <p className="text-2xl">Date of attempt: {date}</p>
                <p className="text-md text-white text-left">Total Questions: {numberOfQuestions}</p>
                <div className="w-full h-4 bg-slate-400 flex flex-row rounded-l-md">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="h-full bg-green-500" style={{width:`${percentageCorrect}%`}}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{numberOfRights} correct questions</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="h-full bg-red-500" style={{width:`${percentageWrong}%`}}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{numberOfWrongs} wrong questions</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                    
                </div>
            </div>
        </>
    )
}