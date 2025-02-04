"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function NavBar({ buttonObjects }) {
    console.log(buttonObjects)
    const router = useRouter();
    return (
        <div className="absolute top-0 w-4/6 flex flex-row gap-5 justify-center mt-4 bg-gray-800 py-4 rounded-xl ">
            {buttonObjects.map((button, index) => {
                return (<div>
                    <Button className="hover:scale-105 transition-transform duration-200" variant="secondary" onClick={() => { router.push(button.path) }}>{button.text}</Button>
                </div>)

            })}
        </div>
    )

}