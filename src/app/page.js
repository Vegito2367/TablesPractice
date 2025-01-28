'use client'
import Image from "next/image";
import styles from "@/app/styles.module.css"
import QuestionBlob from "@/customComponents/questionBlob";
export default function Home() {
  const questions = [
    {
      opA: 2,
      opB: 3,
      symbol: "+",
      userA: 5,
      correctA: 5
    },
    {
      opA: 5,
      opB: 3,
      symbol: "-",
      userA: 1,
      correctA: 2
    },
    {
      opA: 2,
      opB: 3,
      symbol: "*",
      userA: 6,
      correctA: 6
    },
    {
      opA: 10,
      opB: 2,
      symbol: "/",
      userA: 7,
      correctA: 5
    }
  ]
  function handleClick() {

  }
  return (
    <>
      <section className="h-screen bg-gray-950 flex flex-col justify-center items-center">
        <p className="text-5xl text-white font-bold text-center py-10 animate-flyIn">
          Hello welcome to the tabels practice module.
        </p>
        <div className="flex flex-row space-x-4">
          <a href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleClick}>
            Sign up
          </a>
          <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleClick}>
            Login
          </a>
          <a href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Dashboard
          </a>

        </div>
        <div className="flex flex-col w-full">
          {
            questions.map((question, index) => {
              return <QuestionBlob key={index} opA={question.opA} opB={question.opB} symbol={question.symbol} userA={question.userA} correctA={question.correctA} />
            })
          }
        </div>

      </section>

    </>
  );
}
