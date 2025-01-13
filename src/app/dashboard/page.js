import { redirect } from "next/navigation";
import { createClient } from "@/utils/server";
export default async function Dashboard()
{
    const supabase = await createClient();
    const {data ,error} = await supabase.auth.getUser();
    if(error || !data.user){
        return(
            <>
                <h1>Dashboard</h1>
                <p> You are not logged in</p>
                
            </>
        )
    }
    else{
        return(
            <>
                <h1>Dashboard</h1>
                <p> You are logged in as {data.user.firstName}</p>
            </>
        )
    }
}