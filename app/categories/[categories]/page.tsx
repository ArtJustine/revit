"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, MapPin, Briefcase, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProfessionalsByCategory, type UserProfile } from "@/lib/firebase/utils"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [professionals, setProfessionals] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        setLoading(true)
        const data = await getProfessionalsByCategory(category)
        setProfessionals(data)
      } catch (err) {
        console.error("Error fetching professionals:", err)
        setError("Failed to load professionals. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionals()
  }, [category])

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333] mb-6">
                {formatCategoryName(category)}
              </h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Find skilled {category} professionals ready to help with your projects
              </p>
            </motion.div>
          </div>
        </section>

        {/* Professionals section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6]"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-8">{error}</div>
            ) : professionals.length === 0 ? (
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-[#333333] mb-4">No Professionals Found</h2>
                <p className="text-[#666666] mb-6">
                  We couldn't find any {category} professionals at the moment. Please check back later or browse other
                  categories.
                </p>
                <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                  <Link href="/categories">Browse All Categories</Link>
                </Button>
              </div>
            ) : (
              <>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-[#333333] mb-8"
                >
                  Available {formatCategoryName(category)} Professionals
                </motion.h2>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {professionals.map((professional) => (
                    <motion.div
                      key={professional.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={professional.profileImage || "/placeholder.svg?height=200&width=400"}
                          alt={professional.displayName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#333333]">{professional.displayName}</h3>
                            <p className="text-[#666666] capitalize">{professional.profession}</p>
                          </div>
                          <div className="flex items-center bg-[#00A6A6]/10 px-2 py-1 rounded-md">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-[#333333] font-medium">{professional.rating || 5.0}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {professional.location && (
                            <div className="flex items-center text-sm text-[#666666]">
                              <MapPin className="h-4 w-4 mr-2 text-[#00A6A6]" />
                              <span>{professional.location}</span>
                            </div>
                          )}
                          <div className="flex items-center text-sm text-[#666666]">
                            <Briefcase className="h-4 w-4 mr-2 text-[#00A6A6]" />
                            <span>{professional.experience || "Experienced"}</span>
                          </div>
                          <div className="flex items-center text-sm text-[#666666]">
                            <Star className="h-4 w-4 mr-2 text-[#00A6A6]" />
                            <span>{professional.completedJobs || 0} jobs completed</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white w-full">
                            <Link href={`/professionals/${professional.id}`}>
                              View Profile <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white w-full"
                          >
                            <Link href={`/contact-professional/${professional.id}`}>Contact</Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Need a {formatCategoryName(category)} Professional?
              </h2>
              <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                Post a job and let qualified {category} professionals come to you with custom quotes
              </p>
              <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
                <Link href="/post-job">Post a Job</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

