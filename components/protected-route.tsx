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
    // For development, we'll allow access even without authentication
    // Comment out the redirect for now
    /*
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/login")
    }
    */
    // If requiredUserType is specified, check user type
    // In a real app, you would fetch the user's profile from Firestore
    // For now, we'll just allow access
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

  // For development, always render children
  return <>{children}</>

  // Original Firebase implementation
  // return user ? <>{children}</> : null
}

