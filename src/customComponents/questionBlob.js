"use client"

export default function QuestionBlob({ opA, opB, symbol, userA, correctA }) {
    const isCorrect = userA === correctA;
    const color = isCorrect ? "text-green-500" : "text-red-500";
    return (
        <div className="bg-gray-800 m-3 rounded-lg p-6 h-28 flex flex-col justify-center items-center shadow-lg">
            <h1 className="text-4xl text-white text-center font-bold">
                {opA} {symbol} {opB} = <span className={`${color} font-extrabold`}>{userA}</span>
            </h1>

            {!isCorrect && (
                <h1 className="text-2xl text-gray-300 text-center mt-2">
                    Correct Answer: <span className="text-orange-400 font-semibold">{correctA}</span>
                </h1>
            )}
        </div>

    )
}