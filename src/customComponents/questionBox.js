import { Input } from "@/components/ui/input"
export default function QuestionBox({opA, opB, symbol}) {
    if(opA===undefined){opA=2}
    if(opB===undefined){opB=2}
    if(symbol===undefined){symbol='+'}
    return (
        <div className="flex flex-col justify-center items-center border-white m-3 border-2 rounded-md p-4">
            <div className="flex flex-col justify-center items-center">
                <p className="text-2xl mb-3">{opA} {symbol} {opB} = </p> 
                <Input type="number" className="w-20 h-7 border-2 border-gray-500 rounded-md" />
            </div>
        </div>
    )
}