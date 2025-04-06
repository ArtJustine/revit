"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/firebase/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: string | string[]
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push("/login")
        return
      }

      // If requiredUserType is specified, check user type
      if (requiredUserType && user.userType) {
        const requiredTypes = Array.isArray(requiredUserType) ? requiredUserType : [requiredUserType]

        if (!requiredTypes.includes(user.userType)) {
          // Redirect based on user type
          if (user.userType === "client") {
            router.push("/dashboard")
          } else if (user.userType === "professional") {
            router.push("/professional/dashboard")
          } else {
            router.push("/login")
          }
        }
      }
    }
  }, [user, loading, router, requiredUserType])

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Loading...</p>
        </div>
      </div>
    )
  }

  // If not loading and no user, return null (will be redirected)
  if (!user) {
    return null
  }

  // If requiredUserType is specified and user doesn't match, return null
  if (requiredUserType && user.userType) {
    const requiredTypes = Array.isArray(requiredUserType) ? requiredUserType : [requiredUserType]

    if (!requiredTypes.includes(user.userType)) {
      return null
    }
  }

  return <>{children}</>
}

