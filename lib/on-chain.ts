import { supabase } from "./supabase"

export interface OnChainActivity {
  id: string
  user_id: string
  activity_type: string
  description: string
  transaction_hash?: string
  block_number?: number
  metadata?: any
  created_at: string
}

export class OnChainService {
  // Log an on-chain activity
  static async logActivity(
    userId: string,
    activityType: string,
    description: string,
    transactionHash?: string,
    metadata?: any,
  ): Promise<OnChainActivity> {
    const { data, error } = await supabase
      .from("on_chain_activities")
      .insert({
        user_id: userId,
        activity_type: activityType,
        description,
        transaction_hash: transactionHash,
        metadata,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get user's on-chain activity history
  static async getUserActivities(userId: string, limit = 50): Promise<OnChainActivity[]> {
    const { data, error } = await supabase
      .from("on_chain_activities")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Get all on-chain activities (public feed)
  static async getAllActivities(limit = 100): Promise<OnChainActivity[]> {
    const { data, error } = await supabase
      .from("on_chain_activities")
      .select(`
        *,
        profiles!inner(username, full_name, avatar_url)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Log bounty completion on-chain
  static async logBountyCompletion(
    userId: string,
    bountyId: string,
    amount: number,
    transactionHash: string,
  ): Promise<void> {
    await this.logActivity(userId, "bounty_completed", `Completed bounty and received $${amount}`, transactionHash, {
      bounty_id: bountyId,
      amount,
    })
  }

  // Log donation on-chain
  static async logDonation(
    fromUserId: string,
    toUserId: string,
    amount: number,
    transactionHash: string,
    message?: string,
  ): Promise<void> {
    await this.logActivity(fromUserId, "donation_sent", `Donated $${amount} to developer`, transactionHash, {
      to_user_id: toUserId,
      amount,
      message,
    })

    await this.logActivity(toUserId, "donation_received", `Received $${amount} donation`, transactionHash, {
      from_user_id: fromUserId,
      amount,
      message,
    })
  }

  // Log profile update on-chain
  static async logProfileUpdate(userId: string, changes: string[], transactionHash: string): Promise<void> {
    await this.logActivity(userId, "profile_updated", `Updated profile: ${changes.join(", ")}`, transactionHash, {
      changes,
    })
  }

  // Log repository connection on-chain
  static async logRepositoryConnection(userId: string, repoName: string, transactionHash: string): Promise<void> {
    await this.logActivity(userId, "repository_connected", `Connected repository: ${repoName}`, transactionHash, {
      repository: repoName,
    })
  }
}
