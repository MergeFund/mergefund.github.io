"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitHubAPI, type GitHubRepo, type GitHubIssue, type GitHubPullRequest, type GitHubCommit } from "@/lib/github"
import { Star, GitFork, AlertCircle, GitPullRequest, GitCommit, Code, ExternalLink, Calendar, User } from "lucide-react"

interface RepoViewerProps {
  owner: string
  repo: string
}

export function RepoViewer({ owner, repo }: RepoViewerProps) {
  const [repository, setRepository] = useState<GitHubRepo | null>(null)
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([])
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [readme, setReadme] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    loadRepoData()
  }, [owner, repo])

  const loadRepoData = async () => {
    try {
      const github = new GitHubAPI()

      // Load repository details
      const repoData = await github.getRepo(owner, repo)
      setRepository(repoData)

      // Load issues, PRs, and commits in parallel
      const [issuesData, prsData, commitsData, readmeData] = await Promise.all([
        github.getRepoIssues(owner, repo),
        github.getRepoPullRequests(owner, repo),
        github.getRepoCommits(owner, repo),
        github.getRepoReadme(owner, repo),
      ])

      setIssues(issuesData)
      setPullRequests(prsData)
      setCommits(commitsData)
      setReadme(readmeData)
    } catch (error) {
      console.error("Error loading repository data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800",
      TypeScript: "bg-blue-100 text-blue-800",
      Python: "bg-green-100 text-green-800",
      Java: "bg-red-100 text-red-800",
      Go: "bg-cyan-100 text-cyan-800",
      Rust: "bg-orange-100 text-orange-800",
    }
    return colors[language] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    )
  }

  if (!repository) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Repository not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Repository Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold">{repository.name}</h1>
                <Badge variant="outline">{repository.owner.type}</Badge>
                {repository.language && (
                  <Badge className={getLanguageColor(repository.language)}>{repository.language}</Badge>
                )}
              </div>
              <p className="text-gray-600 mb-4">{repository.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {repository.stargazers_count.toLocaleString()} stars
                </div>
                <div className="flex items-center">
                  <GitFork className="w-4 h-4 mr-1" />
                  {repository.forks_count.toLocaleString()} forks
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {repository.open_issues_count} issues
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Updated {formatTimeAgo(repository.updated_at)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-1" />
                Star
              </Button>
              <Button variant="outline" size="sm">
                <GitFork className="w-4 h-4 mr-1" />
                Fork
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                View on GitHub
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Repository Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues ({issues.length})</TabsTrigger>
          <TabsTrigger value="pulls">Pull Requests ({pullRequests.length})</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {readme && (
            <Card>
              <CardHeader>
                <CardTitle>README.md</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    {readme.content ? "README content would be rendered here" : "No README available"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issues.slice(0, 5).map((issue) => (
                    <div key={issue.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{issue.title}</h4>
                        <p className="text-xs text-gray-500">
                          #{issue.number} opened {formatTimeAgo(issue.created_at)} by {issue.user.login}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Commits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commits.slice(0, 5).map((commit) => (
                    <div key={commit.sha} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <GitCommit className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{commit.commit.message}</h4>
                        <p className="text-xs text-gray-500">
                          {commit.author?.login || commit.commit.author.name} •{" "}
                          {formatTimeAgo(commit.commit.author.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {issues.map((issue) => (
            <Card key={issue.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{issue.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        #{issue.number} opened {formatDate(issue.created_at)} by {issue.user.login}
                      </p>
                      {issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {issue.labels.map((label) => (
                            <Badge
                              key={label.name}
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: `#${label.color}20`,
                                borderColor: `#${label.color}`,
                                color: `#${label.color}`,
                              }}
                            >
                              {label.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{issue.comments} comments</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pulls" className="space-y-4">
          {pullRequests.map((pr) => (
            <Card key={pr.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <GitPullRequest className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{pr.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        #{pr.number} opened {formatDate(pr.created_at)} by {pr.user.login}
                      </p>
                      <p className="text-xs text-gray-500">
                        {pr.head.ref} → {pr.base.ref}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={pr.state === "open" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}
                    >
                      {pr.state}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="commits" className="space-y-4">
          {commits.map((commit) => (
            <Card key={commit.sha}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <GitCommit className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{commit.commit.message}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {commit.author?.login || commit.commit.author.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(commit.commit.author.date)}
                      </div>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{commit.sha.substring(0, 7)}</code>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Code browser would be implemented here</p>
                <p className="text-sm text-gray-400 mt-2">
                  This would show the repository file tree and allow browsing files
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
