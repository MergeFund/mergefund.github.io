"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url: string
  bio: string
  location: string
  website: string
  github_username: string
  twitter_username: string
  linkedin_username: string
  company: string
  job_title: string
  skills: string[]
  interests: string[]
  total_earned: number
  bounties_completed: number
  success_rate: number
  avg_completion_time: string
  rating: number
  github_score: number
  bounty_score: number
  total_score: number
  rank: number
  streak: number
  badges: string[]
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    // During pre-launch, redirect all login attempts to waitlist
    router.push("/waitlist")
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")
    }
    router.push("/")
  }

  useEffect(() => {
    // During pre-launch, ensure no user is logged in
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")
    }
  }, [])

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
