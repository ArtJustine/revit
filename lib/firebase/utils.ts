import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  type Timestamp,
  type DocumentData,
} from "firebase/firestore"
import { db } from "./config"

// Job type definition
export interface Job {
  id?: string
  title: string
  description: string
  category: string
  budget: number
  location: string
  clientId: string
  professionalId?: string
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled"
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

// User profile type definition
export interface UserProfile {
  id?: string
  uid: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  userType: string
  profession?: string
  rating?: number
  completedJobs?: number
  profileImage?: string
  createdAt?: Timestamp
}

/**
 * Helper function to convert Firestore document to typed object with ID
 */
function convertDoc<T extends DocumentData>(doc: DocumentData): T {
  return {
    id: doc.id,
    ...doc.data(),
  } as T
}

/**
 * Create a new job in Firestore
 * @param jobData Job data to create
 * @returns Promise with the complete job object including ID
 */
export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) {
  try {
    console.log("Creating job with data:", jobData)

    // Ensure status is set to "open" if not provided
    // Normalize category to lowercase for consistent matching
    const jobWithDefaults = {
      ...jobData,
      status: jobData.status || "open",
      category: jobData.category?.toLowerCase() || "other",
    }

    // Add timestamps
    const jobWithTimestamps = {
      ...jobWithDefaults,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, "jobs"), jobWithTimestamps)
    console.log("Job created with ID:", docRef.id)

    // Return the complete job object with ID
    return {
      id: docRef.id,
      ...jobWithDefaults,
      createdAt: new Date(), // Use a JavaScript Date for immediate use
      updatedAt: new Date(),
    }
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

/**
 * Get a job by ID
 * @param jobId Job ID to fetch
 * @returns Promise with the job data
 */
export async function getJobById(jobId: string) {
  try {
    const jobDoc = await getDoc(doc(db, "jobs", jobId))

    if (!jobDoc.exists()) {
      throw new Error("Job not found")
    }

    return convertDoc<Job>(jobDoc)
  } catch (error) {
    console.error("Error getting job:", error)
    throw error
  }
}

/**
 * Get jobs assigned to a professional
 * @param professionalId Professional ID to fetch jobs for
 * @returns Promise with an array of jobs
 */
export async function getJobsByProfessional(professionalId: string) {
  try {
    console.log(`Fetching jobs for professional: ${professionalId}`)

    const jobsQuery = query(
      collection(db, "jobs"),
      where("professionalId", "==", professionalId),
      orderBy("updatedAt", "desc"),
    )

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push(convertDoc<Job>(doc))
    })

    console.log(`Found ${jobs.length} jobs for professional ${professionalId}`)
    return jobs
  } catch (error) {
    console.error("Error getting professional jobs:", error)
    throw error
  }
}

/**
 * Get jobs created by a client
 * @param clientId Client ID to fetch jobs for
 * @returns Promise with an array of jobs
 */
export async function getJobsByClient(clientId: string) {
  try {
    console.log(`Fetching jobs for client: ${clientId}`)

    const jobsQuery = query(collection(db, "jobs"), where("clientId", "==", clientId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      const job = convertDoc<Job>(doc)
      console.log(`Found job: ${job.id}, title: ${job.title}, status: ${job.status}`)
      jobs.push(job)
    })

    console.log(`Found ${jobs.length} jobs for client ${clientId}`)
    return jobs
  } catch (error) {
    console.error("Error getting client jobs:", error)
    throw error
  }
}

/**
 * Get all available (open) jobs
 * @returns Promise with an array of open jobs
 */
export async function getAvailableJobs() {
  try {
    console.log("Fetching all available jobs")

    const jobsQuery = query(collection(db, "jobs"), where("status", "==", "open"), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      const job = convertDoc<Job>(doc)
      console.log(`Found available job: ${job.id}, title: ${job.title}, category: ${job.category}`)
      jobs.push(job)
    })

    console.log(`Found ${jobs.length} available jobs`)
    return jobs
  } catch (error) {
    console.error("Error getting available jobs:", error)
    throw error
  }
}

/**
 * Get jobs that match a professional's category
 * @param professionalId Professional ID to match jobs for
 * @returns Promise with an array of matching jobs
 */
export async function getMatchingJobs(professionalId: string) {
  try {
    console.log(`Finding matching jobs for professional: ${professionalId}`)

    // First get the professional's profile to determine their category
    const userDoc = await getDoc(doc(db, "users", professionalId))

    if (!userDoc.exists()) {
      console.log(`Professional profile not found for ID: ${professionalId}`)
      return []
    }

    const userData = userDoc.data()
    const profession = userData.profession?.toLowerCase()

    if (!profession) {
      console.log(`No profession set for professional ID: ${professionalId}`)
      return []
    }

    console.log(`Professional's profession: ${profession}`)

    // Get all available jobs
    const allAvailableJobs = await getAvailableJobs()

    // Filter jobs that match the professional's category
    const matchingJobs = allAvailableJobs.filter((job) => {
      const isMatch = job.category?.toLowerCase() === profession
      console.log(`Job ${job.id} category: ${job.category}, matches profession ${profession}: ${isMatch}`)
      return isMatch
    })

    console.log(`Found ${matchingJobs.length} matching jobs for profession: ${profession}`)
    return matchingJobs
  } catch (error) {
    console.error("Error getting matching jobs:", error)
    throw error
  }
}

/**
 * Update a job's status or other fields
 * @param jobId Job ID to update
 * @param updateData Data to update
 * @returns Promise that resolves when the update is complete
 */
export async function updateJob(jobId: string, updateData: Partial<Omit<Job, "id" | "createdAt">>) {
  try {
    // Always update the updatedAt timestamp
    const dataWithTimestamp = {
      ...updateData,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(doc(db, "jobs", jobId), dataWithTimestamp)
    console.log("Job updated successfully:", jobId)

    return true
  } catch (error) {
    console.error("Error updating job:", error)
    throw error
  }
}

/**
 * Assign a job to a professional
 * @param jobId Job ID to assign
 * @param professionalId Professional ID to assign to
 * @returns Promise that resolves when the assignment is complete
 */
export async function assignJob(jobId: string, professionalId: string) {
  try {
    await updateJob(jobId, {
      professionalId,
      status: "assigned",
    })

    console.log(`Job ${jobId} assigned to professional ${professionalId}`)
    return true
  } catch (error) {
    console.error("Error assigning job:", error)
    throw error
  }
}

/**
 * Update job status
 * @param jobId Job ID to update
 * @param status New status
 * @returns Promise that resolves when the status update is complete
 */
export async function updateJobStatus(
  jobId: string,
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled",
) {
  try {
    await updateJob(jobId, { status })
    console.log(`Job ${jobId} status updated to ${status}`)
    return true
  } catch (error) {
    console.error("Error updating job status:", error)
    throw error
  }
}

/**
 * Get user profile by ID
 * @param userId User ID to fetch
 * @returns Promise with the user profile data
 */
export async function getUserProfile(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))

    if (!userDoc.exists()) {
      throw new Error("User profile not found")
    }

    return convertDoc<UserProfile>(userDoc)
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

/**
 * Update user profile
 * @param userId User ID to update
 * @param profileData Profile data to update
 * @returns Promise that resolves when the update is complete
 */
export async function updateUserProfile(userId: string, profileData: Partial<Omit<UserProfile, "id" | "uid">>) {
  try {
    // Add updatedAt timestamp
    const dataWithTimestamp = {
      ...profileData,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(doc(db, "users", userId), dataWithTimestamp)
    console.log("User profile updated successfully:", userId)

    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

/**
 * Get featured professionals
 * @param limitCount Number of professionals to fetch
 * @returns Promise with an array of professional profiles
 */
export async function getFeaturedProfessionals(limitCount = 4) {
  try {
    const professionalsQuery = query(
      collection(db, "users"),
      where("userType", "==", "professional"),
      limit(limitCount),
    )

    const querySnapshot = await getDocs(professionalsQuery)
    const professionals: UserProfile[] = []

    querySnapshot.forEach((doc) => {
      professionals.push(convertDoc<UserProfile>(doc))
    })

    return professionals
  } catch (error) {
    console.error("Error getting featured professionals:", error)
    throw error
  }
}
