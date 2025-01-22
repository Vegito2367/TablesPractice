"use client"
import { useEffect, useState } from "react"
import validateLogin from "../../middle";
import Timer from "@/customComponents/timer";
import { Button } from "@/components/ui/button";
import QuestionBox from "@/customComponents/questionBox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoadingButton from "@/customComponents/loadingButton";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function Attempt({ params }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [slug, setSlug] = useState("");
    const [userID, setUserID] = useState("");
    const [questionTypes,setQuestionTypes] = useState(["type1","type2","type3"]);
    useEffect(() => {
        async function checkUser() {
            try {

                const { status, response } = await validateLogin();
                setData({ status: status, response: response });
                setUserID(response.user.id);
                const tempslug = (await params).slug;
                setSlug(tempslug);
                if (status === 200) {
                    setLoggedIn(true);
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        checkUser();

        async function deleteEngine(){
            const response = await fetch(`/api/startingEngine?slug=${slug}`,{
                method:"DELETE",
            })
            try{
                const data = await response.json();
                console.log(data);
            }
            catch(e){
                console.log(e);
            }
        }
    }, [])


    function handleDialog() {
        setShowDialog(!showDialog);
    }

    async function testBackend(){
        const response = await fetch(`/api/questions?slug=${slug}`,{
            method:"GET",
        })
        try{
            const data = await response.json();
            if(data.status===200){

                setQuestionTypes(data.payload);
                toast({
                    title: "Success",
                    description: "Question types fetched"
                })
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.response
                })
            }
        }
        catch(e){
            console.log(e);
        }
    
    }

    if (!loggedIn) {
        return (
            <section className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
                <h1>User not logged in</h1>
            </section>
        )
    }
    else {
        return (
            <section className="h-screen w-screen bg-gray-950 text-white">
                <div className="flex flex-row justify-center gap-5 w-screen">
                    <div>
                        <Button className="" variant="secondary" onClick={() => { redirect("/") }}>Home</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={()=>{redirect("/dashboard")}}>Dashboard</Button>
                    </div>
                    <div>
                        <Button className="" variant="secondary" onClick={testBackend}>Test Backend</Button>
                    </div>

                </div>
                <h1>Attempt page</h1>
                <p>user logged in is : {data.response.user.email}</p>
                <p>Slug: {slug}</p>
                <p>user ID: {userID}</p>
                <p>Question Types: {questionTypes}</p>
                <Timer totalTime={10} callback={handleDialog} />

                <AlertDialog open={showDialog} onOpenChange={handleDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Time has elapsed.</AlertDialogTitle>
                            <AlertDialogDescription>Good job on the attempt!</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <QuestionBox />



            </section>
        )
    }

}