"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitHubAPI, type GitHubRepo, type GitHubIssue } from "@/lib/github"
import { Github, Star, GitFork, ExternalLink, Calendar, AlertCircle, CheckCircle, Code } from "lucide-react"

interface GitHubIntegrationProps {
  githubUsername: string
}

export function GitHubIntegration({ githubUsername }: GitHubIntegrationProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingIssues, setLoadingIssues] = useState(false)

  useEffect(() => {
    loadUserRepos()
  }, [githubUsername])

  const loadUserRepos = async () => {
    try {
      const github = new GitHubAPI()
      const userRepos = await github.getUserRepos(githubUsername)
      setRepos(userRepos.slice(0, 12)) // Show top 12 repos
    } catch (error) {
      console.error("Error loading repos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadRepoIssues = async (repo: GitHubRepo) => {
    setLoadingIssues(true)
    setSelectedRepo(repo)

    try {
      const github = new GitHubAPI()
      const repoIssues = await github.getRepoIssues(repo.owner.login, repo.name)
      setIssues(repoIssues)
    } catch (error) {
      console.error("Error loading issues:", error)
      setIssues([])
    } finally {
      setLoadingIssues(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="w-5 h-5 mr-2" />
          GitHub Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="repositories" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="repositories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <Card key={repo.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg truncate">{repo.name}</h3>
                      <Button variant="ghost" size="sm" onClick={() => loadRepoIssues(repo)}>
                        <Code className="w-4 h-4" />
                      </Button>
                    </div>

                    {repo.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{repo.description}</p>}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-4 h-4 mr-1" />
                          {repo.forks_count}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(repo.updated_at)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {repo.language && (
                          <Badge variant="outline" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-700 hover:text-purple-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {selectedRepo ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Issues from {selectedRepo.name}</h3>
                  <a
                    href={`${selectedRepo.html_url}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {loadingIssues ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No open issues found in this repository.</p>
                    ) : (
                      issues.map((issue) => (
                        <Card key={issue.id} className="hover:shadow-sm transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start space-x-2 flex-1">
                                {issue.state === "open" ? (
                                  <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 mb-1">{issue.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    #{issue.number} opened {formatDate(issue.created_at)} by {issue.user.login}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={issue.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-700 hover:text-purple-800 ml-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>

                            {issue.labels.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {issue.labels.slice(0, 3).map((label) => (
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
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a repository to view its issues</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
