"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletService, type Wallet } from "@/lib/wallet"
import { useAuth } from "@/lib/auth"
import { WalletIcon, Plus, Send, RefreshCw } from "lucide-react"

export function WalletDemo() {
  const { user } = useAuth()
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(true)
  const [addAmount, setAddAmount] = useState("")
  const [addingFunds, setAddingFunds] = useState(false)

  useEffect(() => {
    if (user) {
      loadWallet()
    }
  }, [user])

  const loadWallet = async () => {
    if (!user) return

    try {
      let userWallet = await WalletService.getUserWallet(user.id)

      // If no wallet exists, create one
      if (!userWallet) {
        userWallet = await WalletService.createWallet(user.id)
      }

      setWallet(userWallet)
    } catch (error) {
      console.error("Error loading wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFunds = async () => {
    if (!user || !addAmount) return

    setAddingFunds(true)
    try {
      await WalletService.addFunds(user.id, Number.parseFloat(addAmount))
      setAddAmount("")
      await loadWallet() // Refresh wallet data
    } catch (error) {
      console.error("Error adding funds:", error)
      alert("Failed to add funds. Please try again.")
    } finally {
      setAddingFunds(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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

  if (!wallet) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No wallet found</p>
            <Button onClick={loadWallet} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <WalletIcon className="w-5 h-5 mr-2" />
          Demo Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Address</span>
            <span className="font-mono text-sm">{formatAddress(wallet.address)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Balance</span>
            <span className="text-2xl font-bold text-green-600">${wallet.balance.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="add-amount">Add Demo Funds</Label>
          <div className="flex gap-2">
            <Input
              id="add-amount"
              type="number"
              placeholder="Amount (USD)"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              min="1"
              max="1000"
            />
            <Button
              onClick={handleAddFunds}
              disabled={!addAmount || addingFunds}
              className="bg-green-600 hover:bg-green-700"
            >
              {addingFunds ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            This is a demo wallet. In production, you would connect a real crypto wallet.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" onClick={loadWallet}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
