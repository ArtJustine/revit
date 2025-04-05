import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ProfessionalDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-[#333333] mb-6">Professional Dashboard</h1>
            <p className="text-[#666666] mb-8">
              Thank you for signing up as a professional! This is a placeholder dashboard page. In a real application,
              you would see your professional dashboard with job listings, profile management, and more.
            </p>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-8">
              <p className="text-yellow-700">
                <strong>Note:</strong> Firebase authentication has not been implemented yet. This is a placeholder
                dashboard.
              </p>
            </div>
            <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

