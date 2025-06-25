"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, GitFork, ExternalLink, Calendar, Eye, Heart, DollarSign } from "lucide-react"
import Link from "next/link"
import { WalletService } from "@/lib/wallet"
import { supabase } from "@/lib/supabase"
import type { GitHubRepo } from "@/lib/github"

interface RepoCardProps {
  repo: GitHubRepo
  index?: number
  badgeText?: string
  badgeIcon?: React.ComponentType<{ className?: string }>
}

export function RepoCard({ repo, index, badgeText, badgeIcon: BadgeIcon }: RepoCardProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  const [donationModal, setDonationModal] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")
  const [donationMessage, setDonationMessage] = useState("")
  const [donating, setDonating] = useState(false)

  const handleDonate = async () => {
    if (!user || !donationAmount) return

    setDonating(true)
    try {
      const amount = Number.parseFloat(donationAmount)
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount")
        return
      }

      // Get or create repo wallet
      let repoWallet = await getRepoWallet(repo.full_name)
      if (!repoWallet) {
        repoWallet = await createRepoWallet(repo.full_name, repo.owner.login)
      }

      // Process donation
      await WalletService.processPayment(user.id, repoWallet.user_id, amount, "donation", {
        repo_name: repo.full_name,
        message: donationMessage,
      })

      alert(`Successfully donated $${amount} to ${repo.full_name}!`)
      setDonationModal(false)
      setDonationAmount("")
      setDonationMessage("")
    } catch (error) {
      console.error("Error processing donation:", error)
      alert("Failed to process donation. Please try again.")
    } finally {
      setDonating(false)
    }
  }

  const getRepoWallet = async (repoFullName: string) => {
    const { data } = await supabase.from("repo_wallets").select("*").eq("repo_full_name", repoFullName).single()
    return data
  }

  const createRepoWallet = async (repoFullName: string, ownerLogin: string) => {
    const { data, error } = await supabase
      .from("repo_wallets")
      .insert({
        repo_full_name: repoFullName,
        owner_login: ownerLogin,
        wallet_address: `repo_${repoFullName.replace("/", "_")}_${Date.now()}`,
        balance: 0,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Java: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Go: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      Rust: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return colors[language] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <>
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {typeof index === "number" && (
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                )}
                {badgeText && BadgeIcon && (
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    <BadgeIcon className="w-3 h-3 mr-1" />
                    {badgeText}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mb-2">
                <Link
                  href={`/repo/${repo.owner.login}/${repo.name}`}
                  className="hover:text-purple-700 dark:hover:text-purple-300 flex items-center"
                >
                  {repo.name}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">by {repo.owner.login}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {repo.description && <p className="text-sm mb-4 line-clamp-3">{repo.description}</p>}

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                {repo.stargazers_count.toLocaleString()}
              </div>
              <div className="flex items-center">
                <GitFork className="w-4 h-4 mr-1" />
                {repo.forks_count.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(repo.updated_at)}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {repo.language && <Badge className={getLanguageColor(repo.language)}>{repo.language}</Badge>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
                <Button variant="outline" size="sm" className="btn-hover-lift">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="btn-hover-lift">
                <Star className="w-4 h-4 mr-1" />
                Star
              </Button>
            </div>

            <Button
              size="sm"
              onClick={() => setDonationModal(true)}
              className="bg-red-500 hover:bg-red-600 btn-hover-lift"
            >
              <Heart className="w-4 h-4 mr-1" />
              Donate
            </Button>
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {repo.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{repo.topics.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Modal */}
      <Dialog open={donationModal} onOpenChange={setDonationModal}>
        <DialogContent className="backdrop-blur-custom">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Donate to {repo.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Donation Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="10.00"
                min="0.01"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
                placeholder="Thank you for your amazing work!"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDonationModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleDonate} disabled={donating || !donationAmount}>
                {donating ? (
                  <>
                    <div className="loading-spinner w-4 h-4 mr-2"></div>
                    Donating...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate ${donationAmount}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
