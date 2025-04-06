"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./config"

// User type
type User = FirebaseUser & {
  userType?: string
  additionalData?: any
}

interface AuthContextType {
  user: User | null
  userData: any | null
  loading: boolean
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    additionalData?: any,
  ) => Promise<User>
  signIn: (email: string, password: string) => Promise<User>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up the Firebase auth state observer
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const user = firebaseUser as User
        setUser(user)

        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUserData(userData)
            // Add userType to the user object
            user.userType = userData.userType
            user.additionalData = userData
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        // User is signed out
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    // Clean up the observer when the component unmounts
    return () => unsubscribe()
  }, [])

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    additionalData?: any,
  ) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user as User

      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      })

      // Create user document in Firestore
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        userType,
        createdAt: new Date().toISOString(),
        ...additionalData,
      }

      await setDoc(doc(db, "users", user.uid), userData)

      // Add userType to the user object
      user.userType = userType
      user.additionalData = userData

      return user
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user as User
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Error resetting password:", error)
      throw error
    }
  }

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

