"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Mock User type for development
type User = {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: User | null
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock authentication state change
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)

    // Commented out Firebase auth listener
    /*
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
    */
  }, [])

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    additionalData?: any,
  ) => {
    // Mock sign up functionality
    console.log("Sign up called with:", { email, password, firstName, lastName, userType, additionalData })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock user
    const mockUser = {
      uid: `mock-uid-${Date.now()}`,
      email,
      displayName: `${firstName} ${lastName}`,
    }

    setUser(mockUser)
    return mockUser

    // Commented out Firebase sign up
    /*
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        userType,
        createdAt: new Date().toISOString(),
        ...additionalData
      });

      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
    */
  }

  const signIn = async (email: string, password: string) => {
    // Mock sign in functionality
    console.log("Sign in called with:", { email, password })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock user
    const mockUser = {
      uid: `mock-uid-${Date.now()}`,
      email,
      displayName: email.split("@")[0],
    }

    setUser(mockUser)
    return mockUser

    // Commented out Firebase sign in
    /*
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
    */
  }

  const signOut = async () => {
    // Mock sign out functionality
    console.log("Sign out called")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(null)

    // Commented out Firebase sign out
    /*
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    */
  }

  const resetPassword = async (email: string) => {
    // Mock password reset functionality
    console.log("Password reset called with:", email)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Commented out Firebase password reset
    /*
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
    */
  }

  const value = {
    user,
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

