"use client"
import { useState, useEffect } from "react"

export default function AttemptPage({params})
{
    const [slug,setSlug] = useState("");
    useEffect(() => {
        async function fetchData()
        {
            const temp = (await params).slug
            setSlug(temp)
        }
        fetchData();
    },[])
    return (
        <div>
            <h1>Attempt Page - {slug}</h1>
        </div>
    )
}