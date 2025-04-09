"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { Lock, Bell, Shield, ArrowLeft, Save, AlertTriangle, CheckCircle } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Current password must be at least 6 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  jobUpdates: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
})

type PasswordFormValues = z.infer<typeof passwordFormSchema>
type NotificationFormValues = z.infer<typeof notificationFormSchema>

export default function ClientSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("security")
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      jobUpdates: true,
      marketingEmails: false,
    },
  })

  async function onPasswordSubmit(data: PasswordFormValues) {
    if (!user) return

    try {
      setIsSaving(true)

      // Here you would implement the password change logic
      // For example: await updatePassword(user, data.currentPassword, data.newPassword)

      console.log("Password change requested:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Password updated successfully!")
      passwordForm.reset()
    } catch (error) {
      console.error("Error updating password:", error)
      setSuccessMessage("")
    } finally {
      setIsSaving(false)
    }
  }

  async function onNotificationSubmit(data: NotificationFormValues) {
    if (!user) return

    try {
      setIsSaving(true)

      // Here you would implement the notification settings update logic
      console.log("Notification settings update:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Notification settings updated successfully!")
    } catch (error) {
      console.error("Error updating notification settings:", error)
      setSuccessMessage("")
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
              <h1 className="text-2xl font-bold text-[#333333]">Account Settings</h1>
            </div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="security">
                    <Lock className="mr-2 h-4 w-4" /> Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy">
                    <Shield className="mr-2 h-4 w-4" /> Privacy
                  </TabsTrigger>
                </TabsList>

                {successMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {successMessage}
                  </div>
                )}

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password Settings</CardTitle>
                      <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Password must be at least 8 characters and include a mix of letters, numbers, and
                                  symbols.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
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
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" /> Update Password
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-[#333333]">Enable 2FA</h3>
                          <p className="text-sm text-[#666666]">Protect your account with two-factor authentication</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...notificationForm}>
                        <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                          <FormField
                            control={notificationForm.control}
                            name="emailNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Email Notifications</FormLabel>
                                  <FormDescription>Receive notifications about your jobs via email</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={notificationForm.control}
                            name="smsNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">SMS Notifications</FormLabel>
                                  <FormDescription>
                                    Receive notifications about your jobs via text message
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={notificationForm.control}
                            name="jobUpdates"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Job Updates</FormLabel>
                                  <FormDescription>
                                    Receive updates when professionals apply to your jobs
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={notificationForm.control}
                            name="marketingEmails"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Marketing Emails</FormLabel>
                                  <FormDescription>Receive promotional emails and special offers</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
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
                                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Manage your privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">Profile Visibility</h3>
                          <p className="text-sm text-[#666666]">Control who can see your profile information</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">Data Collection</h3>
                          <p className="text-sm text-[#666666]">
                            Allow us to collect usage data to improve our services
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="rounded-lg border p-4 bg-red-50">
                        <div className="flex items-center mb-4">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          <h3 className="text-base font-medium text-red-700">Danger Zone</h3>
                        </div>
                        <p className="text-sm text-red-600 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
