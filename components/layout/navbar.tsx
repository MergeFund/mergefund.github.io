"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, Settings, User, LogOut, Code, Trophy, TrendingUp, Zap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Navbar({
  isLoggedIn = false,
  onLogout = () => {},
}: {
  isLoggedIn?: boolean
  onLogout?: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const router = useRouter()

  // 1) scroll down hides, scroll up shows & schedules auto-show
  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current + 5) {
        setVisible(false)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setVisible(true), 3000)
      } else if (currentY < lastScrollY.current - 5) {
        setVisible(true)
        if (timer.current) clearTimeout(timer.current)
      }
      setScrolled(currentY > 10)
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  // 2) peek on mouse at top of viewport
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setVisible(true)
        if (timer.current) clearTimeout(timer.current)
      }
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  // 3) container hover keeps it visible and cancels auto-hide
  const handleMouseEnter = () => {
    setVisible(true)
    if (timer.current) clearTimeout(timer.current)
  }
  const handleMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(true), 3000)
  }

  const handleLogout = () => {
    if (onLogout) onLogout()
    router.push("/")
  }

  const navigateTo = (path: string) => {
    // Public pages that don't require login
    const publicPages = ['/hackathons', '/about', '/support', '/careers', '/waitlist']
    
    if (isLoggedIn || publicPages.includes(path)) {
      router.push(path)
    } else {
      // Redirect all protected routes to waitlist for pre-launch
      router.push("/waitlist")
    }
  }

  const navItems: { href: string; label: string; Icon: React.ComponentType<any> }[] = [
    { label: "Bounties", href: "/bounties", Icon: Code },
    { label: "Leaderboard", href: "/leaderboard", Icon: Trophy },
    { label: "Discover", href: "/discover", Icon: TrendingUp },
    { label: "Hackathons", href: "/hackathons", Icon: Zap },
    { label: "About", href: "/about", Icon: User },
    { label: "Profile", href: "/profile/johndeveloper", Icon: User },
  ]

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            flex items-center justify-between
            bg-background/90 backdrop-blur-md shadow-md
            rounded-full px-6
            transition-all duration-500 ease-in-out
            ${scrolled ? "py-2" : "py-3"}
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image src="/placeholder-logo.png" alt="MergeFund Logo" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-accent">MergeFund</span>
          </Link>

          {/* Nav links - show different items based on login status */}
          <nav className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              // Logged in navigation
              navItems.map(({ href, Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="
                    group flex items-center px-3 py-1
                    text-foreground hover:text-accent
                    transition-colors duration-200
                    rounded-full
                    hover:bg-accent/10
                  "
                >
                  <Icon className="w-4 h-4 mr-1 transition-colors duration-200 group-hover:text-accent" />
                  <span className="text-sm">{label}</span>
                </Link>
              ))
            ) : (
              // Not logged in navigation
              <>
                <button
                  onClick={() => navigateTo("/discover")}
                  className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
                >
                  Discover
                </button>
                <button
                  onClick={() => navigateTo("/bounties")}
                  className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
                >
                  Bounties
                </button>
                <button
                  onClick={() => navigateTo("/leaderboard")}
                  className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => navigateTo("/hackathons")}
                  className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
                >
                  Hackathons
                </button>
                <button
                  onClick={() => navigateTo("/about")}
                  className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
                >
                  About
                </button>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <Avatar className="h-8 w-8 ring-0 hover:ring-2 hover:ring-accent transition-all">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 w-4 h-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 w-4 h-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => router.push("/waitlist")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
