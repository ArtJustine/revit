import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { AutoScrollingCategories } from "@/components/auto-scrolling-categories"
import { AppDownloadSection } from "@/components/app-download-section"
import { AnimatedSection } from "@/components/animated-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* How it works section */}
        <section className="bg-white py-8 md:py-16 px-4 md:px-6 mb-8 md:mb-0">
  <div className="container mx-auto">
    
      <div className="text-center mb-6">
      <h2 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
          How Revit Works
      </h2>
      <p className="text-lg text-[#666666] max-w-2xl mx-auto">
          Connect with skilled professionals in just a few simple steps
      </p>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatedSection animation="fade-up" delay={100}>
        <div className="relative rounded-xl overflow-hidden h-full">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=300&width=400&text=Post+Job"
              alt="Post your job background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div
            className="relative z-10 p-6 text-center bg-cover bg-center backdrop-blur-sm h-full flex flex-col"
            style={{ backgroundImage: "url('/post-your-job.webp')" }}
          >
            {/* White overlay with reduced opacity */}
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
            
              <h3 className="text-xl font-bold text-white mb-2">Post Your Job</h3>
              <p className="text-white">
              Describe what you need done, when you need it, and your location.
              </p>
            </div>
          </div>
        </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
        <div className="relative rounded-xl overflow-hidden h-full">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=300&width=400&text=Compare"
              alt="Compare professionals background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div
            className="relative z-10 p-6 text-center bg-cover bg-center backdrop-blur-sm h-full flex flex-col"
            style={{ backgroundImage: "url('/compare-professionals.webp')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Compare Professionals</h3>
              <p className="text-white">
              Browse profiles, reviews, and quotes from interested professionals.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" delay={300}>
      <div className="relative rounded-xl overflow-hidden h-full">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=300&width=400&text=Hire"
              alt="Hire and get it done background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div
            className="relative z-10 p-6 text-center bg-cover bg-center backdrop-blur-sm h-full flex flex-col"
            style={{ backgroundImage: "url('/hire.webp')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Hire & Get It Done</h3>
              <p className="text-white">
              Choose the right professional and get your job done with confidence.
              </p>
              </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
</section>


        {/* Categories section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl mb-4">
                Find Skilled Professionals
              </h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Browse through our categories of skilled workers ready to help
              </p>
            </div>

            <AutoScrollingCategories />

            <div className="text-center mt-10">
              <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                <Link href="/categories">
                  View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-4 md:px-6 bg-cover bg-center relative" style={{ backgroundImage: 'url(/plumber-hero.webp)' }}>
          {/* White overlay */}
          <div className="absolute inset-0 bg-white opacity-70"></div>
  
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl mb-4">Why Choose Revit</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                We make finding and hiring skilled professionals simple, secure, and stress-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                  title="Verified Professionals"
                  description="Every worker on our platform is thoroughly vetted and background-checked for your peace of mind."
                  icon={<CheckCircle className="h-6 w-6 text-[#00A6A6]" />}
              />
      <FeatureCard
        title="Secure Payments"
        description="Pay only when the job is done to your satisfaction with our secure payment system."
        icon={<CheckCircle className="h-6 w-6 text-[#00A6A6]" />}
      />
      <FeatureCard
        title="24/7 Support"
        description="Our customer service team is available around the clock to assist with any issues."
        icon={<CheckCircle className="h-6 w-6 text-[#00A6A6]" />}
      />
    </div>
  </div>
</section>

        {/* Testimonials section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Don't just take our word for it - hear from some of our satisfied users
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              <AnimatedSection animation="slide-in-left" delay={100}>
                <TestimonialCard
                  quote="I found an amazing electrician through Revit who fixed my wiring issues in just a few hours. The whole process was so simple!"
                  author="Sarah Johnson"
                  role="Homeowner"
                />
              </AnimatedSection>

              <AnimatedSection animation="zoom-in" delay={200}>
                <TestimonialCard
                  quote="As a plumber, Revit has helped me connect with new clients and grow my business. The platform is easy to use and professional."
                  author="Michael Rodriguez"
                  role="Professional Plumber"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 relative">
          <div className="absolute inset-0 z-0">
            <Image src="/auto-detaling.webp" alt="Auto detailing background" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#00A6A6] opacity-80 z-10"></div>
          <div className="container mx-auto text-center relative z-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Join thousands of satisfied users who have found the perfect professional for their needs
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

        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  )
}
