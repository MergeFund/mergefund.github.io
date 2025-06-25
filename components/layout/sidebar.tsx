"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Code, TrendingUp, DollarSign, Trophy, User, Settings, Bell, LogOut, Star, GitBranch } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
  { name: "My Bounties", href: "/bounties", icon: Code },
  { name: "Create Bounty", href: "/create", icon: DollarSign },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Most Starred", href: "/most-starred", icon: Star },
  { name: "Trending Repos", href: "/trending", icon: GitBranch },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()

  const getProfileHref = () => {
    if (user?.user_metadata?.username) {
      return `/profile/${user.user_metadata.username}`
    }
    return "/profile"
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-purple-700">MergeFund</span>
        </div>

        <nav className="space-y-2 flex-1">
          {navigation.map((item) => {
            const href = item.name === "Profile" ? getProfileHref() : item.href
            const isActive = pathname === href || (item.name === "Profile" && pathname.startsWith("/profile"))

            return (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-6 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
