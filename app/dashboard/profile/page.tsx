"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Camera, Save, ArrowLeft } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { getUserProfile, updateUserProfile } from "@/lib/firebase/utils"

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  bio: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ClientProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      bio: "",
    },
  })

  useEffect(() => {
    async function loadUserProfile() {
      if (!user) return

      try {
        setIsLoading(true)
        const profile = await getUserProfile(user.uid)

        if (profile) {
          form.reset({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            zipCode: profile.zipCode || "",
            bio: profile.bio || "",
          })

          if (profile.profileImage) {
            setProfileImage(profile.profileImage)
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [user, form])

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return

    try {
      setIsSaving(true)

      await updateUserProfile(user.uid, {
        ...data,
        displayName: `${data.firstName} ${data.lastName}`,
        profileImage: profileImage || undefined,
      })

      // Show success message or redirect
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
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
    <ProtectedRoute requiredUserType="client">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6 flex items-center">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mr-4 text-[#666666]">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-[#333333]">My Profile</h1>
            </div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Image Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Your public profile image</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={profileImage || ""} alt="Profile" />
                      <AvatarFallback className="bg-[#00A6A6] text-white text-2xl">
                        {form.watch("firstName")?.[0]?.toUpperCase() || "C"}
                        {form.watch("lastName")?.[0]?.toUpperCase() || "L"}
                      </AvatarFallback>
                    </Avatar>
                    <Button className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                      <Camera className="mr-2 h-4 w-4" /> Upload Photo
                    </Button>
                    <p className="text-xs text-[#666666] mt-2 text-center">
                      Recommended: Square image, at least 300x300 pixels
                    </p>
                  </CardContent>
                </Card>

                {/* Profile Form Card */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00A6A6]"></div>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <Input
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    {...field}
                                    disabled={!!user?.email}
                                  />
                                </FormControl>
                                {user?.email && (
                                  <FormDescription>
                                    Email address cannot be changed as it's linked to your account.
                                  </FormDescription>
                                )}
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="New York" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input placeholder="NY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="10001" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>About Me</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us a bit about yourself..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              className="bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                  <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" /> Save Changes
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
