"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/firebase/auth-context"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const { resetPassword } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Firebase password reset (commented out for now, using mock function)
      await resetPassword(values.email)
      setSubmitSuccess(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setSubmitError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-md">
          <div className="mb-8">
            <Link href="/login" className="text-[#666666] hover:text-[#00A6A6] flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#333333]">Reset Your Password</h1>
              <p className="text-[#666666] mt-2">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {submitSuccess ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-[#333333] mb-2">Check Your Email</h2>
                <p className="text-[#666666] mb-6">
                  We've sent a password reset link to your email address. Please check your inbox and follow the
                  instructions to reset your password.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/login">Return to Login</Link>
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

