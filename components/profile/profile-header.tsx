"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Twitter, Linkedin, Calendar, Star, Trophy, DollarSign, Edit, Wallet, Gift } from "lucide-react"
import type { Database } from "@/lib/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  reputation_score?: {
    total_score: number
    rank: number
    badges: string[]
  }
  wallet?: {
    address: string
    balance: number
  }
}

interface ProfileHeaderProps {
  profile: Profile
  isOwnProfile: boolean
  onEdit?: () => void
  onDonate?: () => void
}

export function ProfileHeader({ profile, isOwnProfile, onEdit, onDonate }: ProfileHeaderProps) {
  const [showWallet, setShowWallet] = useState(false)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Elite Contributor":
        return "bg-purple-100 text-purple-800"
      case "Senior Developer":
        return "bg-blue-100 text-blue-800"
      case "GitHub Master":
        return "bg-gray-100 text-gray-800"
      case "Bounty Hunter":
        return "bg-green-100 text-green-800"
      default:
        return "bg-orange-100 text-orange-800"
    }
  }

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || profile.username} />
              <AvatarFallback className="text-2xl">
                {(profile.full_name || profile.username).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Wallet Info */}
            {profile.wallet && (
              <div className="text-center md:text-left">
                <Button variant="outline" size="sm" onClick={() => setShowWallet(!showWallet)} className="mb-2">
                  <Wallet className="w-4 h-4 mr-2" />
                  {showWallet ? "Hide Wallet" : "Show Wallet"}
                </Button>

                {showWallet && (
                  <div className="text-sm text-gray-600">
                    <p className="font-mono">{formatWalletAddress(profile.wallet.address)}</p>
                    <p className="font-semibold">${profile.wallet.balance.toFixed(2)}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.full_name || profile.username}</h1>
                <p className="text-xl text-gray-600 mb-2">@{profile.username}</p>

                {profile.bio && <p className="text-gray-700 mb-4 max-w-2xl">{profile.bio}</p>}
              </div>

              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button onClick={onEdit} className="bg-purple-700 hover:bg-purple-800">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button onClick={onDonate} variant="outline">
                    <Gift className="w-4 h-4 mr-2" />
                    Donate
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                  <span className="text-2xl font-bold text-green-600">${profile.total_earnings.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="w-5 h-5 text-purple-600 mr-1" />
                  <span className="text-2xl font-bold text-purple-600">{profile.bounties_completed}</span>
                </div>
                <p className="text-sm text-gray-600">Bounties Completed</p>
              </div>

              {profile.reputation_score && (
                <>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 text-orange-600 mr-1" />
                      <span className="text-2xl font-bold text-orange-600">{profile.reputation_score.total_score}</span>
                    </div>
                    <p className="text-sm text-gray-600">Reputation Score</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-2xl font-bold text-blue-600">#{profile.reputation_score.rank}</span>
                    </div>
                    <p className="text-sm text-gray-600">Global Rank</p>
                  </div>
                </>
              )}
            </div>

            {/* Badges */}
            {profile.reputation_score?.badges && profile.reputation_score.badges.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.reputation_score.badges.map((badge) => (
                    <Badge key={badge} className={getBadgeColor(badge)}>
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {profile.github_username && (
                <a
                  href={`https://github.com/${profile.github_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-5 h-5 mr-2" />
                  {profile.github_username}
                </a>
              )}

              {profile.twitter_username && (
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  {profile.twitter_username}
                </a>
              )}

              {profile.linkedin_username && (
                <a
                  href={`https://linkedin.com/in/${profile.linkedin_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  {profile.linkedin_username}
                </a>
              )}

              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
