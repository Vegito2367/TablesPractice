import { redirect } from "next/navigation";
import { createClient } from "@/utils/server";
export default async function Dashboard()
{
    const supabase = await createClient();
    const {data ,error} = await supabase.auth.getUser();
    if(error || !data.user){
        return(
            <>
                <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                    <h1>Dashboard</h1>
                    <p> You are not logged in</p>
                </section>
            </>
        )
    }
    else{
        return(
            <>
               <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
                    <h1>Dashboard</h1>
                    <p> You are logged in as {data.user.email}</p>
                </section>
            </>
        )
    }
}