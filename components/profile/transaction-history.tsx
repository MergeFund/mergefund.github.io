"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WalletService, type Transaction } from "@/lib/wallet"
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface TransactionHistoryProps {
  userId: string
  userWalletAddress?: string
}

export function TransactionHistory({ userId, userWalletAddress }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
  }, [userId])

  const loadTransactions = async () => {
    try {
      const history = await WalletService.getTransactionHistory(userId)
      setTransactions(history)
    } catch (error) {
      console.error("Error loading transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTransactionIcon = (transaction: Transaction) => {
    const isIncoming = transaction.to_wallet === userWalletAddress

    if (isIncoming) {
      return <ArrowDownLeft className="w-5 h-5 text-green-600" />
    } else {
      return <ArrowUpRight className="w-5 h-5 text-red-600" />
    }
  }

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "bounty_payment":
        return "bg-purple-100 text-purple-800"
      case "donation":
        return "bg-pink-100 text-pink-800"
      case "withdrawal":
        return "bg-blue-100 text-blue-800"
      case "deposit":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTransactionType = (type: Transaction["type"]) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
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
          <Wallet className="w-5 h-5 mr-2" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-sm text-gray-400 mt-2">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const isIncoming = transaction.to_wallet === userWalletAddress

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{getTransactionIcon(transaction)}</div>

                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getTypeColor(transaction.type)}>
                          {formatTransactionType(transaction.type)}
                        </Badge>
                        <Badge className={getStatusColor(transaction.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">{transaction.status}</span>
                          </div>
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          {isIncoming ? "From" : "To"}:{" "}
                          {formatAddress(isIncoming ? transaction.from_wallet : transaction.to_wallet)}
                        </p>
                        <p>{formatDate(transaction.created_at)}</p>
                      </div>

                      {transaction.metadata && (
                        <div className="text-xs text-gray-500 mt-1">
                          {transaction.metadata.bounty_title && `Bounty: ${transaction.metadata.bounty_title}`}
                          {transaction.metadata.repository && `Repository: ${transaction.metadata.repository}`}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-lg font-semibold ${isIncoming ? "text-green-600" : "text-red-600"}`}>
                      {isIncoming ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>

                    {transaction.transaction_hash && (
                      <a
                        href={`https://etherscan.io/tx/${transaction.transaction_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-700 hover:text-purple-800 flex items-center justify-end mt-1"
                      >
                        View on chain
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
