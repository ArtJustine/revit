import Image from "next/image"
import Link from "next/link"
import { CheckCircle, DollarSign, Calendar, Users, BarChart, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProfessionalBenefitsPage() {
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
                  Grow Your Business with Revit
                </h1>
                <p className="text-lg text-[#666666] max-w-md">
                  Join thousands of skilled professionals who are finding new clients and growing their business through
                  Revit.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/signup/worker">Sign Up as a Professional</Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Professional worker"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key benefits section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Benefits for Professionals</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Revit helps you find new clients, manage your schedule, and grow your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Find New Clients</h3>
                <p className="text-[#666666]">
                  Connect with clients looking for your specific skills and services in your area, without spending on
                  advertising.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Secure Payments</h3>
                <p className="text-[#666666]">
                  Get paid on time, every time. Our secure payment system ensures you receive payment promptly when the
                  job is done.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Flexible Schedule</h3>
                <p className="text-[#666666]">
                  Work when you want. Choose jobs that fit your schedule and skill set, giving you complete control over
                  your workload.
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
                Getting started as a professional on Revit is simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Create Your Profile</h3>
                <p className="text-sm text-[#666666]">
                  Showcase your skills, experience, and portfolio to stand out to potential clients.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Get Verified</h3>
                <p className="text-sm text-[#666666]">
                  Complete our verification process to build trust with potential clients.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Bid on Jobs</h3>
                <p className="text-sm text-[#666666]">
                  Browse available jobs in your area and submit quotes to interested clients.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">Build Your Reputation</h3>
                <p className="text-sm text-[#666666]">
                  Deliver quality work to earn great reviews and attract more clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Growth tools section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Tools to Grow Your Business</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Revit provides you with everything you need to manage and grow your professional service business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart className="h-6 w-6 text-[#00A6A6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Business Analytics</h3>
                  <p className="text-[#666666]">
                    Track your performance, earnings, and client satisfaction with detailed analytics and reporting
                    tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-[#00A6A6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Scheduling Tools</h3>
                  <p className="text-[#666666]">
                    Manage your appointments, set your availability, and avoid scheduling conflicts with our easy-to-use
                    calendar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-[#00A6A6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Client Management</h3>
                  <p className="text-[#666666]">
                    Keep track of your clients, their preferences, and job history to provide personalized service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-[#00A6A6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Invoicing & Payments</h3>
                  <p className="text-[#666666]">
                    Create professional invoices and receive payments quickly and securely through our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Success Stories</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Hear from professionals who have grown their business with Revit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Professional" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">Michael Rodriguez</h4>
                    <p className="text-sm text-[#666666]">Plumber, 3 years on Revit</p>
                  </div>
                </div>
                <p className="text-[#666666]">
                  "Since joining Revit, I've been able to grow my client base by over 200%. The platform handles all the
                  marketing and payment processing, allowing me to focus on what I do best - plumbing. I now have more
                  work than I can handle!"
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Professional" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">Jennifer Lee</h4>
                    <p className="text-sm text-[#666666]">Electrician, 2 years on Revit</p>
                  </div>
                </div>
                <p className="text-[#666666]">
                  "As a female electrician, I sometimes faced challenges getting new clients. Revit has leveled the
                  playing field by letting my reviews and skills speak for themselves. I've built a loyal client base
                  and increased my income by 40%."
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Professional" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333]">Marcus Johnson</h4>
                    <p className="text-sm text-[#666666]">Carpenter, 1 year on Revit</p>
                  </div>
                </div>
                <p className="text-[#666666]">
                  "I started my carpentry business last year and was struggling to find clients. Revit changed
                  everything. The verification process gave clients confidence in my skills, and the secure payment
                  system ensures I get paid for every job."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Get answers to common questions about working as a professional on Revit
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">How much does it cost to join Revit?</h3>
                <p className="text-[#666666]">
                  It's free to create a profile and browse available jobs. We charge a small service fee only when you
                  complete a job and get paid, ensuring our interests are aligned with yours.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">What kind of verification is required?</h3>
                <p className="text-[#666666]">
                  We verify your identity, professional credentials, and conduct background checks to ensure client
                  safety and build trust. The process typically takes 1-3 business days.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">How quickly will I get paid?</h3>
                <p className="text-[#666666]">
                  Once a job is marked as complete and the client confirms satisfaction, payment is released to your
                  account within 1-2 business days. You can withdraw funds to your bank account at any time.
                </p>
              </div>

              <div className="bg-[#E0E0E0] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#333333] mb-2">Can I set my own rates?</h3>
                <p className="text-[#666666]">
                  You have complete control over your pricing. You can set hourly rates or fixed prices for specific
                  services, and adjust them at any time based on your experience and market demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Join thousands of professionals who are finding new clients and increasing their income with Revit
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

