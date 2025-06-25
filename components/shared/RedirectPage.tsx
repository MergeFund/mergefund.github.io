"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface RedirectPageProps {
  destination?: string
  title?: string
  description?: string
}

export default function RedirectPage({ 
  destination = "/waitlist", 
  title = "Redirecting...", 
  description = "Taking you to the waitlist" 
}: RedirectPageProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to waitlist during pre-launch
    router.push(destination)
  }, [router, destination])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 mx-auto mb-4"
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>
    </div>
  )
} 