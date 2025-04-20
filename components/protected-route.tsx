"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/firebase/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: string | string[]
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      // If no user is logged in, redirect to login
      if (!user) {
        console.log("No user found, redirecting to login")
        router.push("/login")
        return
      }

      // If requiredUserType is specified, check user type
      if (requiredUserType && user.userType) {
        const requiredTypes = Array.isArray(requiredUserType) ? requiredUserType : [requiredUserType]

        if (!requiredTypes.includes(user.userType)) {
          console.log(`User type mismatch. Required: ${requiredTypes.join(", ")}, Found: ${user.userType}`)

          // Redirect based on user type
          if (user.userType === "client") {
            console.log("Redirecting to client dashboard")
            router.push("/dashboard")
          } else if (user.userType === "professional") {
            console.log("Redirecting to professional dashboard")
            router.push("/professional/dashboard")
          } else {
            console.log("Unknown user type, redirecting to login")
            router.push("/login")
          }
          return
        }
      }

      // User is authorized
      console.log("User authorized to access this route")
      setAuthorized(true)
    }
  }, [user, loading, router, requiredUserType])

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Loading your account...</p>
        </div>
      </div>
    )
  }

  // If authorized is still false but we're not loading, we're in the process of redirecting
  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Redirecting to the appropriate page...</p>
        </div>
      </div>
    )
  }

  // Render children if authorized
  return <>{children}</>
}
