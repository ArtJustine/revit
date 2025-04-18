"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/firebase/auth-context"

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Please enter a valid phone number.",
    }),
    profession: z.string({
      required_error: "Please select a profession.",
    }),
    experience: z.string({
      required_error: "Please select your experience level.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export default function WorkerSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const router = useRouter()
  const { signUp } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profession: "",
      experience: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const result = await signUp(values.email, values.password, values.firstName, values.lastName, "professional", {
        phone: values.phone,
        profession: values.profession, // Capturing the selected profession
        experience: values.experience,
      })

      console.log("Worker signup result:", result)

      setIsSubmitting(false)
      setSubmitSuccess(true)

      setTimeout(() => {
        router.push("/professional/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("Signup error:", error)
      setSubmitError(error.message || "An error occurred during signup. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-md">
          <div className="mb-8">
            <Link href="/signup" className="text-[#666666] hover:text-[#00A6A6] flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup options
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#333333]">Create a Professional Account</h1>
              <p className="text-[#666666] mt-2">Showcase your skills and find new clients</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your profession" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="plumber">Plumber</SelectItem>
                          <SelectItem value="electrician">Electrician</SelectItem>
                          <SelectItem value="carpenter">Carpenter</SelectItem>
                          <SelectItem value="mechanic">Mechanic</SelectItem>
                          <SelectItem value="painter">Painter</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                          <SelectItem value="expert">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-[#666666]" />
                            ) : (
                              <Eye className="h-4 w-4 text-[#666666]" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-[#666666]" />
                            ) : (
                              <Eye className="h-4 w-4 text-[#666666]" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>
                        I agree to the <Link href="/terms" className="text-[#00A6A6]">terms and conditions</Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00A6A6] text-white transition-all duration-300 transform hover:scale-105 hover:bg-[#00A6A6CC]"
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>

                {submitSuccess && (
                  <div className="mt-4 text-center text-green-500">Signup Successful! Redirecting...</div>
                )}
                {submitError && (
                  <div className="mt-4 text-center text-red-500">{submitError}</div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
