"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { createJob } from "@/lib/firebase/utils"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budget must be a positive number.",
  }),
  location: z.string().min(3, {
    message: "Please enter a valid location.",
  }),
})

export default function PostJobPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      budget: "",
      location: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      setSubmitError("You must be logged in to post a job.")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const jobData = {
        title: values.title,
        description: values.description,
        category: values.category.toLowerCase(), // Ensure category is lowercase
        budget: Number.parseFloat(values.budget),
        location: values.location,
        clientId: user.uid,
        status: "open",
      }

      console.log("Creating job with data:", jobData)
      const jobId = await createJob(jobData)
      console.log("Job created with ID:", jobId)

      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Redirect to job details page after a short delay
      setTimeout(() => {
        router.push(`/jobs/${jobId}`)
      }, 2000)
    } catch (error: any) {
      console.error("Error creating job:", error)
      setSubmitError(error.message || "An error occurred while posting your job. Please try again.")
      setIsSubmitting(false)
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

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-[#333333]">Post a New Job</h1>
                  <p className="text-[#666666] mt-2">Describe what you need done and find the right professional</p>
                </div>

                {submitSuccess ? (
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-green-700 mb-2">Job Posted Successfully!</h2>
                    <p className="text-green-600 mb-4">Your job has been posted and is now visible to professionals.</p>
                    <p className="text-green-600">Redirecting to job details...</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Fix leaking bathroom faucet" {...field} />
                            </FormControl>
                            <FormDescription>
                              A clear title helps professionals understand what you need.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the job in detail, including any specific requirements or preferences."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Be as specific as possible to get accurate quotes.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="plumber">Plumber</SelectItem>
                                <SelectItem value="electrician">Electrician</SelectItem>
                                <SelectItem value="carpenter">Carpenter</SelectItem>
                                <SelectItem value="painter">Painter</SelectItem>
                                <SelectItem value="mechanic">Mechanic</SelectItem>
                                <SelectItem value="cleaner">Cleaner</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Choose the category that best matches your job.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget ($)</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" step="0.01" placeholder="e.g., 100" {...field} />
                              </FormControl>
                              <FormDescription>Your estimated budget for this job.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., New York, NY" {...field} />
                              </FormControl>
                              <FormDescription>Where the job needs to be done.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                          Error: {submitError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Posting Job...
                          </div>
                        ) : (
                          "Post Job"
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
