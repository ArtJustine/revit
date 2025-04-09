"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  PlusCircle,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  LogOut,
  Briefcase,
  Calendar,
  MessageSquare,
  ChevronRight,
  Star,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { getJobsByClient, getFeaturedProfessionals, type Job, type UserProfile } from "@/lib/firebase/utils"

export default function DashboardPage() {
  const { user, userData, signOut } = useAuth()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [featuredProfessionals, setFeaturedProfessionals] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // Modify the fetchData function to ensure we're getting the latest data
  const fetchData = useCallback(async () => {
    if (user) {
      try {
        setLoading(true)
        console.log("Fetching client dashboard data...")

        // Force cache refresh by adding a timestamp parameter
        const timestamp = new Date().getTime()
        const [jobsData, professionalsData] = await Promise.all([
          getJobsByClient(user.uid, timestamp),
          getFeaturedProfessionals(4),
        ])

        console.log("Client jobs raw data:", jobsData)

        // Ensure we have valid job data
        if (Array.isArray(jobsData)) {
          setJobs(jobsData)
        } else {
          console.error("Invalid jobs data format:", jobsData)
          setJobs([])
        }

        setFeaturedProfessionals(professionalsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  // Fetch data on initial load
  useEffect(() => {
    fetchData()

    // Set up an interval to refresh data every 30 seconds
    const intervalId = setInterval(() => {
      fetchData()
    }, 30000)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [fetchData])

  // Add this console log to debug the jobs data and filtering
  useEffect(() => {
    if (jobs.length > 0) {
      console.log("All jobs:", jobs)
      console.log(
        "Active jobs:",
        jobs.filter((job) => job.status !== "completed" && job.status !== "cancelled"),
      )
      console.log("Active tab value:", activeTab)
    }
  }, [jobs, activeTab])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Refresh data when switching tabs
    fetchData()
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  // Get job status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get job status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Search className="h-4 w-4" />
      case "assigned":
        return <User className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-[#333333]">
                  Welcome, {userData?.firstName || user?.displayName?.split(" ")[0] || "Client"}
                </h1>
                <p className="text-[#666666]">Manage your projects and find professionals</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/post-job">
                    <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
                  </Link>
                </Button>
                <Button onClick={handleSignOut} variant="outline" className="border-[#00A6A6] text-[#00A6A6]">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                      >
                        <Briefcase className="mr-3 h-5 w-5" />
                        <span>My Jobs</span>
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        <span>Messages</span>
                      </Link>
                      <Link
                        href="/dashboard/calendar"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Calendar className="mr-3 h-5 w-5" />
                        <span>Calendar</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <User className="mr-3 h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </nav>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Active Jobs</span>
                      <span className="font-bold text-[#333333]">
                        {jobs.filter((job) => job.status !== "completed" && job.status !== "cancelled").length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Completed Jobs</span>
                      <span className="font-bold text-[#333333]">
                        {jobs.filter((job) => job.status === "completed").length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Total Spent</span>
                      <span className="font-bold text-[#333333]">
                        $
                        {jobs
                          .filter((job) => job.status === "completed")
                          .reduce((total, job) => total + (job.budget || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main content */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="mb-4">
                      <Button onClick={fetchData} variant="outline" className="border-[#00A6A6] text-[#00A6A6]">
                        <Search className="mr-2 h-4 w-4" /> Refresh Jobs
                      </Button>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : jobs.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Jobs Yet</h3>
                          <p className="text-[#666666] text-center mb-6">
                            You haven't posted any jobs yet. Create your first job to get started.
                          </p>
                          <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Link href="/post-job">
                              <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {jobs.map((job) => (
                          <motion.div key={job.id} variants={itemVariants}>
                            <Card className="hover:shadow-md transition-shadow">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>
                                      Posted on{" "}
                                      {job.createdAt
                                        ? new Date(job.createdAt.seconds * 1000).toLocaleDateString()
                                        : "Recently"}
                                    </CardDescription>
                                  </div>
                                  <div
                                    className={`px-3 py-1 rounded-full flex items-center ${getStatusColor(job.status)}`}
                                  >
                                    {getStatusIcon(job.status)}
                                    <span className="ml-1 text-xs font-medium capitalize">
                                      {job.status.replace("_", " ")}
                                    </span>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-[#666666] line-clamp-2 mb-2">{job.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                    Budget: ${job.budget}
                                  </div>
                                  <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666] capitalize">
                                    Category: {job.category}
                                  </div>
                                  <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                    Location: {job.location}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="border-t pt-4">
                                <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                                  <Link href={`/jobs/${job.id}`}>
                                    View Details <ChevronRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="active">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : jobs.filter((job) => job.status !== "completed" && job.status !== "cancelled").length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Clock className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Active Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">
                            You don't have any active jobs at the moment.
                          </p>
                          <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Link href="/post-job">
                              <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {jobs
                          .filter((job) => job.status !== "completed" && job.status !== "cancelled")
                          .map((job) => (
                            <motion.div key={job.id} variants={itemVariants}>
                              <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle>{job.title}</CardTitle>
                                      <CardDescription>
                                        Posted on{" "}
                                        {job.createdAt
                                          ? new Date(job.createdAt.seconds * 1000).toLocaleDateString()
                                          : "Recently"}
                                      </CardDescription>
                                    </div>
                                    <div
                                      className={`px-3 py-1 rounded-full flex items-center ${getStatusColor(job.status)}`}
                                    >
                                      {getStatusIcon(job.status)}
                                      <span className="ml-1 text-xs font-medium capitalize">
                                        {job.status.replace("_", " ")}
                                      </span>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-[#666666] line-clamp-2 mb-2">{job.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                      Budget: ${job.budget}
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666] capitalize">
                                      Category: {job.category}
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                      Location: {job.location}
                                    </div>
                                  </div>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                  <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                                    <Link href={`/jobs/${job.id}`}>
                                      View Details <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : jobs.filter((job) => job.status === "completed").length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <CheckCircle className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Completed Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">You don't have any completed jobs yet.</p>
                          <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Link href="/dashboard">View All Jobs</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {jobs
                          .filter((job) => job.status === "completed")
                          .map((job) => (
                            <motion.div key={job.id} variants={itemVariants}>
                              <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle>{job.title}</CardTitle>
                                      <CardDescription>
                                        Completed on{" "}
                                        {job.updatedAt
                                          ? new Date(job.updatedAt.seconds * 1000).toLocaleDateString()
                                          : "Recently"}
                                      </CardDescription>
                                    </div>
                                    <div
                                      className={`px-3 py-1 rounded-full flex items-center ${getStatusColor(job.status)}`}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      <span className="ml-1 text-xs font-medium">Completed</span>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-[#666666] line-clamp-2 mb-2">{job.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                      Budget: ${job.budget}
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666] capitalize">
                                      Category: {job.category}
                                    </div>
                                  </div>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                  <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                                    <Link href={`/jobs/${job.id}`}>
                                      View Details <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                      </motion.div>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Featured professionals section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8"
                >
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">Featured Professionals</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredProfessionals.map((professional) => (
                      <Card key={professional.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex items-center p-4">
                            <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                              <Image
                                src={professional.profileImage || "/placeholder.svg?height=100&width=100"}
                                alt={professional.displayName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-[#333333]">{professional.displayName}</h3>
                              <p className="text-sm text-[#666666] capitalize">{professional.profession}</p>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${i < (professional.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-[#666666] ml-2">
                                  {professional.completedJobs || 0} jobs completed
                                </span>
                              </div>
                            </div>
                            <Button asChild size="sm" className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                              <Link href={`/professionals/${professional.id}`}>View</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                    >
                      <Link href="/categories">Browse All Categories</Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
