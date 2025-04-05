import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl mb-4">Join Revit Today</h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">Choose how you want to use Revit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#E0E0E0] rounded-xl p-8 text-center hover:shadow-md transition-all">
                <div className="mb-6 relative h-48 w-48 mx-auto">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Client"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[#333333] mb-4">I Need a Professional</h2>
                <p className="text-[#666666] mb-6">
                  Find skilled workers for your home, office, or any project. Post jobs and hire with confidence.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white w-full">
                  <Link href="/signup/client">
                    Sign Up as a Client <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-8 text-center hover:shadow-md transition-all">
                <div className="mb-6 relative h-48 w-48 mx-auto">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Professional"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[#333333] mb-4">I'm a Professional</h2>
                <p className="text-[#666666] mb-6">
                  Showcase your skills, find new clients, and grow your business with our platform.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white w-full">
                  <Link href="/signup/worker">
                    Sign Up as a Professional <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-[#666666]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#00A6A6] font-medium hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

