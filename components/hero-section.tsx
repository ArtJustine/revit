import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#E0E0E0] to-[#F5F5F5]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#333333] animate-fade-in">
              Find Skilled Professionals For Any Job
            </h1>
            <p className="text-lg md:text-xl text-[#666666] max-w-md animate-fade-in animation-delay-200">
              Connect with verified mechanics, carpenters, plumbers, electricians and more in your area. Get the job
              done right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
              <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white rounded-full px-6 py-6 h-auto">
                <Link href="/signup/client">
                  Hire a Professional <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-full px-6 py-6 h-auto"
              >
                <Link href="/signup/worker">Join as a Professional</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl transform md:translate-y-4 transition-all duration-500 hover:translate-y-0 hover:shadow-2xl">
            <Image
              src="/hero.webp?height=450&width=500"
              alt="Professional worker"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00A6A6]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#00A6A6]/10 rounded-full translate-y-1/3 blur-2xl"></div>
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-[#00A6A6]/5 rounded-full -translate-x-1/2 blur-2xl"></div>
    </section>
  )
}

