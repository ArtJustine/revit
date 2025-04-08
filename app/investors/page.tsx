import Image from "next/image"
import Link from "next/link"
import { BarChart, TrendingUp, DollarSign, Users, Globe, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"

export default function InvestorsPage() {
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
                  Invest in the Future of Service Marketplaces
                </h1>
                <p className="text-lg text-[#666666] max-w-md">
                  Join us in revolutionizing how people find and hire skilled professionals for any job, big or small.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="#investment-opportunities">Explore Investment Opportunities</Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Investment growth chart"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why invest section - Fixed card heights and added bottom padding */}
        <section className="py-16 px-4 md:px-6 pb-24">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Why Invest in Revit</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Revit represents a compelling investment opportunity in the growing service marketplace sector
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 h-[250px] flex flex-col">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Rapid Growth</h3>
                  <p className="text-[#666666] flex-grow">
                    200% year-over-year growth in user base and transaction volume, with strong retention metrics.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 h-[250px] flex flex-col">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Massive Market</h3>
                  <p className="text-[#666666] flex-grow">
                    Addressing a $500B+ global market for skilled trade services with significant room for digital
                    transformation.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 h-[250px] flex flex-col">
                  <div className="bg-[#00A6A6]/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-[#00A6A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Proven Model</h3>
                  <p className="text-[#666666] flex-grow">
                    Established business model with multiple revenue streams and clear path to profitability.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Market opportunity section - Fix image z-index and add bottom padding */}
        <section className="py-16 px-4 md:px-6 pb-24 bg-[#E0E0E0]" id="investment-opportunities">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Market Opportunity</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  The skilled service marketplace represents a massive opportunity for digital disruption
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-white p-4 rounded-xl">
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Market growth chart"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="space-y-6 bg-[#E0E0E0] p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-[#333333]">A Growing Industry</h3>
                  <p className="text-[#666666]">
                    The skilled trades industry is experiencing significant growth, driven by:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <BarChart className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Aging Infrastructure</h4>
                        <p className="text-[#666666]">
                          Increasing demand for maintenance and repair services across residential and commercial
                          properties.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Labor Shortage</h4>
                        <p className="text-[#666666]">
                          Critical shortage of skilled workers creating premium pricing opportunities for qualified
                          professionals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <DollarSign className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Digital Transformation</h4>
                        <p className="text-[#666666]">
                          Only 10% of skilled trade services are currently booked online, representing massive growth
                          potential.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Business model section - Fix image z-index and add bottom padding */}
        <section className="py-16 px-4 md:px-6 pb-24">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Business Model</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Revit has developed a sustainable business model with multiple revenue streams
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-8">
              <AnimatedSection animation="fade-up" delay={100} className="order-2 md:order-1">
                <div className="space-y-6 bg-white p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-[#333333]">Revenue Streams</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <DollarSign className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Service Fees</h4>
                        <p className="text-[#666666]">
                          15% commission on all jobs booked through the platform, generating predictable recurring
                          revenue.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <DollarSign className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Premium Subscriptions</h4>
                        <p className="text-[#666666]">
                          Monthly subscription options for professionals to access premium features and increased
                          visibility.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <DollarSign className="h-6 w-6 text-[#00A6A6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#333333]">Financing & Insurance</h4>
                        <p className="text-[#666666]">
                          Revenue share from financing options for larger projects and insurance products for service
                          guarantees.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200} className="order-1 md:order-2">
                <div className="bg-white p-4 rounded-xl">
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Business model diagram"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Traction section - Fixed card heights and added bottom padding */}
        <section className="py-16 px-4 md:px-6 pb-24 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Our Traction</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Revit has demonstrated strong growth and market validation
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-white rounded-xl p-6 text-center h-[150px] flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-[#00A6A6] mb-2">50K+</h3>
                  <p className="text-[#666666]">Registered Professionals</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-white rounded-xl p-6 text-center h-[150px] flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-[#00A6A6] mb-2">100K+</h3>
                  <p className="text-[#666666]">Active Clients</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-white rounded-xl p-6 text-center h-[150px] flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-[#00A6A6] mb-2">$25M+</h3>
                  <p className="text-[#666666]">Jobs Completed</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={400}>
                <div className="bg-white rounded-xl p-6 text-center h-[150px] flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-[#00A6A6] mb-2">4.8/5</h3>
                  <p className="text-[#666666]">Average Rating</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Team section - Updated to show just Art Gonzales */}
        <section className="py-16 px-4 md:px-6 pb-24">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Leadership Team</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">Meet the visionary behind Revit</p>
              </div>
            </AnimatedSection>

            <div className="max-w-md mx-auto mb-8">
              <AnimatedSection animation="fade-up">
                <div className="bg-[#E0E0E0] rounded-xl p-6 flex flex-col">
                  <div className="relative h-64 w-64 mx-auto mb-4 rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Art+Gonzales"
                      alt="Art Gonzales"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] text-center">Art Gonzales</h3>
                  <p className="text-[#666666] text-center mb-4">Founder & Developer</p>
                  <p className="text-[#666666]">
                    Experienced developer and entrepreneur with a passion for creating innovative solutions that connect
                    skilled professionals with clients. Art brings technical expertise and a vision for transforming the
                    service marketplace industry.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Investment opportunities section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">Investment Opportunities</h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              We're currently raising our Series B round to accelerate growth and expand into new markets
            </p>
            <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100 relative z-20">
              <Link href="/contact">Contact Our Investment Team</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
