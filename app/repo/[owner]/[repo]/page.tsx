"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { RepoViewer } from "@/components/github/repo-viewer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import { WalletService } from "@/lib/wallet"
import { supabase } from "@/lib/supabase"
import { Heart, DollarSign } from "lucide-react"

export default function RepoPage() {
  const params = useParams()
  const { user } = useAuth()
  const owner = params.owner as string
  const repo = params.repo as string

  const [donationModal, setDonationModal] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")
  const [donationMessage, setDonationMessage] = useState("")
  const [donating, setDonating] = useState(false)

  const handleDonate = async () => {
    if (!user || !donationAmount) return

    setDonating(true)
    try {
      const amount = Number.parseFloat(donationAmount)
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount")
        return
      }

      const repoFullName = `${owner}/${repo}`

      // Get or create repo wallet
      let repoWallet = await getRepoWallet(repoFullName)
      if (!repoWallet) {
        repoWallet = await createRepoWallet(repoFullName, owner)
      }

      // Process donation
      await WalletService.processPayment(user.id, repoWallet.user_id, amount, "donation", {
        repo_name: repoFullName,
        message: donationMessage,
      })

      alert(`Successfully donated $${amount} to ${repoFullName}!`)
      setDonationModal(false)
      setDonationAmount("")
      setDonationMessage("")
    } catch (error) {
      console.error("Error processing donation:", error)
      alert("Failed to process donation. Please try again.")
    } finally {
      setDonating(false)
    }
  }

  const getRepoWallet = async (repoFullName: string) => {
    const { data } = await supabase.from("repo_wallets").select("*").eq("repo_full_name", repoFullName).single()

    return data
  }

  const createRepoWallet = async (repoFullName: string, ownerLogin: string) => {
    const { data, error } = await supabase
      .from("repo_wallets")
      .insert({
        repo_full_name: repoFullName,
        owner_login: ownerLogin,
        wallet_address: `repo_${repoFullName.replace("/", "_")}_${Date.now()}`,
        balance: 0,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Repository Header with Donate Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {owner}/{repo}
            </h1>
            <p className="text-muted-foreground">Repository Details</p>
          </div>

          {user && (
            <Button onClick={() => setDonationModal(true)} className="bg-red-500 hover:bg-red-600">
              <Heart className="w-4 h-4 mr-2" />
              Donate to Repository
            </Button>
          )}
        </div>

        {/* Repository Viewer */}
        <RepoViewer owner={owner} repo={repo} />

        {/* Donation Modal */}
        <Dialog open={donationModal} onOpenChange={setDonationModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Donate to {owner}/{repo}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="10.00"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  placeholder="Thank you for your amazing work!"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDonationModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDonate} disabled={donating || !donationAmount}>
                  {donating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Donating...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Donate ${donationAmount}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
