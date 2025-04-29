"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
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
  Edit,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { getJobsByProfessional, getAvailableJobs, getMatchingJobs, type Job } from "@/lib/firebase/utils"

export default function ProfessionalDashboardPage() {
  const { user, userData, signOut } = useAuth()
  const router = useRouter()
  const [myJobs, setMyJobs] = useState<Job[]>([])
  const [availableJobs, setAvailableJobs] = useState<Job[]>([])
  const [matchingJobs, setMatchingJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("my-jobs")

  // Create a fetchData function that can be reused
  const fetchData = useCallback(async () => {
    if (user) {
      try {
        setLoading(true)
        console.log("Fetching professional dashboard data...")

        // Get jobs assigned to this professional
        const myJobsData = await getJobsByProfessional(user.uid)
        console.log("My jobs:", myJobsData)
        setMyJobs(myJobsData as Job[])

        // Get all available jobs
        const allAvailableJobs = await getAvailableJobs()
        console.log("All available jobs:", allAvailableJobs)
        setAvailableJobs(allAvailableJobs as Job[])

        // Get jobs that match this professional's category
        if (userData?.profession) {
          console.log("Professional profession:", userData.profession)
          const matchingJobsData = await getMatchingJobs(user.uid)
          console.log("Matching jobs:", matchingJobsData)
          setMatchingJobs(matchingJobsData as Job[])
        } else {
          console.log("No profession set for this professional")
          setMatchingJobs([])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [user, userData?.profession])

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

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Refresh data when switching to available tab
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

  // Calculate earnings
  const calculateEarnings = () => {
    return myJobs.filter((job) => job.status === "completed").reduce((total, job) => total + (job.budget || 0), 0)
  }

  // Check if a job matches the professional's profession
  const isMatchingJob = (job: Job) => {
    if (!userData?.profession) return false
    return job.category?.toLowerCase() === userData.profession.toLowerCase()
  }

  return (
    <ProtectedRoute requiredUserType="professional">
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
                  Welcome, {userData?.firstName || user?.displayName?.split(" ")[0] || "Professional"}
                </h1>
                <p className="text-[#666666]">Manage your jobs and find new opportunities</p>
                {userData?.profession && (
                  <p className="text-[#00A6A6] font-medium mt-1">
                    Your profession: <span className="capitalize">{userData.profession}</span>
                  </p>
                )}
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/professional/profile">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
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
    userType="professional"
    stats={{
      activeJobs: myJobs.filter((job) => job.status === "in_progress").length,
      completedJobs: myJobs.filter((job) => job.status === "completed").length,
    }}
  />
</motion.div>

              {/* Main content */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
                    <TabsTrigger value="available">Available Jobs</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="my-jobs">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : myJobs.filter((job) => job.status !== "completed").length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Active Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">
                            You don't have any active jobs at the moment. Browse available jobs to find new
                            opportunities.
                          </p>
                          <Button
                            onClick={() => handleTabChange("available")}
                            className="bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                          >
                            Browse Available Jobs
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {myJobs
                          .filter((job) => job.status !== "completed")
                          .map((job) => (
                            <motion.div key={job.id} variants={itemVariants}>
                              <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle>{job.title}</CardTitle>
                                      <CardDescription>
                                        Assigned on{" "}
                                        {job.updatedAt
                                          ? new Date(job.updatedAt.seconds * 1000).toLocaleDateString()
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

                  <TabsContent value="available">
                    <div className="mb-4 flex justify-between items-center">
                      <Button onClick={fetchData} variant="outline" className="border-[#00A6A6] text-[#00A6A6]">
                        <Search className="mr-2 h-4 w-4" /> Refresh Available Jobs
                      </Button>

                      {userData?.profession && (
                        <div className="text-sm text-[#666666]">
                          <span className="font-medium">Your profession:</span>{" "}
                          <span className="capitalize">{userData.profession}</span>
                          <span className="ml-1 text-xs">(Matching jobs are highlighted)</span>
                        </div>
                      )}
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : availableJobs.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Search className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-bold text-[#333333] mb-2">No Available Jobs</h3>
                          <p className="text-[#666666] text-center mb-6">
                            There are no available jobs at the moment. Check back later for new opportunities.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {/* First show matching jobs */}
                        {matchingJobs.length > 0 && (
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-[#333333] mb-4">Jobs Matching Your Profession</h3>
                            {matchingJobs.map((job) => (
                              <motion.div key={job.id} variants={itemVariants} className="mb-4">
                                <Card className="hover:shadow-md transition-shadow border-[#00A6A6] border-2">
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
                                      <div className="px-3 py-1 rounded-full flex items-center bg-blue-100 text-blue-800">
                                        <Search className="h-4 w-4" />
                                        <span className="ml-1 text-xs font-medium">Open</span>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-[#666666] line-clamp-2 mb-2">{job.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                        Budget: ${job.budget}
                                      </div>
                                      <div className="bg-[#00A6A6]/20 px-2 py-1 rounded-md text-xs text-[#00A6A6] font-medium capitalize">
                                        Category: {job.category} (Matches your profession)
                                      </div>
                                      <div className="bg-gray-100 px-2 py-1 rounded-md text-xs text-[#666666]">
                                        Location: {job.location}
                                      </div>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="border-t pt-4">
                                    <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                                      <Link href={`/jobs/${job.id}`}>
                                        View & Apply <ChevronRight className="ml-2 h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Then show other available jobs */}
                        <div>
                          <h3 className="text-xl font-bold text-[#333333] mb-4">
                            {matchingJobs.length > 0 ? "Other Available Jobs" : "Available Jobs"}
                          </h3>
                          {availableJobs
                            .filter((job) => !matchingJobs.some((matchingJob) => matchingJob.id === job.id))
                            .map((job) => (
                              <motion.div key={job.id} variants={itemVariants} className="mb-4">
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
                                      <div className="px-3 py-1 rounded-full flex items-center bg-blue-100 text-blue-800">
                                        <Search className="h-4 w-4" />
                                        <span className="ml-1 text-xs font-medium">Open</span>
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
                                        View & Apply <ChevronRight className="ml-2 h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </motion.div>
                            ))}
                        </div>
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
                          <Button
                            onClick={() => handleTabChange("available")}
                            className="bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                          >
                            Browse Available Jobs
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
                                      Earned: ${job.budget}
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
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
