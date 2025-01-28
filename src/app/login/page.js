"use client"
import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { attemptLogin } from "@/utils/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Login() {
  
  const { toast } = useToast();
  
  const [loading,setLoading]=useState(false);
  async function PreLogin(formData) {
    setLoading(true);
    const username = formData.get('username');
    const password = formData.get('password');
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long",
      })
      setLoading(false);
      return;

    }
    if (!username.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email",
      })
      setLoading(false);
      return;
    }

    const data = {
      email: username,
      password: password,
    }

    const {status,response} = await attemptLogin(data)
    console.log(status,response)
    if(status===400){
      toast({
        variant: "destructive",
        title: "Login failed",
        description: response,
      })
      setLoading(false);
      return;
    }
    if(status===200){
      toast({
        variant: "success",
        title: "Login successful",
        description: response,
      })
      setTimeout(()=>{
        setLoading(false)
router.push("/dashboard")
      },2000)
      
    }
  }

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{duration: 1}}>
      <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
        <Button className="mb-4" variant="secondary" onClick={() => { redirect("/") }}>Go to Home</Button>
        <form className="flex flex-col space-y-4 px-10 w-1/2 animate-flyIn">
          <p className="text-4xl font-bold text-white mb-8">Enter your Login details</p>
          <div>
            <input name="username" id="username" type="text" placeholder="Username" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <div>
            <input name="password" id="password" type="password" placeholder="Password" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <Button className="h-10" variant="secondary" disabled={loading} formAction={PreLogin}>
            <Loader2 size={20} className={loading?"block":"hidden"} />
            {loading?"Please Wait":"Submit"}
          </Button>
        </form>
        <Button className="text-white" variant="link" onClick={() => { redirect("/signup") }}>Sign Up</Button>
      </section>
    </motion.div>
  );
}
