import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, serverTimestamp, orderBy, limit } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./config"

// Define the user profile type
export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  userType: 'client' | 'professional';
  profession?: string;
  experience?: string;
  bio?: string;
  location?: string;
  rating?: number;
  completedJobs?: number;
  profileImage?: string;
  createdAt: any;
  [key: string]: any; // For additional fields
}

// Job interface
export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  clientId: string;
  professionalId?: string;
  createdAt: any;
  updatedAt: any;
  [key: string]: any;
}

// User profile functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as UserProfile
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

export async function updateUserProfile(userId: string, data: any) {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Get professionals by category
export async function getProfessionalsByCategory(category: string, limit = 10): Promise<UserProfile[]> {
  try {
    const professionalsQuery = query(
      collection(db, "users"),
      where("userType", "==", "professional"),
      where("profession", "==", category),
      orderBy("rating", "desc"),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(professionalsQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserProfile));
  } catch (error) {
    console.error("Error getting professionals by category:", error);
    throw error;
  }
}

// Get featured professionals
export async function getFeaturedProfessionals(limit = 6): Promise<UserProfile[]> {
  try {
    const professionalsQuery = query(
      collection(db, "users"),
      where("userType", "==", "professional"),
      orderBy("rating", "desc"),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(professionalsQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserProfile));
  } catch (error) {
    console.error("Error getting featured professionals:", error);
    throw error;
  }
}

// File upload function
export async function uploadFile(file: File, path: string) {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

// Job posting functions
export async function createJob(jobData: any) {
  try {
    const jobRef = await addDoc(collection(db, "jobs"), {
      ...jobData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'open',
    })
    return jobRef.id
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

export async function getJobsByClient(clientId: string) {
  try {
    const jobsQuery = query(
      collection(db, "jobs"), 
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(jobsQuery)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting client jobs:", error)
    throw error
  }
}

export async function getJobsByProfessional(professionalId: string) {
  try {
    const jobsQuery = query(
      collection(db, "jobs"), 
      where("professionalId", "==", professionalId),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(jobsQuery)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting professional jobs:", error)
    throw error
  }
}

export async function getAvailableJobs() {
  try {
    const jobsQuery = query(
      collection(db, "jobs"), 
      where("status", "==", "open"),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(jobsQuery)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting available jobs:", error)
    throw error
  }
}

export async function updateJob(jobId: string, data: any) {
  try {
    await updateDoc(doc(db, "jobs", jobId), {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error("Error updating job:", error)
    throw error
  }
}
