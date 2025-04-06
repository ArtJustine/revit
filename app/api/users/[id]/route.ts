import { type NextRequest, NextResponse } from "next/server"
import { getUserProfile } from "@/lib/firebase/utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const userData = await getUserProfile(userId)

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

