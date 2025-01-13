"use client"
import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { attemptLogin } from "@/utils/actions";
export default function Login() {
  const { toast } = useToast();
  async function PreLogin(formData) {

    const username = formData.get('username');
    const password = formData.get('password');
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long",
      })
      return;

    }
    if (!username.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email",
      })
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
      return;
    }
    if(status===200){
      toast({
        variant: "success",
        title: "Login successful",
        description: response,
      })
      redirect("/dashboard")
    }
  }

  return (
    <>
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
          <Button className="h-10" variant="secondary" formAction={PreLogin}>Submit</Button>
        </form>
        <Button className="text-white" variant="link" onClick={() => { redirect("signup") }}>Sign Up</Button>
      </section>
    </>
  );
}
