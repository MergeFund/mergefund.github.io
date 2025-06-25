"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Redirect to waitlist during pre-launch
      router.push("/waitlist")
      onClose()
    }
  }, [isOpen, router, onClose])

  return null
}
