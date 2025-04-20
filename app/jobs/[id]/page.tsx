"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  DollarSign,
  Tag,
  Calendar,
  MessageSquare,
  ChevronLeft,
  Briefcase,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import {
  getJobById,
  applyForJob,
  updateJobStatus,
  getApplicationsByJobId,
  type Job,
  type Application,
} from "@/lib/firebase/utils"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { user, userData } = useAuth()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [applicationSuccess, setApplicationSuccess] = useState(false)
  const [applicationError, setApplicationError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [userApplication, setUserApplication] = useState<Application | null>(null)

  // Fetch job data
  useEffect(() => {
    async function fetchJobData() {
      try {
        setLoading(true)
        console.log(`Fetching job data for ID: ${params.id}`)

        const jobData = await getJobById(params.id)
        if (!jobData) {
          console.error("Job not found")
          router.push("/dashboard")
          return
        }

        setJob(jobData)

        // If user is the client who posted this job, fetch applications
        if (user && userData?.userType === "client" && jobData.clientId === user.uid) {
          const jobApplications = await getApplicationsByJobId(params.id)
          setApplications(jobApplications)
        }

        // If user is a professional, check if they've already applied
        if (user && userData?.userType === "professional") {
          const jobApplications = await getApplicationsByJobId(params.id)
          const myApplication = jobApplications.find((app) => app.professionalId === user.uid)
          if (myApplication) {
            setUserApplication(myApplication)
          }
        }
      } catch (error) {
        console.error("Error fetching job data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchJobData()
    }
  }, [params.id, user, userData, router])

  // Handle job application
  const handleApply = async () => {
    if (!user || !job) return

    try {
      setApplying(true)
      setApplicationError("")

      const applicationData = {
        jobId: job.id,
        professionalId: user.uid,
        professionalName: user.displayName || "",
        professionalEmail: user.email || "",
        professionalPhone: userData?.phone || "",
        professionalProfession: userData?.profession || "",
        professionalExperience: userData?.experience || "",
        message: applicationMessage,
        status: "pending",
        createdAt: new Date(),
      }

      await applyForJob(applicationData)

      setApplicationSuccess(true)
      setApplicationMessage("")

      // Refresh the page data to show updated application status
      const jobApplications = await getApplicationsByJobId(params.id)
      const myApplication = jobApplications.find((app) => app.professionalId === user.uid)
      if (myApplication) {
        setUserApplication(myApplication)
      }
    } catch (error: any) {
      console.error("Error applying for job:", error)
      setApplicationError(error.message || "Failed to submit application. Please try again.")
    } finally {
      setApplying(false)
    }
  }

  // Handle job status update
  const handleStatusUpdate = async (newStatus: string) => {
    if (!user || !job) return

    try {
      setUpdatingStatus(true)

      await updateJobStatus(job.id, newStatus)

      // Refresh job data
      const updatedJob = await getJobById(params.id)
      setJob(updatedJob)
    } catch (error) {
      console.error("Error updating job status:", error)
    } finally {
      setUpdatingStatus(false)
    }
  }

  // Check if professional can apply (matches job category)
  const canApply = () => {
    if (!user || !userData || !job) return false
    if (userData.userType !== "professional") return false
    if (job.status !== "open") return false
    if (userApplication) return false // Already applied

    // Check if professional's profession matches job category
    return userData.profession?.toLowerCase() === job.category?.toLowerCase()
  }

  // Get status badge color
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

  // Get status icon
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-[#333333] mb-2">Job Not Found</h3>
                <p className="text-[#666666] text-center mb-6">
                  The job you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => router.back()} className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              {/* Back button */}
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 text-[#666666] hover:text-[#00A6A6] hover:bg-[#00A6A6]/10"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              {/* Job details card */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl">{job.title}</CardTitle>
                      <CardDescription>
                        Posted on{" "}
                        {job.createdAt ? new Date(job.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
                      </CardDescription>
                    </div>
                    <div className={`px-4 py-2 rounded-full flex items-center ${getStatusColor(job.status)}`}>
                      {getStatusIcon(job.status)}
                      <span className="ml-2 font-medium capitalize">{job.status.replace("_", " ")}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job description */}
                  <div>
                    <h3 className="text-lg font-medium text-[#333333] mb-2">Description</h3>
                    <p className="text-[#666666] whitespace-pre-line">{job.description}</p>
                  </div>

                  {/* Job details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-[#00A6A6] mr-2" />
                      <div>
                        <p className="text-sm text-[#666666]">Budget</p>
                        <p className="font-medium text-[#333333]">${job.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 text-[#00A6A6] mr-2" />
                      <div>
                        <p className="text-sm text-[#666666]">Category</p>
                        <p className="font-medium text-[#333333] capitalize">{job.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-[#00A6A6] mr-2" />
                      <div>
                        <p className="text-sm text-[#666666]">Location</p>
                        <p className="font-medium text-[#333333]">{job.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  {job.updatedAt && job.updatedAt !== job.createdAt && (
                    <div>
                      <h3 className="text-lg font-medium text-[#333333] mb-2">Timeline</h3>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-[#00A6A6] mr-2" />
                        <div>
                          <p className="text-sm text-[#666666]">Last Updated</p>
                          <p className="font-medium text-[#333333]">
                            {new Date(job.updatedAt.seconds * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Actions for client */}
                {userData?.userType === "client" && job.clientId === user?.uid && (
                  <CardFooter className="flex-col border-t pt-6">
                    <div className="w-full mb-4">
                      <h3 className="text-lg font-medium text-[#333333] mb-2">Job Status</h3>
                      <p className="text-[#666666] mb-4">You can update the status of this job as it progresses.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={job.status === "open" ? "default" : "outline"}
                          className={job.status === "open" ? "bg-[#00A6A6] text-white" : ""}
                          onClick={() => handleStatusUpdate("open")}
                          disabled={updatingStatus || job.status === "open"}
                        >
                          <Search className="mr-2 h-4 w-4" /> Open
                        </Button>
                        <Button
                          variant={job.status === "assigned" ? "default" : "outline"}
                          className={job.status === "assigned" ? "bg-[#00A6A6] text-white" : ""}
                          onClick={() => handleStatusUpdate("assigned")}
                          disabled={updatingStatus || job.status === "assigned"}
                        >
                          <User className="mr-2 h-4 w-4" /> Assigned
                        </Button>
                        <Button
                          variant={job.status === "in_progress" ? "default" : "outline"}
                          className={job.status === "in_progress" ? "bg-[#00A6A6] text-white" : ""}
                          onClick={() => handleStatusUpdate("in_progress")}
                          disabled={updatingStatus || job.status === "in_progress"}
                        >
                          <Clock className="mr-2 h-4 w-4" /> In Progress
                        </Button>
                        <Button
                          variant={job.status === "completed" ? "default" : "outline"}
                          className={job.status === "completed" ? "bg-[#00A6A6] text-white" : ""}
                          onClick={() => handleStatusUpdate("completed")}
                          disabled={updatingStatus || job.status === "completed"}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Completed
                        </Button>
                        <Button
                          variant={job.status === "cancelled" ? "default" : "outline"}
                          className={
                            job.status === "cancelled"
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "text-red-500 hover:text-red-600"
                          }
                          onClick={() => handleStatusUpdate("cancelled")}
                          disabled={updatingStatus || job.status === "cancelled"}
                        >
                          <AlertCircle className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                )}
              </Card>

              {/* Applications section for client */}
              {userData?.userType === "client" && job.clientId === user?.uid && (
                <Card>
                  <CardHeader>
                    <CardTitle>Applications ({applications.length})</CardTitle>
                    <CardDescription>
                      {applications.length === 0
                        ? "No applications yet. Check back later."
                        : "Review applications from professionals"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {applications.length === 0 ? (
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-[#666666]">No applications yet</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {applications.map((application) => (
                          <div key={application.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium text-[#333333]">{application.professionalName}</h3>
                                <p className="text-sm text-[#666666]">{application.professionalProfession}</p>
                              </div>
                              <Badge
                                className={
                                  application.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : application.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {application.status}
                              </Badge>
                            </div>
                            <p className="text-[#666666] mb-4">{application.message}</p>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                className="bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                                onClick={() => {
                                  // Handle accept application
                                }}
                                disabled={application.status !== "pending"}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => {
                                  // Handle reject application
                                }}
                                disabled={application.status !== "pending"}
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#00A6A6] text-[#00A6A6]"
                                onClick={() => {
                                  // Handle message professional
                                }}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" /> Message
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Application section for professional */}
              {userData?.userType === "professional" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for this Job</CardTitle>
                    <CardDescription>
                      {canApply()
                        ? "Send your application to the client"
                        : userApplication
                          ? "You have already applied for this job"
                          : job.status !== "open"
                            ? "This job is no longer accepting applications"
                            : userData.profession?.toLowerCase() !== job.category?.toLowerCase()
                              ? `This job is for ${job.category} professionals only`
                              : "You cannot apply for this job"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userApplication ? (
                      <div className="border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-[#333333]">Your Application</h3>
                          <Badge
                            className={
                              userApplication.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : userApplication.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {userApplication.status}
                          </Badge>
                        </div>
                        <p className="text-[#666666] mb-4">{userApplication.message}</p>
                        <p className="text-sm text-[#666666]">
                          Applied on {new Date(userApplication.createdAt.seconds * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    ) : canApply() ? (
                      <div>
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-[#333333] mb-1">
                            Application Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Introduce yourself and explain why you're a good fit for this job..."
                            className="min-h-[150px]"
                            value={applicationMessage}
                            onChange={(e) => setApplicationMessage(e.target.value)}
                          />
                          <p className="text-xs text-[#666666] mt-1">
                            Include relevant experience and why you're interested in this job.
                          </p>
                        </div>

                        {applicationError && (
                          <div className="p-3 mb-4 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                            {applicationError}
                          </div>
                        )}

                        {applicationSuccess && (
                          <div className="p-3 mb-4 text-sm bg-green-50 border border-green-200 text-green-600 rounded-md">
                            Your application has been submitted successfully!
                          </div>
                        )}

                        <Button
                          className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                          onClick={handleApply}
                          disabled={applying || !applicationMessage.trim()}
                        >
                          {applying ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-[#666666]">
                          {job.status !== "open"
                            ? "This job is no longer accepting applications"
                            : userData.profession?.toLowerCase() !== job.category?.toLowerCase()
                              ? `This job requires a ${job.category} professional`
                              : "You cannot apply for this job"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
