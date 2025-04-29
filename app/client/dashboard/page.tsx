"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  PlusCircle,
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
  Search,
} from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { getJobsByClient, type Job } from "@/lib/firebase/utils"

export default function ClientDashboardPage() {
  const { user, userData, signOut } = useAuth()
  const router = useRouter()
  const [myJobs, setMyJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

  // Modify the fetchData function to add more debugging
  const fetchData = useCallback(async () => {
    if (user) {
      try {
        setLoading(true)
        console.log("Fetching client dashboard data for user:", user.uid)

        // Get jobs created by this client
        const jobsData = await getJobsByClient(user.uid)
        console.log("Client jobs fetched:", jobsData)

        // Check if we have any jobs
        if (jobsData.length === 0) {
          console.log("No jobs found for this client")
        } else {
          console.log(`Found ${jobsData.length} jobs for this client`)
          // Log each job for debugging
          jobsData.forEach((job, index) => {
            console.log(`Job ${index + 1}:`, job)
          })
        }

        setMyJobs(jobsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  // Add a console log when the component mounts
  useEffect(() => {
    console.log("Client dashboard mounted, user:", user?.uid)

    if (user) {
      fetchData()

      // Set up an interval to refresh data every 30 seconds
      const intervalId = setInterval(() => {
        console.log("Refreshing job data...")
        fetchData()
      }, 30000)

      // Clean up interval on unmount
      return () => clearInterval(intervalId)
    }
  }, [fetchData, user])

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

  // Calculate total spent
  const calculateTotalSpent = () => {
    return myJobs.filter((job) => job.status === "completed").reduce((total, job) => total + (job.budget || 0), 0)
  }

  return (
    <ProtectedRoute requiredUserType="client">
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
                <p className="text-[#666666]">Manage your jobs and find professionals</p>
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
  <Sidebar
    userType="client"
    stats={{
      activeJobs: myJobs.filter((job) => job.status !== "completed" && job.status !== "cancelled").length,
      completedJobs: myJobs.filter((job) => job.status === "completed").length,
      totalSpent: calculateTotalSpent(),
      openJobs: myJobs.filter((job) => job.status === "open").length,
    }}
  />
</motion.div>

              {/* Main content */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="active">Active Jobs</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active">
                    <div className="mb-4 flex justify-between items-center">
                      <Button onClick={fetchData} variant="outline" className="border-[#00A6A6] text-[#00A6A6]">
                        <Search className="mr-2 h-4 w-4" /> Refresh Jobs
                      </Button>
                      <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                        <Link href="/post-job">
                          <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
                        </Link>
                      </Button>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : myJobs.filter((job) => job.status !== "completed" && job.status !== "cancelled").length ===
                      0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Active Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">
                            You don't have any active jobs at the moment. Post a new job to get started.
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
                        {myJobs
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
                    ) : myJobs.filter((job) => job.status === "completed").length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <CheckCircle className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Completed Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">You don't have any completed jobs yet.</p>
                          <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Link href="/post-job">
                              <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {myJobs
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
                                      Cost: ${job.budget}
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

                  <TabsContent value="all">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : myJobs.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Jobs Found</h3>
                          <p className="text-[#666666] text-center mb-6">
                            You haven't posted any jobs yet. Post a new job to get started.
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
                        {myJobs.map((job) => (
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
                </Tabs>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
