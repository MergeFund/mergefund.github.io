"use client"

import { supabase } from "./supabase"

export interface Wallet {
  id: string
  user_id: string
  address: string
  private_key_encrypted: string
  balance: number
  created_at: string
}

export interface Transaction {
  id: string
  from_wallet: string
  to_wallet: string
  amount: number
  type: "bounty_payment" | "donation" | "withdrawal" | "deposit"
  status: "pending" | "completed" | "failed"
  transaction_hash?: string
  metadata?: any
  created_at: string
}

export class WalletService {
  // Generate a new wallet address (simplified - in production use proper crypto libraries)
  static generateWallet(): { address: string; privateKey: string } {
    // This is a simplified implementation
    // In production, use proper crypto libraries like ethers.js or web3.js
    const address = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
    const privateKey = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return { address, privateKey }
  }

  // Create wallet for new user
  static async createWallet(userId: string): Promise<Wallet> {
    const { address, privateKey } = this.generateWallet()

    // In production, encrypt the private key properly
    const encryptedPrivateKey = btoa(privateKey) // Simple base64 encoding - use proper encryption

    const { data, error } = await supabase
      .from("wallets")
      .insert({
        user_id: userId,
        address,
        private_key_encrypted: encryptedPrivateKey,
        balance: 100, // Give new users $100 starting balance for demo
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Get user's wallet
  static async getUserWallet(userId: string): Promise<Wallet | null> {
    const { data, error } = await supabase.from("wallets").select("*").eq("user_id", userId).single()

    if (error) return null
    return data
  }

  // Process payment (simplified for demo)
  static async processPayment(
    fromUserId: string,
    toUserId: string,
    amount: number,
    type: Transaction["type"],
    metadata?: any,
  ): Promise<Transaction> {
    const fromWallet = await this.getUserWallet(fromUserId)
    const toWallet = await this.getUserWallet(toUserId)

    if (!fromWallet || !toWallet) {
      throw new Error("Wallet not found")
    }

    if (fromWallet.balance < amount) {
      throw new Error("Insufficient balance")
    }

    // Create transaction record
    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert({
        from_wallet: fromWallet.address,
        to_wallet: toWallet.address,
        amount,
        type,
        status: "pending",
        metadata,
      })
      .select()
      .single()

    if (txError) throw txError

    try {
      // Update wallet balances
      await supabase
        .from("wallets")
        .update({ balance: fromWallet.balance - amount })
        .eq("id", fromWallet.id)

      await supabase
        .from("wallets")
        .update({ balance: toWallet.balance + amount })
        .eq("id", toWallet.id)

      // Generate mock transaction hash
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

      // Update transaction status
      const { data: updatedTransaction } = await supabase
        .from("transactions")
        .update({
          status: "completed",
          transaction_hash: transactionHash,
        })
        .eq("id", transaction.id)
        .select()
        .single()

      return updatedTransaction || { ...transaction, status: "completed", transaction_hash: transactionHash }
    } catch (error) {
      // Rollback transaction on failure
      await supabase.from("transactions").update({ status: "failed" }).eq("id", transaction.id)
      throw error
    }
  }

  // Get transaction history
  static async getTransactionHistory(userId: string): Promise<Transaction[]> {
    const wallet = await this.getUserWallet(userId)
    if (!wallet) return []

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`from_wallet.eq.${wallet.address},to_wallet.eq.${wallet.address}`)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  // Add funds to wallet (for demo purposes)
  static async addFunds(userId: string, amount: number): Promise<void> {
    const wallet = await this.getUserWallet(userId)
    if (!wallet) throw new Error("Wallet not found")

    await supabase
      .from("wallets")
      .update({ balance: wallet.balance + amount })
      .eq("id", wallet.id)

    // Record as deposit transaction
    await supabase.from("transactions").insert({
      from_wallet: "0x0000000000000000000000000000000000000000", // System address
      to_wallet: wallet.address,
      amount,
      type: "deposit",
      status: "completed",
      transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      metadata: { source: "demo_funding" },
    })
  }
}
