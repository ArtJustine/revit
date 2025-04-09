"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  CreditCard,
  LogOut,
  ArrowLeft,
  Save,
  AlertTriangle,
  CheckCircle,
  Plus,
  BanknoteIcon as Bank,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const { user, userData, signOut } = useAuth()
  const router = useRouter()
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    jobAlerts: true,
    messages: true,
    updates: false,
    marketing: false,
  })

  // Payment methods
  const [paymentMethods] = useState([
    {
      id: "1",
      type: "credit_card",
      last4: "4242",
      brand: "Visa",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
  ])

  const handleSaveSettings = () => {
    // Simulate saving settings
    setSaveSuccess(true)
    setSaveError(false)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      setSaveError(true)
    }
  }

  return (
    <ProtectedRoute requiredUserType="professional">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/professional/dashboard")}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold text-[#333333]">Settings</h1>
              </div>
              <Button className="mt-4 md:mt-0 bg-[#00A6A6] hover:bg-[#008f8f] text-white" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>

            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your settings have been saved successfully.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {saveError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Error</AlertTitle>
                  <AlertDescription className="text-red-700">
                    There was a problem saving your settings. Please try again.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar />
              </div>

              {/* Main content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="account">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account information and preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue={userData?.firstName || "John"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue={userData?.lastName || "Doe"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={user?.email || "johndoe@example.com"}
                              disabled
                            />
                            <p className="text-xs text-[#666666]">To change your email, please contact support</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue={userData?.phone || "(555) 123-4567"} />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label htmlFor="profession">Profession</Label>
                          <Select defaultValue={userData?.profession || "cleaning"}>
                            <SelectTrigger id="profession">
                              <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="gardening">Gardening</SelectItem>
                              <SelectItem value="plumbing">Plumbing</SelectItem>
                              <SelectItem value="electrical">Electrical</SelectItem>
                              <SelectItem value="painting">Painting</SelectItem>
                              <SelectItem value="carpentry">Carpentry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" defaultValue={userData?.location || "New York, NY"} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            className="w-full p-3 border rounded-md h-32 resize-none"
                            defaultValue={
                              userData?.bio ||
                              "I am a professional with over 5 years of experience in cleaning and maintenance services. I pride myself on attention to detail and providing excellent customer service. I am reliable, punctual, and committed to delivering high-quality work for all my clients."
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="availability">Availability</Label>
                          <Select defaultValue="weekdays">
                            <SelectTrigger id="availability">
                              <SelectValue placeholder="Select your availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                              <SelectItem value="weekends">Weekends (Sat-Sun)</SelectItem>
                              <SelectItem value="all">All Days</SelectItem>
                              <SelectItem value="custom">Custom Schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="profile-visibility">Profile Visibility</Label>
                            <p className="text-sm text-[#666666]">Make your profile visible to potential clients</p>
                          </div>
                          <Switch id="profile-visibility" defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage how and when you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Email Notifications</h3>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="job-alerts">Job Alerts</Label>
                              <p className="text-sm text-[#666666]">
                                Receive notifications about new job opportunities
                              </p>
                            </div>
                            <Switch
                              id="job-alerts"
                              checked={emailNotifications.jobAlerts}
                              onCheckedChange={(checked) =>
                                setEmailNotifications({ ...emailNotifications, jobAlerts: checked })
                              }
                            />
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="messages">Messages</Label>
                              <p className="text-sm text-[#666666]">Receive notifications when you get new messages</p>
                            </div>
                            <Switch
                              id="messages"
                              checked={emailNotifications.messages}
                              onCheckedChange={(checked) =>
                                setEmailNotifications({ ...emailNotifications, messages: checked })
                              }
                            />
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="updates">Platform Updates</Label>
                              <p className="text-sm text-[#666666]">
                                Receive notifications about platform updates and new features
                              </p>
                            </div>
                            <Switch
                              id="updates"
                              checked={emailNotifications.updates}
                              onCheckedChange={(checked) =>
                                setEmailNotifications({ ...emailNotifications, updates: checked })
                              }
                            />
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="marketing">Marketing</Label>
                              <p className="text-sm text-[#666666]">Receive marketing emails and promotional offers</p>
                            </div>
                            <Switch
                              id="marketing"
                              checked={emailNotifications.marketing}
                              onCheckedChange={(checked) =>
                                setEmailNotifications({ ...emailNotifications, marketing: checked })
                              }
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Push Notifications</h3>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-all">All Push Notifications</Label>
                              <p className="text-sm text-[#666666]">Enable or disable all push notifications</p>
                            </div>
                            <Switch id="push-all" defaultChecked />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Frequency</h3>

                          <div className="space-y-2">
                            <Label htmlFor="frequency">Email Digest Frequency</Label>
                            <Select defaultValue="daily">
                              <SelectTrigger id="frequency">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="daily">Daily Digest</SelectItem>
                                <SelectItem value="weekly">Weekly Digest</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payment">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment methods and payout preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Your Payment Methods</h3>

                          {paymentMethods.length === 0 ? (
                            <p className="text-center py-6 text-[#666666]">No payment methods added yet</p>
                          ) : (
                            <div className="space-y-4">
                              {paymentMethods.map((method) => (
                                <div
                                  key={method.id}
                                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 bg-[#00A6A6] rounded-md flex items-center justify-center text-white mr-4">
                                        <CreditCard className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-[#333333]">
                                          {method.brand} •••• {method.last4}
                                        </h4>
                                        <p className="text-sm text-[#666666]">
                                          Expires {method.expMonth}/{method.expYear}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      {method.isDefault && (
                                        <span className="text-xs bg-[#00A6A6]/10 text-[#00A6A6] px-2 py-1 rounded-full mr-2">
                                          Default
                                        </span>
                                      )}
                                      <Button variant="ghost" size="sm" className="text-[#00A6A6] hover:text-[#008f8f]">
                                        Edit
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <Button className="mt-4 bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                          </Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Payout Information</h3>

                          <div className="p-4 border rounded-lg bg-white">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-10 w-10 bg-[#00A6A6] rounded-md flex items-center justify-center text-white mr-4">
                                  <Bank className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-[#333333]">Bank Account</h4>
                                  <p className="text-sm text-[#666666]">Chase Bank •••• 5678</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="text-[#00A6A6] hover:text-[#008f8f]">
                                Edit
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="payout-frequency">Payout Frequency</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger id="payout-frequency">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Tax Information</h3>

                          <div className="p-4 border rounded-lg bg-white">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-[#333333]">Tax Form W-9</h4>
                                <p className="text-sm text-[#666666]">Last updated: January 15, 2025</p>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </div>

                          <Button variant="outline">Update Tax Information</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security and privacy</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Password</h3>

                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>

                          <Button className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">Change Password</Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                              <p className="text-sm text-[#666666]">Add an extra layer of security to your account</p>
                            </div>
                            <Switch id="two-factor" />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Privacy</h3>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="data-sharing">Data Sharing</Label>
                              <p className="text-sm text-[#666666]">
                                Allow us to use your data to improve our services
                              </p>
                            </div>
                            <Switch id="data-sharing" defaultChecked />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Account Actions</h3>

                          <Button
                            variant="outline"
                            className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={handleSignOut}
                          >
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out of All Devices
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" /> Deactivate Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
