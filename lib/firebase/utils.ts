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
  type Timestamp,
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

/**
 * Create a new job in Firestore
 * @param jobData Job data to create
 * @returns Promise with the job ID
 */
export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) {
  try {
    // Ensure status is set to "open" if not provided
    const jobWithDefaults = {
      ...jobData,
      status: jobData.status || "open",
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

    // Return both the ID and the complete job data
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

    return {
      id: jobDoc.id,
      ...jobDoc.data(),
    } as Job
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
    const jobsQuery = query(
      collection(db, "jobs"),
      where("professionalId", "==", professionalId),
      orderBy("updatedAt", "desc"),
    )

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        ...doc.data(),
      } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting professional jobs:", error)
    throw error
  }
}

/**
 * Get jobs created by a client
 * @param clientId Client ID to fetch jobs for
 * @param timestamp Optional timestamp to force cache refresh
 * @returns Promise with an array of jobs
 */
export async function getJobsByClient(clientId: string, timestamp?: number) {
  try {
    console.log(`Fetching jobs for client ${clientId} at ${timestamp || "no timestamp"}`)

    const jobsQuery = query(collection(db, "jobs"), where("clientId", "==", clientId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      const jobData = doc.data()
      console.log(`Job ${doc.id} status: ${jobData.status}`)

      jobs.push({
        id: doc.id,
        ...jobData,
      } as Job)
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
    const jobsQuery = query(collection(db, "jobs"), where("status", "==", "open"), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(jobsQuery)
    const jobs: Job[] = []

    querySnapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        ...doc.data(),
      } as Job)
    })

    return jobs
  } catch (error) {
    console.error("Error getting available jobs:", error)
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
