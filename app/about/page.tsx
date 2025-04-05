import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Users, Shield, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333]">About Revit</h1>
                <p className="text-lg text-[#666666] max-w-md">
                Hi, I’m Art, the founder and developer of Revit — a platform born out of personal frustration and a desire to make life easier for both skilled professionals and the people who need their services.
                </p>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Revit team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Our story section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-[#333333] mb-6">Our Story</h2>
              <div className="space-y-4 text-[#666666]">
                <p>
                Back in 2023, I hit a wall. I needed help — a reliable plumber one week, an electrician the next — and every time, the process felt like a gamble. Endless searching, sketchy listings, no guarantees. I realized I wasn’t alone. Friends and family had the same experience: finding trustworthy skilled help was harder than it should be.
                </p>
                <p>
                That’s when I decided to build something better.
                </p>
                <p>
                Revit started as a small idea: connect real people with verified professionals in a way that feels simple, secure, and human. What began as a personal mission has grown into a thriving platform helping thousands of people across the country find and hire skilled tradespeople with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our mission section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Mission</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              I’m on a mission to reshape how we find skilled help — making it as easy and reliable as ordering food online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Connect</h3>
                <p className="text-[#666666]">
                I believe in creating meaningful connections between professionals and the people who need them.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Protect</h3>
                <p className="text-[#666666]">
                Every Professionals on the platform goes through a verification process to ensure safety and quality.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all">
                <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#00A6A6]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">Empower</h3>
                <p className="text-[#666666]">
                I want to help skilled workers grow their businesses and help clients feel confident their jobs will be done right.
                </p>
              </div>
            </div>
          </div>
        </section>

{/* Team section */}
<section className="py-16 px-4 md:px-6">
  <div className="container mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-[#333333] mb-4">Founder</h2>
      <p className="text-lg text-[#666666] max-w-2xl mx-auto">
        Meet the person behind Revit — passionate about transforming the service industry through technology and trust.
      </p>
    </div>

    <div className="flex justify-center">
      <div className="text-center">
        <div className="relative h-64 w-64 mx-auto mb-4 rounded-xl overflow-hidden">
          <Image
            src="/your-photo.jpg" // Replace with your actual image path
            alt="Founder photo"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-[#333333]">Art Gonzales</h3>
        <p className="text-[#666666]">Founder & Developer</p>
      </div>
    </div>
  </div>
</section>


        {/* Values section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Values</h2>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              These are the values I live by and built Revit around:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Trust & Transparency</h3>
                  <p className="text-[#666666]">
                    We believe in building trust through transparent practices, honest communication, and reliable
                    service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Quality & Excellence</h3>
                  <p className="text-[#666666]">
                    We're committed to maintaining the highest standards of quality in every aspect of our platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Community & Support</h3>
                  <p className="text-[#666666]">
                    We foster a supportive community where professionals can thrive and clients feel valued.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Innovation & Growth</h3>
                  <p className="text-[#666666]">
                    We continuously innovate to improve our platform and create new opportunities for growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Join the Revit Community</h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Be part of our mission to transform how people find and hire skilled professionals
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

