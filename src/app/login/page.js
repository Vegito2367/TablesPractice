import styles from "@/app/styles.module.css"
import { Button } from "@/components/ui/button";
export default function Login() {
    return (
      <>
      <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
        <p className="text-4xl font-bold text-white mb-8">Enter your details</p>
        <div className="flex flex-col space-y-4 px-10 w-1/2">
          <div>
            <input type="text" placeholder="Username" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <div>
            <input type="password" placeholder="Password" className="bg-gray-800 text-white p-2 rounded w-full" />
          </div>
          <Button className="h-10" variant="secondary">Submit</Button>
        </div>
      </section>
      </>
    );
  }
  