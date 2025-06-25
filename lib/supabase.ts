import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          github_username: string | null
          twitter_username: string | null
          linkedin_username: string | null
          total_earnings: number
          bounties_completed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          github_username?: string | null
          twitter_username?: string | null
          linkedin_username?: string | null
          total_earnings?: number
          bounties_completed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          github_username?: string | null
          twitter_username?: string | null
          linkedin_username?: string | null
          total_earnings?: number
          bounties_completed?: number
          created_at?: string
          updated_at?: string
        }
      }
      waitlist: {
        Row: {
          id: number
          name: string
          email: string
          role: string
          github_profile: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          role: string
          github_profile?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          role?: string
          github_profile?: string | null
          created_at?: string
        }
      }
      bounties: {
        Row: {
          id: string
          title: string
          description: string
          reward_amount: number
          difficulty: "Easy" | "Medium" | "Hard"
          status: "Open" | "Claimed" | "In Progress" | "Under Review" | "Completed" | "Cancelled"
          repository_url: string
          issue_url: string | null
          tags: string[]
          deadline: string
          created_by: string
          claimed_by: string | null
          completed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          reward_amount: number
          difficulty: "Easy" | "Medium" | "Hard"
          status?: "Open" | "Claimed" | "In Progress" | "Under Review" | "Completed" | "Cancelled"
          repository_url: string
          issue_url?: string | null
          tags: string[]
          deadline: string
          created_by: string
          claimed_by?: string | null
          completed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          reward_amount?: number
          difficulty?: "Easy" | "Medium" | "Hard"
          status?: "Open" | "Claimed" | "In Progress" | "Under Review" | "Completed" | "Cancelled"
          repository_url?: string
          issue_url?: string | null
          tags?: string[]
          deadline?: string
          created_by?: string
          claimed_by?: string | null
          completed_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contributions: {
        Row: {
          id: string
          bounty_id: string
          contributor_id: string
          submission_url: string
          description: string
          status: "Submitted" | "Under Review" | "Approved" | "Rejected"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bounty_id: string
          contributor_id: string
          submission_url: string
          description: string
          status?: "Submitted" | "Under Review" | "Approved" | "Rejected"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bounty_id?: string
          contributor_id?: string
          submission_url?: string
          description?: string
          status?: "Submitted" | "Under Review" | "Approved" | "Rejected"
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: "bounty" | "payment" | "system" | "mention"
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: "bounty" | "payment" | "system" | "mention"
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: "bounty" | "payment" | "system" | "mention"
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}
