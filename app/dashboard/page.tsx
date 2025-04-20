"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/firebase/auth-context"

export default function DashboardRedirect() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
        return
      }

      // Redirect based on user type
      if (userData?.userType === "client") {
        router.push("/client/dashboard")
      } else if (userData?.userType === "professional") {
        router.push("/professional/dashboard")
      } else {
        // Default fallback if userType is not set
        console.log("User type not found, redirecting to default dashboard")
        router.push("/client/dashboard")
      }
    }
  }, [user, userData, loading, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6] mx-auto"></div>
        <p className="mt-4 text-[#666666]">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
