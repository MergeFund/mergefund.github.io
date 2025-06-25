"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReputationService, type ReputationActivity } from "@/lib/reputation"
import { Trophy, Star, Code, GitPullRequest, AlertCircle, Gift, TrendingUp, Calendar } from "lucide-react"

interface ReputationHistoryProps {
  userId: string
}

export function ReputationHistory({ userId }: ReputationHistoryProps) {
  const [activities, setActivities] = useState<ReputationActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivities()
  }, [userId])

  const loadActivities = async () => {
    try {
      const userActivities = await ReputationService.getUserActivities(userId)
      setActivities(userActivities)
    } catch (error) {
      console.error("Error loading reputation activities:", error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (activityType: ReputationActivity["activity_type"]) => {
    switch (activityType) {
      case "bounty_completed":
        return <Trophy className="w-5 h-5 text-purple-600" />
      case "repo_starred":
        return <Star className="w-5 h-5 text-yellow-600" />
      case "issue_created":
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      case "pr_merged":
        return <GitPullRequest className="w-5 h-5 text-green-600" />
      case "donation_received":
        return <Gift className="w-5 h-5 text-pink-600" />
      default:
        return <Code className="w-5 h-5 text-gray-600" />
    }
  }

  const getActivityColor = (activityType: ReputationActivity["activity_type"]) => {
    switch (activityType) {
      case "bounty_completed":
        return "bg-purple-100 text-purple-800"
      case "repo_starred":
        return "bg-yellow-100 text-yellow-800"
      case "issue_created":
        return "bg-blue-100 text-blue-800"
      case "pr_merged":
        return "bg-green-100 text-green-800"
      case "donation_received":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatActivityType = (activityType: ReputationActivity["activity_type"]) => {
    return activityType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return date.toLocaleDateString()
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
          <TrendingUp className="w-5 h-5 mr-2" />
          Reputation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reputation activities yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Complete bounties and contribute to repositories to build your reputation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.activity_type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getActivityColor(activity.activity_type)}>
                      {formatActivityType(activity.activity_type)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(activity.created_at)}
                    </div>
                  </div>

                  <p className="text-gray-900 mb-2">{activity.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {activity.metadata && (
                        <span>
                          {activity.metadata.repository && `Repository: ${activity.metadata.repository}`}
                          {activity.metadata.reward_amount && ` • Reward: $${activity.metadata.reward_amount}`}
                          {activity.metadata.amount && ` • Amount: $${activity.metadata.amount}`}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-green-600">+{activity.points_earned} points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
