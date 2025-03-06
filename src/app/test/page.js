"use client"
import { Bar, BarChart, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import TestChart from "@/customComponents/testChart"

export default function TestPage() {


    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    }
    return (
        <>
            <section className="h-screen bg-gray-950 flex flex-col justify-center items-center font-mono">
                <h1>Test page</h1>
                <div className="max-h[500px]">
                    <TestChart />
                </div>
            </section>
        </>
    )
}


