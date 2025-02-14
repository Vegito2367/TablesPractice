"use client"
import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { attemptLogin } from "@/utils/actions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import validateLogin from "../middle";

export default function Login() {

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const { status, response } = await validateLogin();
      if (status === 200) {
        router.push("/dashboard")
      }
    }
    checkLogin();
  },[])


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

    const { status, response } = await attemptLogin(data)
    console.log(status, response)
    if (status === 400) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: response,
      })
      setLoading(false);
      return;
    }
    if (status === 200) {
      toast({
        variant: "success",
        title: "Login successful",
        description: response,
      })
      setTimeout(() => {
        setLoading(false)
        router.push("/dashboard")
      }, 2000)

    }
  }

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
        <Button className="mb-4 bg-orange-500" onClick={() => { redirect("/") }}>Learn more</Button>
        {/* <form className="flex flex-col space-y-4 px-10 w-1/2 animate-flyIn">
          <p className="text-4xl font-bold text-white mb-8">Enter your Login details</p>
          <div>
            <input name="username" id="username" type="text" placeholder="Username" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <div>
            <input name="password" id="password" type="password" placeholder="Password" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <Button className="h-10" variant="secondary" disabled={loading} formAction={PreLogin}>
            <Loader2 size={20} className={loading ? "block" : "hidden"} />
            {loading ? "Please Wait" : "Submit"}
          </Button>
        </form>
        <Button className="text-white" variant="link" onClick={() => { redirect("/signup") }}>Sign Up</Button> */}
        {/* Title */}
        <h1 className="text-5xl text-white font-bold text-center py-10 animate-flyIn">
                Welcome Back to <span className="text-orange-400">MathQuest</span>! 🔢
            </h1>
            <p className="text-xl text-gray-300 text-center mb-8 animate-flyIn">
                Enter your login details to continue.
            </p>

            {/* Login Form */}
            <form className="flex flex-col space-y-4 bg-gray-800 px-8 py-6 w-full max-w-md rounded-lg shadow-lg animate-flyIn">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Login to Your Account
                </h2>

                {/* Username */}
                <input 
                    name="username" 
                    id="username" 
                    type="text" 
                    placeholder="Username" 
                    className="bg-gray-700 text-white p-3 rounded w-full border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                {/* Password */}
                <input 
                    name="password" 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    className="bg-gray-700 text-white p-3 rounded w-full border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />

                {/* Submit Button */}
                <button 
                    className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                    disabled={loading}
                    formAction={PreLogin}
                >
                    {loading && <Loader2 className="animate-spin mr-2" size={20} strokeWidth={2} />}
                    {loading ? "Please Wait..." : "Log In"}
                </button>
            </form>

            {/* Sign Up Redirect */}
            <p className="mt-6 text-gray-300">
                Don’t have an account?  
                <button 
                    className="ml-2 text-orange-400 hover:text-orange-300 font-semibold transition-all duration-200 underline"
                    onClick={() => { redirect("/") }}
                >
                    Sign Up
                </button>
            </p>
      </section>
    </motion.div>
  );
}
