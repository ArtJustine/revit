import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Clock, Shield, Star, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333]">How Revit Works</h1>
                <p className="text-lg text-[#666666] max-w-md">
                  Our platform makes it easy to connect skilled professionals with clients who need their services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href="/signup/client">I Need a Professional</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                  >
                    <Link href="/signup/worker">I'm a Professional</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="How Revit works"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Clients section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">For Clients</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Finding the right professional for your job is simple with Revit
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedSection animation="slide-in-left">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Post a job" fill className="object-cover" />
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-right">
                <div className="space-y-6">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333]">Post Your Job</h3>
                  <p className="text-[#666666]">
                    Describe what you need done, when you need it, and your location. Be as specific as possible to
                    attract the right professionals.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Specify the type of service you need</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Set your budget range</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Choose your preferred timeline</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedSection animation="slide-in-right" className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333]">Compare Professionals</h3>
                  <p className="text-[#666666]">
                    Browse profiles, reviews, and quotes from interested professionals. Our verification system ensures
                    you're only dealing with qualified experts.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">View detailed professional profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Read verified customer reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Compare quotes and timelines</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-left" className="order-1 md:order-2">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Compare professionals"
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedSection animation="slide-in-left">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Hire and pay" fill className="object-cover" />
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-right">
                <div className="space-y-6">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333]">Hire & Pay Securely</h3>
                  <p className="text-[#666666]">
                    Choose the right professional and pay securely through our platform. Your payment is held in escrow
                    until the job is completed to your satisfaction.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Secure payment protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Only pay when you're satisfied</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Multiple payment options available</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="slide-in-right" className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333]">Leave a Review</h3>
                  <p className="text-[#666666]">
                    After the job is complete, share your experience to help other clients find great professionals.
                    Your feedback helps maintain our high-quality standards.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Rate your experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Share detailed feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#00A6A6] mt-0.5 flex-shrink-0" />
                      <span className="text-[#666666]">Help other clients make informed decisions</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-left" className="order-1 md:order-2">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Leave a review"
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>

            <div className="text-center mt-12">
              <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                <Link href="/client-benefits">Learn More About Client Benefits</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Professionals section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">For Professionals</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Grow your business and find new clients with Revit
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">Create Your Profile</h3>
                  <p className="text-sm text-[#666666]">
                    Showcase your skills, experience, and portfolio to stand out to potential clients.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">Get Verified</h3>
                  <p className="text-sm text-[#666666]">
                    Complete our verification process to build trust with potential clients.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">Bid on Jobs</h3>
                  <p className="text-sm text-[#666666]">
                    Browse available jobs in your area and submit quotes to interested clients.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={400}>
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <div className="absolute -top-4 -left-4 bg-[#00A6A6] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">Complete Jobs</h3>
                  <p className="text-sm text-[#666666]">
                    Deliver quality work to earn great reviews and build your reputation on the platform.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="text-center">
              <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                <Link href="/professional-benefits">Learn More About Professional Benefits</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Platform features section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Platform Features</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Revit offers a comprehensive set of tools to make the service experience seamless
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-[#E0E0E0] rounded-xl p-6">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Secure Messaging</h3>
                  <p className="text-[#666666]">
                    Communicate directly with professionals or clients through our secure messaging system. All
                    conversations are saved for reference.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-[#E0E0E0] rounded-xl p-6">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Secure Payments</h3>
                  <p className="text-[#666666]">
                    Our escrow payment system protects both clients and professionals. Funds are only released when the
                    job is completed satisfactorily.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-[#E0E0E0] rounded-xl p-6">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Review System</h3>
                  <p className="text-[#666666]">
                    Our transparent review system helps maintain quality standards. All reviews are verified to ensure
                    they come from real clients.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Get answers to common questions about using Revit
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">How much does it cost to use Revit?</h3>
                  <p className="text-[#666666]">
                    It's free to sign up and post jobs on Revit. For clients, we charge a small service fee only when
                    you hire a professional. For professionals, we take a small commission from each completed job.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">How are professionals verified?</h3>
                  <p className="text-[#666666]">
                    We verify identity, conduct background checks, validate credentials and licenses, and collect
                    reviews from past clients to ensure professionals meet our quality standards.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">What if I'm not satisfied with the work?</h3>
                  <p className="text-[#666666]">
                    We offer a satisfaction guarantee. If you're not happy with the work, you can request revisions or
                    contact our support team to help resolve any issues before releasing payment.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Join thousands of users who are already using Revit to connect with skilled professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
                <Link href="/signup/client">I Need a Professional</Link>
              </Button>
              <Button asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <Link href="/signup/worker">I'm a Professional</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

