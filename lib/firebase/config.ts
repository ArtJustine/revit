// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQR3lfkpxqRFtVWlgnyJd1nxhCYRKiZYo",
  authDomain: "fixie-52851.firebaseapp.com",
  projectId: "fixie-52851",
  storageBucket: "fixie-52851.firebasestorage.app",
  messagingSenderId: "565245031723",
  appId: "1:565245031723:web:2e123bd6ef39ae5777816e",
  measurementId: "G-QZ2Z9QE1G1",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }

