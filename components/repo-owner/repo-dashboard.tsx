"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitHubAPI, type GitHubRepo } from "@/lib/github"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { WalletService } from "@/lib/wallet"
import { Star, GitFork, DollarSign, Gift, Plus, Eye, Settings, TrendingUp } from "lucide-react"

interface RepoDashboardProps {
  githubUsername: string
}

export function RepoDashboard({ githubUsername }: RepoDashboardProps) {
  const { user } = useAuth()
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [bounties, setBounties] = useState<any[]>([])
  const [donations, setDonations] = useState<any[]>([])
  const [totalDonations, setTotalDonations] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [githubUsername])

  const loadDashboardData = async () => {
    try {
      const github = new GitHubAPI()

      // Load user repositories
      const userRepos = await github.getUserRepos(githubUsername)
      setRepos(userRepos)

      // Load bounties created by this user
      const { data: userBounties } = await supabase
        .from("bounties")
        .select("*")
        .eq("created_by", user?.id)
        .order("created_at", { ascending: false })

      setBounties(userBounties || [])

      // Load donation transactions
      if (user) {
        const transactions = await WalletService.getTransactionHistory(user.id)
        const donationTransactions = transactions.filter((tx) => tx.type === "donation")
        setDonations(donationTransactions)
        setTotalDonations(donationTransactions.reduce((sum, tx) => sum + tx.amount, 0))
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const createBountyForRepo = (repo: GitHubRepo) => {
    // Navigate to create bounty page with repo pre-filled
    window.location.href = `/create?repo=${encodeURIComponent(repo.html_url)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <GitFork className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {repos.reduce((sum, repo) => sum + repo.forks_count, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Forks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{bounties.length}</div>
            <p className="text-sm text-gray-600">Active Bounties</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Gift className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">${totalDonations.toFixed(2)}</div>
            <p className="text-sm text-gray-600">Total Donations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="repositories" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="bounties">Bounties</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Repositories</h3>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Bounty
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{repo.name}</CardTitle>
                      {repo.description && <p className="text-gray-600 text-sm mb-3">{repo.description}</p>}

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-4 h-4 mr-1" />
                          {repo.forks_count}
                        </div>
                        {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Updated {formatDate(repo.updated_at)}</span>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-700 hover:bg-purple-800"
                        onClick={() => createBountyForRepo(repo)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Bounty
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bounties" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Bounties</h3>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="w-4 h-4 mr-2" />
              Create New Bounty
            </Button>
          </div>

          {bounties.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No bounties created yet</p>
                <p className="text-gray-400 mt-2">
                  Create your first bounty to get contributors working on your projects
                </p>
                <Button className="mt-4 bg-purple-700 hover:bg-purple-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Bounty
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{bounty.title}</h4>
                        <p className="text-gray-600 mb-3">{bounty.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge
                            className={
                              bounty.status === "Open"
                                ? "bg-green-100 text-green-800"
                                : bounty.status === "Claimed"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {bounty.status}
                          </Badge>
                          <span>Deadline: {formatDate(bounty.deadline)}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-700 mb-2">${bounty.reward_amount}</div>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Donation History</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">${totalDonations.toFixed(2)}</div>
              <p className="text-sm text-gray-600">Total Received</p>
            </div>
          </div>

          {donations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No donations received yet</p>
                <p className="text-gray-400 mt-2">Share your profile to start receiving donations from supporters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Donation received</p>
                        <p className="text-sm text-gray-600">{formatDate(donation.created_at)}</p>
                        {donation.metadata?.message && (
                          <p className="text-sm text-gray-500 mt-1">"{donation.metadata.message}"</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+${donation.amount.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Repository Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Analytics dashboard coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  Track your repository performance, bounty success rates, and contributor engagement
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
