"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, MapPin, Briefcase, Calendar, CheckCircle, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getUserProfile, type UserProfile } from "@/lib/firebase/utils"

export default function ProfessionalProfilePage() {
  const params = useParams()
  const professionalId = params.id as string
  const [professional, setProfessional] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProfessionalProfile() {
      try {
        setLoading(true)
        const data = await getUserProfile(professionalId)
        setProfessional(data)
      } catch (err) {
        console.error("Error fetching professional profile:", err)
        setError("Failed to load professional profile. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionalProfile()
  }, [professionalId])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service! Very professional and completed the job quickly and efficiently.",
    },
    {
      id: 2,
      author: "Michael Brown",
      rating: 4,
      date: "1 month ago",
      comment: "Good work overall. Arrived on time and did a thorough job. Would hire again.",
    },
    {
      id: 3,
      author: "Emily Davis",
      rating: 5,
      date: "2 months ago",
      comment: "Fantastic experience from start to finish. Very knowledgeable and helpful.",
    },
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !professional) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-16 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-[#333333] mb-4">Profile Not Found</h1>
            <p className="text-[#666666] mb-6">
              {error || "This professional profile does not exist or has been removed."}
            </p>
            <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            >
              <div className="md:col-span-1">
                <div className="relative h-64 w-64 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={professional.profileImage || "/placeholder.svg?height=300&width=300"}
                    alt={professional.displayName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">{professional.displayName}</h1>
                <p className="text-xl text-[#666666] capitalize mb-4">{professional.profession}</p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center bg-white px-3 py-1 rounded-full">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">
                      {professional.rating || 5.0} ({reviews.length} reviews)
                    </span>
                  </div>

                  {professional.location && (
                    <div className="flex items-center bg-white px-3 py-1 rounded-full">
                      <MapPin className="h-5 w-5 text-[#00A6A6] mr-1" />
                      <span>{professional.location}</span>
                    </div>
                  )}

                  <div className="flex items-center bg-white px-3 py-1 rounded-full">
                    <Briefcase className="h-5 w-5 text-[#00A6A6] mr-1" />
                    <span>{professional.experience || "Experienced"}</span>
                  </div>

                  <div className="flex items-center bg-white px-3 py-1 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#00A6A6] mr-1" />
                    <span>{professional.completedJobs || 0} Jobs Completed</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                    <Link href={`/contact-professional/${professional.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" /> Contact Me
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white"
                  >
                    <Link href="/post-job">Hire Me</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[#333333] mb-6">About Me</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-[#666666] whitespace-pre-line">
                    {professional.bio ||
                      `Hi, I'm ${professional.displayName}, a professional ${professional.profession}. I have ${professional.experience || "extensive"} experience in my field and take pride in delivering high-quality work. I'm dedicated to providing excellent service and ensuring customer satisfaction.

I specialize in all aspects of ${professional.profession} work, from small repairs to large projects. My goal is to provide reliable, efficient, and professional service for all your ${professional.profession} needs.

Feel free to contact me for any questions or to discuss your project requirements.`}
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-[#333333] mt-12 mb-6">Reviews</h2>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div key={review.id} variants={item} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-bold text-[#333333]">{review.author}</h3>
                          <p className="text-sm text-[#666666]">{review.date}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#666666]">{review.comment}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-[#333333] mb-6">Details</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-[#333333] mb-1">Services</h3>
                      <ul className="list-disc list-inside text-[#666666] space-y-1">
                        {professional.services ? (
                          professional.services.map((service: string, index: number) => <li key={index}>{service}</li>)
                        ) : (
                          <>
                            <li>General {professional.profession} services</li>
                            <li>Repairs and maintenance</li>
                            <li>Installations</li>
                            <li>Consultations</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-[#333333] mb-1">Availability</h3>
                      <div className="flex items-center text-[#666666]">
                        <Calendar className="h-4 w-4 mr-2 text-[#00A6A6]" />
                        <span>Monday - Friday, 9AM - 5PM</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-[#333333] mb-1">Service Area</h3>
                      <div className="flex items-center text-[#666666]">
                        <MapPin className="h-4 w-4 mr-2 text-[#00A6A6]" />
                        <span>{professional.location || "Local area"} (25 mile radius)</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-[#333333] mb-1">Member Since</h3>
                      <p className="text-[#666666]">
                        {professional.createdAt
                          ? new Date(professional.createdAt.seconds * 1000).toLocaleDateString()
                          : "Recently joined"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Ready to Hire {professional.displayName}?
              </h2>
              <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                Get your project started with this skilled professional today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
                  <Link href="/post-job">Post a Job</Link>
                </Button>
                <Button asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  <Link href={`/contact-professional/${professional.id}`}>Contact Directly</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

