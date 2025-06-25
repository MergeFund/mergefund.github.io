"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code,
  DollarSign,
  Trophy,
  User,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  Home,
  Search,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Bounties", href: "/bounties", icon: Code },
  { name: "Create Bounty", href: "/create", icon: DollarSign },
  { name: "Discover", href: "/discover", icon: Search },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AutoCollapseSidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()
  const { setTheme, theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isHovering) {
      setIsExpanded(true)
    } else {
      timeout = setTimeout(() => {
        setIsExpanded(false)
      }, 300)
    }
    return () => clearTimeout(timeout)
  }, [isHovering])

  const getProfileHref = () => {
    if (user?.user_metadata?.username) {
      return `/profile/${user.user_metadata.username}`
    }
    return "/profile"
  }

  if (!user) return null

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-background border-r transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-700 text-white">
            <Code className="size-4" />
          </div>
          {isExpanded && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">MergeFund</span>
              <span className="truncate text-xs text-muted-foreground">Build. Earn. Grow.</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/")

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isExpanded && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start space-x-3 h-auto p-3", !isExpanded && "justify-center")}
            >
              <Link href={getProfileHref()} className="flex items-center space-x-3 w-full">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url || "/placeholder.svg"}
                    alt={user?.user_metadata?.full_name || user?.email}
                  />
                  <AvatarFallback className="rounded-lg">
                    {(user?.user_metadata?.full_name || user?.email || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isExpanded && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.user_metadata?.full_name || user?.email}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      @{user?.user_metadata?.username || "user"}
                    </span>
                  </div>
                )}
              </Link>
              {isExpanded && <ChevronRight className="ml-auto size-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-lg" side="right" align="end" sideOffset={4}>
            <DropdownMenuItem asChild>
              <Link href={getProfileHref()}>
                <User />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun /> : <Moon />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
