"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Download,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Filter,
  ChevronDown,
  CheckCircle,
  TrendingDown,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample earnings data
const SAMPLE_EARNINGS = [
  {
    id: "1",
    jobTitle: "Home Cleaning",
    client: "John Smith",
    date: "March 15, 2025",
    amount: 120,
    status: "paid",
    category: "Cleaning",
  },
  {
    id: "2",
    jobTitle: "Garden Landscaping",
    client: "Sarah Johnson",
    date: "February 28, 2025",
    amount: 350,
    status: "paid",
    category: "Gardening",
  },
  {
    id: "3",
    jobTitle: "Office Maintenance",
    client: "Acme Corp",
    date: "January 10, 2025",
    amount: 200,
    status: "paid",
    category: "Maintenance",
  },
  {
    id: "4",
    jobTitle: "Plumbing Repair",
    client: "Michael Brown",
    date: "December 5, 2024",
    amount: 180,
    status: "paid",
    category: "Plumbing",
  },
  {
    id: "5",
    jobTitle: "Electrical Installation",
    client: "Tech Solutions Inc",
    date: "November 20, 2024",
    amount: 250,
    status: "paid",
    category: "Electrical",
  },
  {
    id: "6",
    jobTitle: "Apartment Cleaning",
    client: "Emily Wilson",
    date: "October 15, 2024",
    amount: 150,
    status: "paid",
    category: "Cleaning",
  },
  {
    id: "7",
    jobTitle: "Furniture Assembly",
    client: "David Lee",
    date: "September 28, 2024",
    amount: 120,
    status: "paid",
    category: "Carpentry",
  },
  {
    id: "8",
    jobTitle: "Window Cleaning",
    client: "Corporate Towers",
    date: "August 10, 2024",
    amount: 300,
    status: "paid",
    category: "Cleaning",
  },
]

// Sample monthly earnings data for chart
const MONTHLY_EARNINGS = [
  { month: "Jan", amount: 850 },
  { month: "Feb", amount: 1200 },
  { month: "Mar", amount: 950 },
  { month: "Apr", amount: 1400 },
  { month: "May", amount: 1100 },
  { month: "Jun", amount: 1300 },
  { month: "Jul", amount: 1500 },
  { month: "Aug", amount: 1700 },
  { month: "Sep", amount: 1400 },
  { month: "Oct", amount: 1200 },
  { month: "Nov", amount: 1600 },
  { month: "Dec", amount: 1800 },
]

// Sample category earnings data for pie chart
const CATEGORY_EARNINGS = [
  { category: "Cleaning", amount: 570, percentage: 34 },
  { category: "Gardening", amount: 350, percentage: 21 },
  { category: "Maintenance", amount: 200, percentage: 12 },
  { category: "Plumbing", amount: 180, percentage: 11 },
  { category: "Electrical", amount: 250, percentage: 15 },
  { category: "Carpentry", amount: 120, percentage: 7 },
]

export default function EarningsPage() {
  const { user, userData } = useAuth()
  const router = useRouter()
  const [timeframe, setTimeframe] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  // Calculate total earnings
  const totalEarnings = SAMPLE_EARNINGS.reduce((acc, earning) => acc + earning.amount, 0)

  // Calculate average job value
  const averageJobValue = totalEarnings / SAMPLE_EARNINGS.length

  // Calculate highest earning job
  const highestEarningJob = SAMPLE_EARNINGS.reduce(
    (max, job) => (job.amount > max.amount ? job : max),
    SAMPLE_EARNINGS[0],
  )

  // Filter and sort earnings
  const filteredEarnings = [...SAMPLE_EARNINGS].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    }
    return 0
  })

  // Get current month earnings
  const currentMonthEarnings = MONTHLY_EARNINGS[new Date().getMonth()].amount

  // Get previous month earnings
  const previousMonthEarnings = MONTHLY_EARNINGS[(new Date().getMonth() + 11) % 12].amount

  // Calculate month-over-month change
  const monthOverMonthChange = ((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100

  return (
    <ProtectedRoute requiredUserType="professional">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/professional/dashboard")}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold text-[#333333]">Earnings</h1>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar />

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Earnings Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Total Earnings</span>
                      <span className="font-bold text-[#333333]">${totalEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Jobs Completed</span>
                      <span className="font-bold text-[#333333]">{SAMPLE_EARNINGS.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Average Job Value</span>
                      <span className="font-bold text-[#333333]">${averageJobValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Highest Earning Job</span>
                      <span className="font-bold text-[#333333]">${highestEarningJob.amount.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main content */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <DollarSign className="h-8 w-8 text-[#00A6A6] mb-2" />
                        <h3 className="text-lg font-medium text-[#333333]">Current Month</h3>
                        <p className="text-3xl font-bold mt-1">${currentMonthEarnings}</p>
                        <div
                          className={`flex items-center mt-2 ${monthOverMonthChange >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {monthOverMonthChange >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span>{Math.abs(monthOverMonthChange).toFixed(1)}% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <BarChart3 className="h-8 w-8 text-[#00A6A6] mb-2" />
                        <h3 className="text-lg font-medium text-[#333333]">Year to Date</h3>
                        <p className="text-3xl font-bold mt-1">
                          $
                          {MONTHLY_EARNINGS.slice(0, new Date().getMonth() + 1).reduce(
                            (acc, month) => acc + month.amount,
                            0,
                          )}
                        </p>
                        <div className="text-[#666666] mt-2">
                          <span>
                            {new Date().getMonth() + 1} months in {new Date().getFullYear()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <PieChart className="h-8 w-8 text-[#00A6A6] mb-2" />
                        <h3 className="text-lg font-medium text-[#333333]">Top Category</h3>
                        <p className="text-3xl font-bold mt-1">{CATEGORY_EARNINGS[0].category}</p>
                        <div className="text-[#666666] mt-2">
                          <span>
                            ${CATEGORY_EARNINGS[0].amount} ({CATEGORY_EARNINGS[0].percentage}% of total)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="transactions" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="transactions">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Earnings History</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" /> Sort
                                <ChevronDown className="h-4 w-4 ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSortBy("date")
                                  setSortOrder("desc")
                                }}
                              >
                                Newest First
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSortBy("date")
                                  setSortOrder("asc")
                                }}
                              >
                                Oldest First
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSortBy("amount")
                                  setSortOrder("desc")
                                }}
                              >
                                Highest Amount
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSortBy("amount")
                                  setSortOrder("asc")
                                }}
                              >
                                Lowest Amount
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {filteredEarnings.map((earning) => (
                            <div
                              key={earning.id}
                              className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-[#333333]">{earning.jobTitle}</h4>
                                  <p className="text-sm text-[#666666]">Client: {earning.client}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-[#333333]">${earning.amount.toFixed(2)}</div>
                                  <div className="text-sm text-[#666666]">{earning.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Badge className="bg-[#00A6A6]/10 text-[#00A6A6] hover:bg-[#00A6A6]/20">
                                  {earning.category}
                                </Badge>
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  <span className="text-xs font-medium">Paid</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="charts">
                    <div className="grid grid-cols-1 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Monthly Earnings</CardTitle>
                          <CardDescription>Your earnings over the past 12 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] w-full">
                            {/* Bar chart visualization */}
                            <div className="flex h-64 items-end gap-2">
                              {MONTHLY_EARNINGS.map((month, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                  <div
                                    className="w-full bg-[#00A6A6] rounded-t-md"
                                    style={{
                                      height: `${(month.amount / Math.max(...MONTHLY_EARNINGS.map((m) => m.amount))) * 100}%`,
                                      opacity: index === new Date().getMonth() ? 1 : 0.7,
                                    }}
                                  />
                                  <div className="text-xs mt-2 text-[#666666]">{month.month}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Earnings by Category</CardTitle>
                          <CardDescription>Breakdown of your earnings by job category</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center justify-center">
                              {/* Pie chart visualization */}
                              <div className="relative h-48 w-48">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-sm text-[#666666]">Total</div>
                                    <div className="text-2xl font-bold">${totalEarnings}</div>
                                  </div>
                                </div>
                                {/* This would be a real pie chart in a production app */}
                                <div className="h-full w-full rounded-full border-8 border-[#00A6A6]" />
                              </div>
                            </div>
                            <div className="space-y-4">
                              {CATEGORY_EARNINGS.map((category, index) => (
                                <div key={index}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{category.category}</span>
                                    <span className="text-sm text-[#666666]">
                                      ${category.amount} ({category.percentage}%)
                                    </span>
                                  </div>
                                  <Progress value={category.percentage} className="h-2" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Earnings Insights</CardTitle>
                          <CardDescription>Key metrics and trends in your earnings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">Performance Metrics</h3>

                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#666666]">Average Monthly Earnings</span>
                                  <span className="font-bold text-[#333333]">
                                    ${(MONTHLY_EARNINGS.reduce((acc, month) => acc + month.amount, 0) / 12).toFixed(2)}
                                  </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                  <span className="text-[#666666]">Highest Earning Month</span>
                                  <span className="font-bold text-[#333333]">
                                    {
                                      MONTHLY_EARNINGS.reduce(
                                        (max, month) => (month.amount > max.amount ? month : max),
                                        MONTHLY_EARNINGS[0],
                                      ).month
                                    }{" "}
                                    (${Math.max(...MONTHLY_EARNINGS.map((m) => m.amount))})
                                  </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                  <span className="text-[#666666]">Year-over-Year Growth</span>
                                  <span className="font-bold text-green-600">+24.5%</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">Recommendations</h3>

                              <div className="space-y-4">
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                                  <h4 className="font-medium text-blue-800">Increase Your Rates</h4>
                                  <p className="text-sm text-blue-700 mt-1">
                                    Your ratings are high. Consider increasing your rates for new clients.
                                  </p>
                                </div>

                                <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                                  <h4 className="font-medium text-green-800">Focus on Cleaning Jobs</h4>
                                  <p className="text-sm text-green-700 mt-1">
                                    Cleaning jobs make up 34% of your income. Consider specializing further.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
