"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, ChevronLeft, PlusCircle, ExternalLink, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { getJobById, type Job } from "@/lib/firebase/utils"

export default function JobSuccessPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobData() {
      if (!params.id) {
        router.push("/client/dashboard")
        return
      }

      try {
        setLoading(true)
        const jobData = await getJobById(params.id)

        if (!jobData) {
          console.error("Job not found")
          router.push("/client/dashboard")
          return
        }

        setJob(jobData)
      } catch (error) {
        console.error("Error fetching job data:", error)
        router.push("/client/dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchJobData()
  }, [params.id, router])

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
          <div className="container mx-auto max-w-3xl">
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
          <div className="container mx-auto max-w-3xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-red-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Job Not Found</h3>
                <p className="text-[#666666] text-center mb-6">
                  We couldn't find the job you're looking for. It may have been removed or there was an error.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/client/dashboard">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Link>
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
    <ProtectedRoute requiredUserType="client">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card className="border-t-4 border-t-[#00A6A6]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 bg-[#00A6A6]/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <CardTitle className="text-2xl">Job Posted Successfully!</CardTitle>
                  <CardDescription>Your job has been posted and is now visible to professionals</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-lg text-[#333333] mb-4">Job Summary</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-[#666666]">Title</p>
                        <p className="font-medium text-[#333333]">{job.title}</p>
                      </div>

                      <div>
                        <p className="text-sm text-[#666666]">Description</p>
                        <p className="text-[#333333] line-clamp-3">{job.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-[#666666]">Budget</p>
                          <p className="font-medium text-[#333333]">${job.budget}</p>
                        </div>

                        <div>
                          <p className="text-sm text-[#666666]">Category</p>
                          <p className="font-medium text-[#333333] capitalize">{job.category}</p>
                        </div>

                        <div>
                          <p className="text-sm text-[#666666]">Location</p>
                          <p className="font-medium text-[#333333]">{job.location}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-[#666666]">Status</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          Open
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">What happens next?</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Professionals will be able to view your job and submit applications</li>
                            <li>You'll receive notifications when someone applies</li>
                            <li>You can review applications and choose the best professional for the job</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="w-full sm:w-auto bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href={`/jobs/${job.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" /> View Job Details
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full sm:w-auto border-[#00A6A6] text-[#00A6A6]">
                    <Link href="/client/dashboard">
                      <Briefcase className="mr-2 h-4 w-4" /> Go to Dashboard
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/post-job">
                      <PlusCircle className="mr-2 h-4 w-4" /> Post Another Job
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
