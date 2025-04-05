import Image from "next/image"
import Link from "next/link"
import { CheckCircle, AlertCircle, Shield, Award, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProfessionalExpectationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333]">
                  What to Expect as a Revit Professional
                </h1>
                <p className="text-lg text-[#666666] max-w-md">
                  Learn about our standards, processes, and what it takes to succeed on the Revit platform.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/signup/worker">Join as a Professional</Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Professional at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Standards section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Professional Standards</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                At Revit, we maintain high standards to ensure quality service for clients and success for professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Quality Workmanship</h3>
                  <p className="text-[#666666]">
                    We expect all professionals to deliver high-quality work that meets or exceeds industry standards
                    and client expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Professionalism</h3>
                  <p className="text-[#666666]">
                    Maintain professional conduct in all client interactions, including punctuality, clear
                    communication, and respectful behavior.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Reliability</h3>
                  <p className="text-[#666666]">
                    Honor commitments, arrive on time, and complete work within agreed-upon timeframes to build trust
                    with clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Transparency</h3>
                  <p className="text-[#666666]">
                    Provide clear, upfront pricing and communicate openly about any challenges or changes that arise
                    during a job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification process section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Verification Process</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                To maintain trust and safety, all professionals go through a thorough verification process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Identity Verification</h3>
                <p className="text-sm text-[#666666]">
                  We verify your identity through government-issued ID and address proof to ensure platform security.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Credential Check</h3>
                <p className="text-sm text-[#666666]">
                  We validate your professional licenses, certifications, and qualifications relevant to your trade.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Background Check</h3>
                <p className="text-sm text-[#666666]">
                  We conduct background checks to ensure client safety and maintain platform integrity.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Skills Assessment</h3>
                <p className="text-sm text-[#666666]">
                  For certain trades, we may require proof of work or a skills assessment to verify expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success factors section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Keys to Success on Revit</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Tips from our top-performing professionals on how to thrive on the platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Complete Your Profile</h3>
                <p className="text-[#666666]">
                  Professionals with complete profiles including photos, detailed descriptions of services, and
                  portfolio examples receive 3x more job requests.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Add high-quality photos of your work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">List all your skills and specialties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Highlight your experience and credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Respond Quickly</h3>
                <p className="text-[#666666]">
                  Professionals who respond to job requests within 1 hour are 50% more likely to be hired than those who
                  take longer.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Enable mobile notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Set aside time each day to check for new jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Provide detailed quotes promptly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Deliver Excellence</h3>
                <p className="text-[#666666]">
                  Professionals with 4.8+ star ratings receive 4x more job requests and can charge premium rates for
                  their services.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Go above and beyond client expectations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Communicate clearly throughout the job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#666666]">Ask satisfied clients for reviews</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Professional Support</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                We're committed to helping you succeed on our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-[#333333] mb-4">Dedicated Support Team</h3>
                <p className="text-[#666666] mb-4">
                  Our professional support team is available 7 days a week to help with any questions or issues.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-[#333333] mb-4">Professional Resources</h3>
                <p className="text-[#666666] mb-4">
                  Access guides, tutorials, and business tips to help you maximize your success on Revit.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                >
                  <Link href="/resources">View Resources</Link>
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-[#333333] mb-4">Professional Community</h3>
                <p className="text-[#666666] mb-4">
                  Connect with other professionals to share tips, advice, and best practices.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Start Your Professional Journey?
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Join thousands of skilled professionals who are growing their business with Revit
            </p>
            <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
              <Link href="/signup/worker">Sign Up as a Professional</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

