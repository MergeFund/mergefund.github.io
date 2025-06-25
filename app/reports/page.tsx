"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/lib/auth"
import { BarChart, LineChart, TrendingUp, Download, Share, Calendar, DollarSign, Users, Trophy } from "lucide-react"

// Force dynamic rendering to prevent SSG issues with auth
export const dynamic = 'force-dynamic'

interface Report {
  id: string
  title: string
  summary: string
  created_date: string
  metrics: {
    totalEarnings: number
    bountiesCompleted: number
    averageReward: number
    successRate: number
  }
}

export default function ReportsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    if (user) {
      loadReports()
    }
  }, [user, selectedPeriod])

  const loadReports = async () => {
    // Mock data - in real app, this would come from Supabase
    const mockReports: Report[] = [
      {
        id: "1",
        title: "Monthly Performance Report - June 2024",
        summary: "Comprehensive analysis of your contributions and earnings for June 2024",
        created_date: "2024-06-30",
        metrics: {
          totalEarnings: 1250,
          bountiesCompleted: 8,
          averageReward: 156,
          successRate: 89,
        },
      },
      {
        id: "2",
        title: "Quarterly Review - Q2 2024",
        summary: "Three-month performance overview with trend analysis and recommendations",
        created_date: "2024-06-30",
        metrics: {
          totalEarnings: 3420,
          bountiesCompleted: 22,
          averageReward: 155,
          successRate: 91,
        },
      },
      {
        id: "3",
        title: "Technology Stack Analysis",
        summary: "Breakdown of your contributions by programming language and framework",
        created_date: "2024-06-25",
        metrics: {
          totalEarnings: 2847,
          bountiesCompleted: 18,
          averageReward: 158,
          successRate: 85,
        },
      },
    ]

    setReports(mockReports)
  }

  const openReportModal = (report: Report) => {
    setSelectedReport(report)
  }

  const closeReportModal = () => {
    setSelectedReport(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <div className="ml-64 pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Reports</h1>
              <p className="text-gray-600">Analyze your contribution patterns and earnings over time</p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-purple-700 hover:bg-purple-800">Generate Report</Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-purple-700">$2,847</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bounties Completed</p>
                    <p className="text-2xl font-bold text-green-600">23</p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-600">87%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Reward</p>
                    <p className="text-2xl font-bold text-orange-600">$156</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{report.summary}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(report.created_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-700">${report.metrics.totalEarnings}</p>
                      <p className="text-xs text-gray-600">Earnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{report.metrics.bountiesCompleted}</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">${report.metrics.averageReward}</p>
                      <p className="text-xs text-gray-600">Avg. Reward</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">{report.metrics.successRate}%</p>
                      <p className="text-xs text-gray-600">Success Rate</p>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline" onClick={() => openReportModal(report)}>
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Report Modal */}
          {selectedReport && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" onClick={closeReportModal}>
                        ✕
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Report Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-700">${selectedReport.metrics.totalEarnings}</p>
                        <p className="text-sm text-gray-600">Total Earnings</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{selectedReport.metrics.bountiesCompleted}</p>
                        <p className="text-sm text-gray-600">Bounties Completed</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">${selectedReport.metrics.averageReward}</p>
                        <p className="text-sm text-gray-600">Average Reward</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{selectedReport.metrics.successRate}%</p>
                        <p className="text-sm text-gray-600">Success Rate</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Placeholder */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart className="w-5 h-5 mr-2" />
                          Earnings by Technology
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                            <p className="text-purple-700 font-medium">Interactive bar chart</p>
                            <p className="text-sm text-purple-600 mt-2">Powered by Plotly.js</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <LineChart className="w-5 h-5 mr-2" />
                          Performance Trend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <LineChart className="w-12 h-12 text-blue-700 mx-auto mb-4" />
                            <p className="text-blue-700 font-medium">Interactive line chart</p>
                            <p className="text-sm text-blue-600 mt-2">Powered by Plotly.js</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contributor Breakdown */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Top Contributing Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-blue-100 text-blue-800">React</Badge>
                            <span className="text-sm">Frontend Development</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold">$850</span>
                            <span className="text-sm text-gray-500 ml-2">(6 bounties)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-green-100 text-green-800">Node.js</Badge>
                            <span className="text-sm">Backend Development</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold">$650</span>
                            <span className="text-sm text-gray-500 ml-2">(4 bounties)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-purple-100 text-purple-800">Bug Fix</Badge>
                            <span className="text-sm">Issue Resolution</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold">$480</span>
                            <span className="text-sm text-gray-500 ml-2">(3 bounties)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
