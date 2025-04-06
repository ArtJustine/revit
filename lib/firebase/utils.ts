import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./config"

// User profile functions
export async function getUserProfile(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }
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
    })
    return jobRef.id
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

export async function getJobsByClient(clientId: string) {
  try {
    const jobsQuery = query(collection(db, "jobs"), where("clientId", "==", clientId))
    const querySnapshot = await getDocs(jobsQuery)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting client jobs:", error)
    throw error
  }
}

export async function getJobsByProfessional(professionalId: string) {
  try {
    const jobsQuery = query(collection(db, "jobs"), where("professionalId", "==", professionalId))
    const querySnapshot = await getDocs(jobsQuery)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting professional jobs:", error)
    throw error
  }
}

