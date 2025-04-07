"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/firebase/auth-context"
import { getUserProfile } from "@/lib/firebase/utils"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()
  const { signIn } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setLoginError("")

    try {
      // Sign in with Firebase
      const user = await signIn(values.email, values.password)
      console.log("Login successful:", user)

      // Wait a moment for the auth state to update
      setTimeout(async () => {
        try {
          // Get user data from Firestore
          const userDoc = await getUserProfile(user.uid)
          console.log("User profile:", userDoc)

          // Redirect based on user type
          if (userDoc?.userType === "client") {
            router.push("/dashboard")
          } else if (userDoc?.userType === "professional") {
            router.push("/professional/dashboard")
          } else {
            // Default fallback
            router.push("/dashboard")
          }
        } catch (err) {
          console.error("Error fetching user profile:", err)
          // Default redirect if we can't determine user type
          router.push("/dashboard")
        }
      }, 500)
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle specific Firebase auth errors
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setLoginError("Invalid email or password. Please try again.")
      } else if (error.code === "auth/too-many-requests") {
        setLoginError("Too many failed login attempts. Please try again later.")
      } else {
        setLoginError(error.message || "Invalid email or password. Please try again.")
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#333333]">Welcome Back</h1>
              <p className="text-[#666666] mt-2">Log in to your Revit account</p>
            </div>

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
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link href="/forgot-password" className="text-sm text-[#00A6A6] hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>

            <div className="text-center mt-6">
              <p className="text-[#666666] text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#00A6A6] font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

