"use client"
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { useEffect } from "react";
// import "tailwindcss/tailwind.css"



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
