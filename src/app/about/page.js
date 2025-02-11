"use client"
import { motion } from "motion/react"
import Image from "next/image"
export default function About(){
    return(
        <section className="h-screen bg-gray-950 flex flex-col items-center">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="text-white text-4xl">
                Hello! I'm Tej
            </motion.div>
            <div name="mainProfileContainer" className="flex flex-row shadow-2xl shadow-orange-300 rounded-xl bg-slate-800 p-4 h-4/6 w-5/6 my-5">
                <div name="photoContainer" className="w-1/3">
                    <img src="/ProfilePic.jpeg" alt="Profile" className="rounded-md h-full" />
                </div>
                <div name="textContainer" className="w-2/3">
                    Hello world
                </div>
            </div>
        </section>
    )
}