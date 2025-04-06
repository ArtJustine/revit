"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"

export default function ProfessionalDashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <ProtectedRoute requiredUserType="professional">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#333333]">Professional Dashboard</h1>
                <Button onClick={handleSignOut} variant="outline" className="border-[#00A6A6] text-[#00A6A6]">
                  Sign Out
                </Button>
              </div>

              <p className="text-[#666666] mb-8">
                Hello, {user?.displayName || user?.email || "Professional"}! This is your professional dashboard where
                you can manage your profile, find jobs, and connect with clients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#E0E0E0] p-6 rounded-xl">
                  <h2 className="text-xl font-bold text-[#333333] mb-4">Find Jobs</h2>
                  <p className="text-[#666666] mb-4">
                    Browse available jobs in your area and submit quotes to interested clients.
                  </p>
                  <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </div>

                <div className="bg-[#E0E0E0] p-6 rounded-xl">
                  <h2 className="text-xl font-bold text-[#333333] mb-4">Manage Profile</h2>
                  <p className="text-[#666666] mb-4">
                    Update your profile, add portfolio items, and showcase your skills to attract more clients.
                  </p>
                  <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href="/professional/profile">Edit Profile</Link>
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-8">
                <p className="text-yellow-700">
                  <strong>Note:</strong> Firebase authentication is ready to be implemented. This is a placeholder
                  professional dashboard.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

