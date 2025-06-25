"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/lib/auth"
import { GitHubAPI, type GitHubRepo } from "@/lib/github"
import { Star, GitFork, ExternalLink, Calendar, TrendingUp, Code, Eye } from "lucide-react"

// Force dynamic rendering to prevent SSG issues with auth
export const dynamic = 'force-dynamic'

export default function TrendingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loadingRepos, setLoadingRepos] = useState(true)
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [language, setLanguage] = useState<string>("all")

  const languages = [
    "all",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
  ]

  useEffect(() => {
    if (user) {
      loadTrendingRepos()
    }
  }, [user, timeframe, language])

  const loadTrendingRepos = async () => {
    setLoadingRepos(true)
    try {
      const github = new GitHubAPI()
      const trendingRepos = await github.getTrendingRepos(language === "all" ? undefined : language, timeframe)
      setRepos(trendingRepos)
    } catch (error) {
      console.error("Error loading trending repos:", error)
      // Fallback to mock data
      setRepos(mockTrendingRepos)
    } finally {
      setLoadingRepos(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800",
      TypeScript: "bg-blue-100 text-blue-800",
      Python: "bg-green-100 text-green-800",
      Java: "bg-red-100 text-red-800",
      Go: "bg-cyan-100 text-cyan-800",
      Rust: "bg-orange-100 text-orange-800",
      "C++": "bg-pink-100 text-pink-800",
      "C#": "bg-purple-100 text-purple-800",
      PHP: "bg-indigo-100 text-indigo-800",
      Ruby: "bg-red-100 text-red-800",
      Swift: "bg-orange-100 text-orange-800",
      Kotlin: "bg-purple-100 text-purple-800",
    }
    return colors[language] || "bg-gray-100 text-gray-800"
  }

  if (loading || loadingRepos) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p>Loading trending repositories...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <div className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Trending Repositories</h1>
              <p className="text-gray-600">Discover the most popular repositories on GitHub</p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang === "all" ? "All Languages" : lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trending Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">{repos.length}</div>
                <p className="text-sm text-gray-600">Trending Repos</p>
              </CardContent>
            </Card>

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
                <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(repos.map((repo) => repo.language).filter(Boolean)).size}
                </div>
                <p className="text-sm text-gray-600">Languages</p>
              </CardContent>
            </Card>
          </div>

          {/* Repository Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">Trending</Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-700 flex items-center"
                        >
                          {repo.name}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">by {repo.owner.login}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {repo.description && <p className="text-gray-700 mb-4 line-clamp-3">{repo.description}</p>}

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {repo.stargazers_count.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1 text-gray-500" />
                        {repo.forks_count.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(repo.updated_at)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {repo.language && <Badge className={getLanguageColor(repo.language)}>{repo.language}</Badge>}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                        <Star className="w-4 h-4 mr-1" />
                        Star
                      </Button>
                    </div>
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
            ))}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No trending repositories found</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or check back later</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Mock data for development
const mockTrendingRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "awesome-ai-tools",
    full_name: "developer/awesome-ai-tools",
    description: "A curated list of awesome AI tools and resources for developers",
    html_url: "https://github.com/developer/awesome-ai-tools",
    stargazers_count: 15420,
    forks_count: 2340,
    language: "TypeScript",
    topics: ["ai", "machine-learning", "tools", "awesome-list"],
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    open_issues_count: 45,
    size: 15000,
    default_branch: "main",
    owner: {
      login: "developer",
      avatar_url: "/placeholder.svg?height=40&width=40",
      type: "User",
    },
  },
  {
    id: 2,
    name: "next-gen-framework",
    full_name: "techcorp/next-gen-framework",
    description: "The next generation web framework built for modern applications",
    html_url: "https://github.com/techcorp/next-gen-framework",
    stargazers_count: 8920,
    forks_count: 1240,
    language: "JavaScript",
    topics: ["framework", "web", "react", "nextjs"],
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    open_issues_count: 23,
    size: 8500,
    default_branch: "main",
    owner: {
      login: "techcorp",
      avatar_url: "/placeholder.svg?height=40&width=40",
      type: "Organization",
    },
  },
]
