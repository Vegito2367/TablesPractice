'use client'
import Image from "next/image";
import styles from "@/app/styles.module.css"
export default function Home() {
  function handleClick(){
    
  }
  return (
    <>
      <section className="h-screen bg-gray-950 flex flex-col justify-center items-center">
        <p className="text-5xl text-white font-bold text-center py-10 animate-fade animate-flyIn">
          Hello welcome to the tabels practice module.
        </p>
        <div className="flex flex-row space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
            Sign up
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
            Login
          </button>
          
        </div>

      </section>
      
    </>
  );
}
