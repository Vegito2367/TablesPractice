"use client"
import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { attemptSignup } from "@/utils/actions";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import validateLogin from "../middle";
export default function SignUp() {
    const { toast } = useToast();
    const [loading,setLoading]=useState(false);

    useEffect(() => {
    async function checkLogin() {
      const { status, response } = await validateLogin();
      if (status === 200) {
        router.push("/dashboard")
      }
    }
    checkLogin();
  },[])

    async function PreSignup(formData) {
        setLoading(true);
        const fullName = formData.get('fullName');
        const firstName=fullName.split(" ")[0];
        const lastName=fullName.split(" ")[1];
        const email = formData.get('email');
        const password = formData.get('password');
        if (password.length < 8) {
            toast({
                variant: "destructive",
                title: "Password too short",
                description: "Password must be at least 8 characters long",
            })
            setLoading(false);

        }
        else if (!email.includes("@")) {
            toast({
                variant: "destructive",
                title: "Invalid email",
                description: "Please enter a valid email",
            })
            setLoading(false);
        }
        else if (!fullName.includes(" ")) {
            toast({
                variant: "destructive",
                title: "Invalid name",
                description: "Please enter first and last name",
            })
            setLoading(false);
        }
        const data = {
            email: email,
            password: password,
            options:{
                data:{
                    firstName:firstName,
                    lastName:lastName
                }
            }
        }

        const {status,message}= await attemptSignup(data);
        if(status===400){
            toast({
                variant: "destructive",
                title: "Signup failed",
                description: message,
            })
            setLoading(false);
            return;
        }
        if(status===200){
            toast({
                title: "Signup successful",
                description: message,
            })
            setTimeout(()=>{
                setLoading(false);
                redirect("/login")
            },2000)
            
        }
    }
    return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{duration: 1}}>
            <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
                <Button className="mb-4" variant="secondary" onClick={() => { redirect("/") }}>Go to Home</Button>
                <form className="flex flex-col space-y-4 px-10 w-1/2 animate-flyIn">
                    <p className="text-4xl font-bold text-white mb-8">Enter Sign Up details </p>
                    <input name="fullName" id="fullName" type="text" placeholder="your mom" className="bg-gray-800 text-white p-2 rounded w-full"></input>
                    <div>
                        <input name="email" id="email" type="email" placeholder="Email" className="bg-gray-800 text-white p-2 rounded w-full" />
                    </div>
                    <div>
                        <input name="password" id="password" type="password" placeholder="Password" className="bg-gray-800 text-white p-2 rounded w-full" />
                    </div>
                    <Button className="h-10" variant="secondary" disabled={loading} formAction={PreSignup}>
                        {loading && <Loader2 className="animate-spin" size={20} strokeWidth={2} />}
                        {loading?"Please Wait":"Submit"}
                    </Button>
                </form>
                <Button className="text-white" variant="link" onClick={() => { redirect("/login") }}>Login</Button>
            </section>
        </motion.div>
    );
}
