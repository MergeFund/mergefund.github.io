"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      }
    }
  }, [])

  const getProfileHref = () => {
    if (user?.username) {
      return `/profile/${user.username}`
    }
    return "/profile"
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <SidebarTrigger className="-ml-1" />
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search bounties, contributors..." className="pl-8 md:w-[300px] lg:w-[400px]" />
              </div>
            </div>

            <nav className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Link href={getProfileHref()}>
                    <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                      <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.full_name || user?.email} />
                      <AvatarFallback>{(user?.full_name || user?.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              ) : (
                <Button onClick={() => setAuthModalOpen(true)}>Sign In</Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
