import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Shield, Clock, CreditCard, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ClientBenefitsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333]">Benefits for Clients</h1>
                <p className="text-lg text-[#666666] max-w-md">
                  Discover why thousands of people trust Revit to find skilled professionals for their projects.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/signup/client">Sign Up as a Client</Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Happy client" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Key benefits section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Key Benefits</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Revit makes finding and hiring skilled professionals simple, secure, and stress-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Verified Professionals</h3>
                <p className="text-[#666666]">
                  Every professional on our platform undergoes a thorough verification process, including background
                  checks and skill assessments.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Save Time</h3>
                <p className="text-[#666666]">
                  No more endless searching or calling around. Post your job and receive responses from qualified
                  professionals within hours.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Secure Payments</h3>
                <p className="text-[#666666]">
                  Our secure payment system holds your payment until the job is completed to your satisfaction,
                  protecting both parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">How It Works</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Finding the right professional is easy with Revit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Post Your Job</h3>
                <p className="text-sm text-[#666666]">
                  Describe what you need done, when you need it, and your location.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Compare Quotes</h3>
                <p className="text-sm text-[#666666]">
                  Review profiles, ratings, and quotes from interested professionals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Hire & Pay</h3>
                <p className="text-sm text-[#666666]">
                  Select the right professional and pay securely through our platform.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Leave a Review</h3>
                <p className="text-sm text-[#666666]">
                  Share your experience to help other clients find great professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Client Success Stories</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Hear from clients who found the perfect professional through Revit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Client" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">Sarah Johnson</h4>
                    <p className="text-sm text-[#666666]">Homeowner</p>
                  </div>
                </div>
                <p className="text-[#666666] mb-4">
                  "I needed an electrician urgently when my power went out. Within an hour of posting on Revit, I had
                  three qualified professionals reach out. The one I hired arrived the same day and fixed the issue
                  quickly. Amazing service!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Client" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">David Chen</h4>
                    <p className="text-sm text-[#666666]">Office Manager</p>
                  </div>
                </div>
                <p className="text-[#666666] mb-4">
                  "We've been using Revit for all our office maintenance needs. The verification process gives us peace
                  of mind, and the quality of work has been consistently excellent. It's saved us so much time and
                  hassle."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Client" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">Maria Rodriguez</h4>
                    <p className="text-sm text-[#666666]">Property Manager</p>
                  </div>
                </div>
                <p className="text-[#666666] mb-4">
                  "As a property manager, I need reliable professionals regularly. Revit has become my go-to platform.
                  The secure payment system protects both parties, and I love being able to build relationships with
                  trusted professionals."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Get answers to common questions about using Revit as a client
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">How much does it cost to use Revit?</h3>
                <p className="text-[#666666]">
                  It's free to sign up and post jobs on Revit. We charge a small service fee only when you hire a
                  professional and the job is completed successfully.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">How are professionals verified?</h3>
                <p className="text-[#666666]">
                  We verify identity, conduct background checks, validate credentials and licenses, and collect reviews
                  from past clients to ensure professionals meet our quality standards.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">What if I'm not satisfied with the work?</h3>
                <p className="text-[#666666]">
                  We offer a satisfaction guarantee. If you're not happy with the work, you can request revisions or
                  contact our support team to help resolve any issues before releasing payment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">Can I hire the same professional again?</h3>
                <p className="text-[#666666]">
                  You can save professionals to your favorites and hire them directly for future jobs, making it even
                  easier to work with people you trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Find Your Perfect Professional?
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Join thousands of satisfied clients who have found skilled professionals through Revit
            </p>
            <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
              <Link href="/signup/client">Sign Up as a Client</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

