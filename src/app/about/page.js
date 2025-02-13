"use client"
import { motion } from "motion/react"
import Image from "next/image"
export default function About(){
    return(
        <section className="h-screen bg-gray-950 flex flex-col items-center">
            <motion.div initial={{opacity:0, x:1000}} animate={{opacity:1, x:0}} transition={{duration:1.25}} className="text-white text-4xl">
                Hello! I'm Tej
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
            name="mainProfileContainer" className="flex flex-row shadow-2xl shadow-orange-300 rounded-xl bg-slate-800 p-4 h-4/6 w-5/6 my-5">
                <div name="photoContainer" className="w-1/3">
                    <img src="/ProfilePic.jpeg" alt="Profile" className="rounded-md h-full" />
                </div>
                <div name="textContainer" className="w-2/3 flex flex-col">
                    <p className="text-2xl my-2"> 
                        Hello I'm Tej Gumaste and I'm a junior studying computer science with a minor in Mathematics at <b>University of Kansas</b> 
                    </p>
                    
                    <p className="text-2xl my-2">
                        I'm passionate about developing software that helps the people around me and work on projects that are on the intersection of Mathematics
                        and Computer Science. I'm particulary interested in applying Computer Science and Machine learning to help solve non-computer science problems.
                    </p>
                    
                </div>
            </motion.div>
            <p className="text-4xl text-white my-4"> Why MathQuest? </p>
            <p className="text-2xl">
                        I made MathQuest to help students build their speed mental math skills in an interactive and accountable manner. Originally,
                        MathQuest was a project made for my brother to improve his mental math skills. I first asked him to use zetamac(also very good website)
                        but realized that tracking questions and progress is essential for improvement and thus MathQuest was born.
            </p>
        </section>
    )
}