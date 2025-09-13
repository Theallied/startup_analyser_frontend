import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Work_Sans } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Startup Analyzer",
  description: "AI-powered startup analysis from your idea",
  generator: "v0.app",
}

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${workSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
