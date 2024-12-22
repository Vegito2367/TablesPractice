'use client'
import Image from "next/image";
import styles from "@/app/styles.module.css"
export default function Home() {
  function handleClick(){
    
  }
  return (
    <div className={styles.page}>
      <h1>Welcome to TablesPractice</h1>
      <div style={{display:"flex", columnGap:"10px"}}>
        <a className={styles.button} href="/login">Sign in</a>
        <button className={styles.button}>Create Account</button>
      </div>
      
    </div>
  );
}
