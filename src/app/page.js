'use client'

import { useState, useEffect } from "react";
import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { attemptSignup } from "@/utils/actions";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import validateLogin from "./middle";
import { useRouter } from "next/navigation";
import NavBar from "@/customComponents/navbar";
import LoadingButton from "@/customComponents/loadingButton";

export default function Home() {

  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const buttonObjects = [
    {
      text: "About",
      path: "/about",
    },
    {
      text: "Contact",
      path: "/contact",
    },
  ]

  useEffect(() => {
    async function checkLogin() {
      const { status, response } = await validateLogin();

      if (status === 200) {
        setLoggedIn(true);
      }
    }
    checkLogin();
  }, [])
  async function PreSignup(formData) {
    setLoading(true);
    const fullName = formData.get('fullName');
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
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
      options: {
        data: {
          firstName: firstName,
          lastName: lastName
        },
        emailRedirectTo: "https://mathquest-five.vercel.app/login"
      }
    }

    const { status, response } = await attemptSignup(data);
    if (status === 400) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: response,
      })
      setLoading(false);
      return;
    }
    if (status === 200) {
      toast({
        title: "Please confirm your email",
        description: message,
      })

    }
  }

  return (
    <>
      <section className="h-screen bg-gray-950 flex flex-col justify-center items-center font-mono">
        <h1 className="text-5xl text-white font-bold text-center py-10 animate-flyIn">
          Welcome to <span className="text-orange-400">MathVenture</span>! 🚀
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8 animate-flyIn">
          Sign up now and start your MathVenture with us!
        </p>


        <form className="flex flex-col space-y-4 bg-gray-800 px-8 py-6 w-full max-w-md rounded-lg shadow-lg animate-flyIn">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Enter Sign-Up Details
          </h2>


          <input
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Full Name"
            className="bg-gray-700 text-white p-3 rounded w-full border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />


          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            className="bg-gray-700 text-white p-3 rounded w-full border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />


          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            className="bg-gray-700 text-white p-3 rounded w-full border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />


          <button
            className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            disabled={loading}
            formAction={PreSignup}
          >
            {loading && <Loader2 className="animate-spin mr-2" size={20} strokeWidth={2} />}
            {loading ? "Please Wait..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <button
          className="mt-6 text-orange-400 hover:text-orange-300 transition-all duration-200"
          onClick={() => { redirect("/login") }}
        >
          Already have an account? <span className="underline">Login</span>
        </button>
        <div onClick={() => { router.push("/about") }}
          className="absolute bg-orange-300 text-black p-2 text-xl rounded-md text-center bottom-8 w-1/2 hover:bg-orange-500 cursor-pointer">
          Made with passion by Tej Gumaste - Learn More
        </div>
      </section>

    </>
  );
}
