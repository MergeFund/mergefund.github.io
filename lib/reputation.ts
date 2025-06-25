import { supabase } from "./supabase"
import { GitHubAPI } from "./github"

export interface ReputationScore {
  user_id: string
  total_score: number
  github_score: number
  bounty_score: number
  community_score: number
  rank: number
  badges: string[]
  last_updated: string
}

export interface ReputationActivity {
  id: string
  user_id: string
  activity_type: "bounty_completed" | "repo_starred" | "issue_created" | "pr_merged" | "donation_received"
  points_earned: number
  description: string
  metadata?: any
  created_at: string
}

export class ReputationService {
  private static readonly SCORING_WEIGHTS = {
    BOUNTY_COMPLETED: 50,
    REPO_STAR: 2,
    ISSUE_CREATED: 5,
    PR_MERGED: 25,
    DONATION_RECEIVED: 10,
    FOLLOWER: 1,
    PUBLIC_REPO: 3,
  }

  // Calculate GitHub-based reputation score
  static async calculateGitHubScore(githubUsername: string): Promise<number> {
    try {
      const github = new GitHubAPI()
      const user = await github.getUser(githubUsername)
      const repos = await github.getUserRepos(githubUsername)

      let score = 0

      // Points for followers
      score += user.followers * this.SCORING_WEIGHTS.FOLLOWER

      // Points for public repos
      score += user.public_repos * this.SCORING_WEIGHTS.PUBLIC_REPO

      // Points for repo stars
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
      score += totalStars * this.SCORING_WEIGHTS.REPO_STAR

      return Math.min(score, 1000) // Cap at 1000 points
    } catch (error) {
      console.error("Error calculating GitHub score:", error)
      return 0
    }
  }

  // Calculate bounty-based reputation score
  static async calculateBountyScore(userId: string): Promise<number> {
    const { data: completedBounties } = await supabase
      .from("bounties")
      .select("reward_amount")
      .eq("completed_by", userId)
      .eq("status", "Completed")

    if (!completedBounties) return 0

    const totalEarnings = completedBounties.reduce((sum, bounty) => sum + bounty.reward_amount, 0)
    const completedCount = completedBounties.length

    return completedCount * this.SCORING_WEIGHTS.BOUNTY_COMPLETED + totalEarnings * 0.1
  }

  // Update user's reputation score
  static async updateReputationScore(userId: string): Promise<ReputationScore> {
    const { data: profile } = await supabase.from("profiles").select("github_username").eq("id", userId).single()

    let githubScore = 0
    if (profile?.github_username) {
      githubScore = await this.calculateGitHubScore(profile.github_username)
    }

    const bountyScore = await this.calculateBountyScore(userId)
    const communityScore = 0 // TODO: Implement community scoring

    const totalScore = githubScore + bountyScore + communityScore

    // Determine badges based on score and activities
    const badges = this.calculateBadges(totalScore, githubScore, bountyScore)

    const reputationData = {
      user_id: userId,
      total_score: totalScore,
      github_score: githubScore,
      bounty_score: bountyScore,
      community_score: communityScore,
      badges,
      last_updated: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("reputation_scores").upsert(reputationData).select().single()

    if (error) throw error

    // Calculate rank
    const { data: rankData } = await supabase.from("reputation_scores").select("user_id").gt("total_score", totalScore)

    const rank = (rankData?.length || 0) + 1

    return { ...data, rank }
  }

  // Record reputation activity
  static async recordActivity(
    userId: string,
    activityType: ReputationActivity["activity_type"],
    description: string,
    metadata?: any,
  ): Promise<void> {
    const pointsEarned = this.getPointsForActivity(activityType, metadata)

    await supabase.from("reputation_activities").insert({
      user_id: userId,
      activity_type: activityType,
      points_earned: pointsEarned,
      description,
      metadata,
    })

    // Update reputation score
    await this.updateReputationScore(userId)
  }

  // Get leaderboard
  static async getLeaderboard(limit = 50): Promise<ReputationScore[]> {
    const { data, error } = await supabase
      .from("reputation_scores")
      .select(`
        *,
        profiles!inner(username, full_name, avatar_url, github_username)
      `)
      .order("total_score", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Get user's reputation activities
  static async getUserActivities(userId: string, limit = 20): Promise<ReputationActivity[]> {
    const { data, error } = await supabase
      .from("reputation_activities")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  private static getPointsForActivity(activityType: ReputationActivity["activity_type"], metadata?: any): number {
    switch (activityType) {
      case "bounty_completed":
        return this.SCORING_WEIGHTS.BOUNTY_COMPLETED + (metadata?.reward_amount * 0.1 || 0)
      case "repo_starred":
        return this.SCORING_WEIGHTS.REPO_STAR
      case "issue_created":
        return this.SCORING_WEIGHTS.ISSUE_CREATED
      case "pr_merged":
        return this.SCORING_WEIGHTS.PR_MERGED
      case "donation_received":
        return this.SCORING_WEIGHTS.DONATION_RECEIVED + (metadata?.amount * 0.05 || 0)
      default:
        return 0
    }
  }

  private static calculateBadges(totalScore: number, githubScore: number, bountyScore: number): string[] {
    const badges: string[] = []

    // Score-based badges
    if (totalScore >= 1000) badges.push("Elite Contributor")
    else if (totalScore >= 500) badges.push("Senior Developer")
    else if (totalScore >= 200) badges.push("Active Contributor")
    else if (totalScore >= 50) badges.push("Rising Star")

    // GitHub-specific badges
    if (githubScore >= 300) badges.push("GitHub Master")
    else if (githubScore >= 100) badges.push("Open Source Advocate")

    // Bounty-specific badges
    if (bountyScore >= 500) badges.push("Bounty Hunter")
    else if (bountyScore >= 200) badges.push("Problem Solver")

    return badges
  }
}
