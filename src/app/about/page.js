"use client"
import { motion } from "motion/react"
import Image from "next/image"
export default function About(){
    return(
        <section className="bg-gray-950 flex flex-col items-center p-8">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
            name="mainProfileContainer" className="flex flex-row shadow-xl shadow-orange-300 rounded-xl bg-slate-800 p-6 h-4/6 w-5/6 my-5 hover:shadow-orange-500">
                <div name="photoContainer" className=" flex justify-center items-center">
                    <Image src="/ProfilePic.jpeg" alt="Profile" className="rounded-md h-full" width={300} height={200} />
                </div>
                <div name="textContainer" className="w-2/3 flex flex-col justify-center p-4 font-mono">
                    <p className="text-2xl my-2 text-white"> 
                        Hello, I'm <span className="font-bold">Tej Gumaste</span> and I'm a junior studying computer science with a minor in Mathematics at <b>University of Kansas</b>.
                    </p>
                    
                    <p className="text-2xl my-2 text-white">
                        I'm passionate about developing software that helps people around me and work on projects that are on the intersection of Mathematics
                        and Computer Science. I'm particularly interested in applying Computer Science and Machine Learning to help solve non-computer science problems.
                    </p>
                    
                </div>
            </motion.div>
            <p className="text-4xl text-white my-4"> Why MathQuest? </p>
            <p className="text-2xl text-white text-center max-w-5xl font-mono">
                I made MathQuest to help students build their speed mental math skills in an interactive and accountable manner. Originally,
                MathQuest was a project made for my brother to improve his mental math skills. I first asked him to use zetamac (also a very good website)
                but realized that tracking questions and progress is essential for improvement and thus MathQuest was born.
            </p>
            <p className="text-2xl text-white text-center max-w-5xl font-mono">
                I hope you enjoy using MathQuest as much as I enjoyed making it. If you have any suggestions or feedback, please feel free to reach out to me.
            </p>
            
        </section>
    )
}