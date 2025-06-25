import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MergeFund - Build real impact. Get paid to contribute.",
  description: "Empowering software developers to earn real cryptocurrency rewards by solving open‑source issues.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
