"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const router = useRouter()

  // Scroll behavior
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

  // Mouse peek behavior
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

  const handleMouseEnter = () => {
    setVisible(true)
    if (timer.current) clearTimeout(timer.current)
  }
  
  const handleMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(true), 3000)
  }

  const navigateTo = (path: string) => {
    // During pre-launch, all navigation goes to waitlist
    router.push("/waitlist")
    setMobileMenuOpen(false)
  }

  // Full navigation items for pre-launch (all redirect to waitlist)
  const navItems = [
    { label: "Discover", href: "/waitlist" },
    { label: "Bounties", href: "/waitlist" },
    { label: "Projects", href: "/waitlist" },
    { label: "Leaderboard", href: "/waitlist" },
    { label: "About", href: "/about" },
    { label: "Hackathons", href: "/hackathons" },
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
            rounded-full px-4 md:px-6
            transition-all duration-500 ease-in-out
            ${scrolled ? "py-2" : "py-3"}
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image src="/mergefundIcon.png" alt="MergeFund Logo" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-accent hidden sm:block">MergeFund</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => navigateTo(href)}
                className="text-foreground hover:text-accent transition-colors duration-200 px-3 py-1 rounded-full hover:bg-accent/10"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              onClick={() => router.push("/waitlist")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
            >
              Join Waitlist
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg rounded-b-2xl border-t border-border/50 mt-2 mx-4">
            <nav className="p-4 space-y-2">
              {navItems.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => navigateTo(href)}
                  className="
                    w-full flex items-center px-4 py-3
                    text-foreground hover:text-accent hover:bg-accent/10
                    transition-colors duration-200
                    rounded-lg
                  "
                >
                  <span>{label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-border/50">
                <Button
                  onClick={() => {
                    router.push("/waitlist")
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Join Waitlist
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
