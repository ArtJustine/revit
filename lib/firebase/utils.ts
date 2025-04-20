import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./config"

// Add the cn utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Type definitions
export interface Job {
  id: string
  title: string
  description: string
  budget: number
  category: string
  location: string
  status: string
  clientId: string
  professionalId?: string
  createdAt: any
  updatedAt: any
}

export interface Application {
  id: string
  jobId: string
  professionalId: string
  professionalName: string
  professionalEmail: string
  professionalPhone?: string
  professionalProfession?: string
  professionalExperience?: string
  message: string
  status: string
  createdAt: any
  updatedAt?: any
}

// Create a new job
export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) {
  try {
    const jobRef = collection(db, "jobs")

    // Ensure timestamps are properly set
    const newJob = {
      ...jobData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    // Add the document to Firestore
    const docRef = await addDoc(jobRef, newJob)
    console.log("Job created with ID:", docRef.id)

    // Return the job ID
    return docRef.id
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

// Get a specific job by ID
export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const jobDoc = await getDoc(doc(db, "jobs", jobId))

    if (!jobDoc.exists()) {
      return null
    }

    return { id: jobDoc.id, ...jobDoc.data() } as Job
  } catch (error) {
    console.error("Error getting job by ID:", error)
    throw error
  }
}

// Get jobs created by a specific client
export async function getJobsByClient(clientId: string): Promise<Job[]> {
  try {
    console.log(`Fetching jobs for client ID: ${clientId}`)

    // Create a query to get all jobs where clientId matches
    const jobsQuery = query(collection(db, "jobs"), where("clientId", "==", clientId), orderBy("createdAt", "desc"))

    // Execute the query
    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    // Log the number of documents found
    console.log(`Found ${querySnapshot.size} jobs for client ${clientId}`)

    // Process each document
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log(`Job ${doc.id} data:`, data)

      jobs.push({
        id: doc.id,
        ...data,
      } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting client jobs:", error)
    throw error
  }
}

// Get jobs assigned to a specific professional
export async function getJobsByProfessional(professionalId: string): Promise<Job[]> {
  try {
    const jobsQuery = query(
      collection(db, "jobs"),
      where("professionalId", "==", professionalId),
      orderBy("updatedAt", "desc"),
    )

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting professional jobs:", error)
    throw error
  }
}

// Get all available jobs (status = "open")
export async function getAvailableJobs(): Promise<Job[]> {
  try {
    const jobsQuery = query(collection(db, "jobs"), where("status", "==", "open"), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting available jobs:", error)
    throw error
  }
}

// Get jobs that match a professional's category/profession
export async function getMatchingJobs(professionalId: string): Promise<Job[]> {
  try {
    // First get the professional's data to find their profession
    const professionalDoc = await getDoc(doc(db, "users", professionalId))

    if (!professionalDoc.exists()) {
      throw new Error("Professional not found")
    }

    const professionalData = professionalDoc.data()
    const profession = professionalData.profession

    if (!profession) {
      return []
    }

    // Then query for jobs that match the profession
    const jobsQuery = query(
      collection(db, "jobs"),
      where("status", "==", "open"),
      where("category", "==", profession),
      orderBy("createdAt", "desc"),
    )

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting matching jobs:", error)
    throw error
  }
}

// Apply for a job
export async function applyForJob(applicationData: Omit<Application, "id" | "updatedAt">) {
  try {
    const applicationRef = collection(db, "applications")

    const newApplication = {
      ...applicationData,
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(applicationRef, newApplication)
    console.log("Application created with ID:", docRef.id)

    return docRef.id
  } catch (error) {
    console.error("Error creating application:", error)
    throw error
  }
}

// Get applications for a specific job
export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  try {
    const applicationsQuery = query(
      collection(db, "applications"),
      where("jobId", "==", jobId),
      orderBy("createdAt", "desc"),
    )

    const querySnapshot = await getDocs(applicationsQuery)
    const applications: Application[] = []

    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as Application)
    })

    return applications
  } catch (error) {
    console.error("Error getting job applications:", error)
    throw error
  }
}

// Update application status
export async function updateApplicationStatus(applicationId: string, status: string) {
  try {
    const applicationRef = doc(db, "applications", applicationId)

    await updateDoc(applicationRef, {
      status,
      updatedAt: serverTimestamp(),
    })

    console.log(`Application ${applicationId} status updated to ${status}`)
  } catch (error) {
    console.error("Error updating application status:", error)
    throw error
  }
}

// Update job status
export async function updateJobStatus(jobId: string, status: string) {
  try {
    const jobRef = doc(db, "jobs", jobId)

    await updateDoc(jobRef, {
      status,
      updatedAt: serverTimestamp(),
    })

    console.log(`Job ${jobId} status updated to ${status}`)
  } catch (error) {
    console.error("Error updating job status:", error)
    throw error
  }
}

// Assign job to a professional
export async function assignJobToProfessional(jobId: string, professionalId: string) {
  try {
    const jobRef = doc(db, "jobs", jobId)

    await updateDoc(jobRef, {
      professionalId,
      status: "assigned",
      updatedAt: serverTimestamp(),
    })

    console.log(`Job ${jobId} assigned to professional ${professionalId}`)
  } catch (error) {
    console.error("Error assigning job to professional:", error)
    throw error
  }
}

// Check if a user exists and get their user type
export async function getUserTypeById(userId: string): Promise<string | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))

    if (!userDoc.exists()) {
      return null
    }

    const userData = userDoc.data()
    return userData.userType || null
  } catch (error) {
    console.error("Error getting user type:", error)
    throw error
  }
}
