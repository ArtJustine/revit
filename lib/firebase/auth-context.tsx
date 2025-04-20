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
  ) => Promise<{ user: User; firestoreSuccess: boolean; userData: any }>
  signIn: (email: string, password: string) => Promise<User>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signUp: async () => {
    throw new Error("AuthProvider not initialized")
  },
  signIn: async () => {
    throw new Error("AuthProvider not initialized")
  },
  signOut: async () => {
    throw new Error("AuthProvider not initialized")
  },
  resetPassword: async () => {
    throw new Error("AuthProvider not initialized")
  },
})

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

  // Update the signUp function to better handle Firestore errors and return a more complete result
  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    additionalData?: any,
  ) => {
    try {
      console.log(`Starting ${userType} signup process...`)

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user as User
      console.log("Firebase auth account created successfully")

      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      })
      console.log("Profile updated with display name")

      // Create user document in Firestore with proper data formatting
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        userType, // This is the key field for determining user type
        createdAt: new Date(), // This will be properly converted to Firestore timestamp
        ...(additionalData || {}),
      }

      let firestoreSuccess = true
      try {
        // Ensure we wait for the Firestore document to be created
        await setDoc(doc(db, "users", user.uid), userData)
        console.log(`${userType} user document created in Firestore`)
        console.log(`User registered as ${userType} with data:`, userData)
      } catch (firestoreError) {
        console.error("Error creating Firestore document:", firestoreError)
        firestoreSuccess = false
        // Continue with the signup process even if Firestore fails
        // The user is already created in Firebase Auth
      }

      // Add userType to the user object
      user.userType = userType
      user.additionalData = userData

      console.log(`${userType} signup completed successfully`)
      return {
        user,
        firestoreSuccess,
        userData,
      }
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user as User

      // Fetch user data from Firestore to get the user type
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        // Add userType to the user object
        user.userType = userData.userType
        user.additionalData = userData
      }

      return user
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
  return context
}
