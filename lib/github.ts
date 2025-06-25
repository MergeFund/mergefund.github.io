const GITHUB_API_BASE = "https://api.github.com"

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
  created_at: string
  open_issues_count: number
  size: number
  default_branch: string
  owner: {
    login: string
    avatar_url: string
    type: string
  }
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  html_url: string
  state: "open" | "closed"
  labels: Array<{
    name: string
    color: string
  }>
  created_at: string
  updated_at: string
  closed_at: string | null
  user: {
    login: string
    avatar_url: string
  }
  assignees: Array<{
    login: string
    avatar_url: string
  }>
  comments: number
}

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  body: string
  html_url: string
  state: "open" | "closed" | "merged"
  created_at: string
  updated_at: string
  merged_at: string | null
  user: {
    login: string
    avatar_url: string
  }
  head: {
    ref: string
    sha: string
  }
  base: {
    ref: string
    sha: string
  }
}

export interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  location: string
  company: string
  blog: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
  }
  author: {
    login: string
    avatar_url: string
  } | null
  html_url: string
}

export class GitHubAPI {
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private async request(endpoint: string) {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    }

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.request(`/users/${username}`)
  }

  async getUserRepos(username: string, page = 1, per_page = 30): Promise<GitHubRepo[]> {
    return this.request(`/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`)
  }

  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    return this.request(`/repos/${owner}/${repo}`)
  }

  async getRepoIssues(owner: string, repo: string, state: "open" | "closed" | "all" = "open"): Promise<GitHubIssue[]> {
    return this.request(`/repos/${owner}/${repo}/issues?state=${state}&per_page=50`)
  }

  async getRepoPullRequests(
    owner: string,
    repo: string,
    state: "open" | "closed" | "all" = "open",
  ): Promise<GitHubPullRequest[]> {
    return this.request(`/repos/${owner}/${repo}/pulls?state=${state}&per_page=50`)
  }

  async getRepoCommits(owner: string, repo: string, page = 1): Promise<GitHubCommit[]> {
    return this.request(`/repos/${owner}/${repo}/commits?page=${page}&per_page=30`)
  }

  async getRepoContents(owner: string, repo: string, path = ""): Promise<any[]> {
    return this.request(`/repos/${owner}/${repo}/contents/${path}`)
  }

  async getRepoReadme(owner: string, repo: string): Promise<any> {
    try {
      return await this.request(`/repos/${owner}/${repo}/readme`)
    } catch {
      return null
    }
  }

  async getTrendingRepos(language?: string, since: "daily" | "weekly" | "monthly" = "weekly"): Promise<GitHubRepo[]> {
    const languageQuery = language ? `+language:${language}` : ""
    const dateQuery = this.getDateQuery(since)

    const response = await this.request(
      `/search/repositories?q=created:>${dateQuery}${languageQuery}&sort=stars&order=desc&per_page=50`,
    )

    return response.items
  }

  async getMostStarredRepos(language?: string, limit = 50): Promise<GitHubRepo[]> {
    const languageQuery = language ? `+language:${language}` : ""

    const response = await this.request(
      `/search/repositories?q=stars:>1${languageQuery}&sort=stars&order=desc&per_page=${limit}`,
    )

    return response.items
  }

  async searchRepositories(query: string, sort = "stars", order = "desc"): Promise<GitHubRepo[]> {
    const response = await this.request(
      `/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=50`,
    )

    return response.items
  }

  async getUserContributions(username: string): Promise<any> {
    // This would typically require scraping GitHub's contribution graph
    // For now, we'll return mock data
    return {
      totalContributions: 1247,
      weeks: [], // Contribution data by week
    }
  }

  private getDateQuery(since: "daily" | "weekly" | "monthly"): string {
    const now = new Date()
    const days = since === "daily" ? 1 : since === "weekly" ? 7 : 30
    const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    return date.toISOString().split("T")[0]
  }
}

export const githubAPI = new GitHubAPI()
