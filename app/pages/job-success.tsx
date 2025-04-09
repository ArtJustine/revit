"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Briefcase, MessageSquare, Edit, PlusCircle } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { getJobById, type Job } from "@/lib/firebase/utils"

export default function JobSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("id")
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobDetails() {
      if (!jobId) {
        router.push("/client/dashboard")
        return
      }

      try {
        setLoading(true)
        const jobData = await getJobById(jobId)
        setJob(jobData)
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobId, router])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
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
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold text-[#333333] mb-4">Job Not Found</h1>
            <p className="text-[#666666] mb-6">The job you're looking for could not be found.</p>
            <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
              <Link href="/client/dashboard">Go to Dashboard</Link>
            </Button>
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
          <div className="container mx-auto max-w-2xl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-8">
              <motion.div variants={itemVariants} className="inline-block mb-6">
                <div className="rounded-full bg-green-100 p-4 inline-block">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl font-bold text-[#333333] mb-2">
                Job Posted Successfully!
              </motion.h1>
              <motion.p variants={itemVariants} className="text-[#666666] text-lg">
                Your job has been posted and is now visible to professionals.
              </motion.p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Card className="mb-8 border-green-200 shadow-sm">
                <CardContent className="pt-6">
                  <motion.div variants={itemVariants} className="mb-4">
                    <h2 className="text-xl font-bold text-[#333333] mb-1">{job.title}</h2>
                    <p className="text-[#666666]">{job.description}</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#666666]">Category</p>
                      <p className="font-medium text-[#333333] capitalize">{job.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Budget</p>
                      <p className="font-medium text-[#333333]">${job.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Location</p>
                      <p className="font-medium text-[#333333]">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Status</p>
                      <p className="font-medium text-green-600 capitalize">{job.status.replace("_", " ")}</p>
                    </div>
                  </motion.div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href={`/jobs/${job.id}`}>
                      View Job Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-[#00A6A6] text-[#00A6A6]">
                    <Link href={`/jobs/${job.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Job
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4 text-center">
                    <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-blue-800">View Your Jobs</h3>
                    <p className="text-sm text-blue-700 mt-1">Manage all your posted jobs</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full border-blue-300 text-blue-700">
                      <Link href="/client/dashboard">Go to Dashboard</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="p-4 text-center">
                    <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium text-purple-800">Messages</h3>
                    <p className="text-sm text-purple-700 mt-1">Check for professional responses</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full border-purple-300 text-purple-700">
                      <Link href="/client/messages">View Messages</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-4 text-center">
                    <PlusCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-green-800">Post Another Job</h3>
                    <p className="text-sm text-green-700 mt-1">Create a new job posting</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full border-green-300 text-green-700">
                      <Link href="/post-job">Post New Job</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <h2 className="text-xl font-bold text-[#333333] mb-4">What Happens Next?</h2>
                <ol className="text-left space-y-4 mb-6">
                  <li className="flex items-start">
                    <div className="bg-[#00A6A6] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="text-[#666666]">
                      <span className="font-medium text-[#333333]">Professionals will see your job</span> and can apply
                      if they're interested in working with you.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#00A6A6] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="text-[#666666]">
                      <span className="font-medium text-[#333333]">Review applications</span> from professionals and
                      choose the best fit for your job.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#00A6A6] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="text-[#666666]">
                      <span className="font-medium text-[#333333]">Assign the job</span> to your chosen professional and
                      work together to complete it.
                    </p>
                  </li>
                </ol>

                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/client/dashboard">Go to Dashboard</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
