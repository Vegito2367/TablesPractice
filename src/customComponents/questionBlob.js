"use client"
export default function QuestionBlob({ opA, opB, symbol, userA, correctA }) {
    const isCorrect = userA === correctA;
    const color = isCorrect ? "green" : "red";
    return (
        <div className="bg-gray-800 m-3 rounded-lg p-5">
            <h1 className="text-4xl text-white text-center">{opA} {symbol} {opB} = <span className={`text-${color}-500`}>{correctA}</span></h1>
            {!isCorrect && <h1 className="text-2xl text-white text-center">User answer: {userA}</h1>}
        </div>
    )
}