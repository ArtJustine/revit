import Image from "next/image"
import Link from "next/link"
import {
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Truck,
  Scissors,
  Laptop,
  Utensils,
  Leaf,
  Brush,
  Camera,
  Music,
  Shirt,
  Dog,
  Stethoscope,
  Briefcase,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryCard } from "@/components/category-card"
import { AnimatedSection } from "@/components/animated-section"

// Define all categories with their icons
const allCategories = [
  { title: "Plumbers", icon: <Wrench className="h-6 w-6" />, count: "250+ Professionals", group: "Home Services" },
  { title: "Electricians", icon: <Zap className="h-6 w-6" />, count: "320+ Professionals", group: "Home Services" },
  { title: "Carpenters", icon: <Hammer className="h-6 w-6" />, count: "180+ Professionals", group: "Home Services" },
  { title: "Painters", icon: <PaintBucket className="h-6 w-6" />, count: "210+ Professionals", group: "Home Services" },
  { title: "Mechanics", icon: <Truck className="h-6 w-6" />, count: "195+ Professionals", group: "Automotive" },
  { title: "Barbers", icon: <Scissors className="h-6 w-6" />, count: "160+ Professionals", group: "Personal Care" },
  { title: "IT Support", icon: <Laptop className="h-6 w-6" />, count: "230+ Professionals", group: "Technology" },
  { title: "Chefs", icon: <Utensils className="h-6 w-6" />, count: "140+ Professionals", group: "Food & Hospitality" },
  { title: "Gardeners", icon: <Leaf className="h-6 w-6" />, count: "175+ Professionals", group: "Home Services" },
  { title: "Cleaners", icon: <Brush className="h-6 w-6" />, count: "290+ Professionals", group: "Home Services" },
  { title: "Photographers", icon: <Camera className="h-6 w-6" />, count: "120+ Professionals", group: "Creative" },
  { title: "Musicians", icon: <Music className="h-6 w-6" />, count: "95+ Professionals", group: "Creative" },
  { title: "Tailors", icon: <Shirt className="h-6 w-6" />, count: "85+ Professionals", group: "Personal Care" },
  { title: "Pet Sitters", icon: <Dog className="h-6 w-6" />, count: "110+ Professionals", group: "Pet Care" },
  { title: "Tutors", icon: <Briefcase className="h-6 w-6" />, count: "200+ Professionals", group: "Education" },
  { title: "Nurses", icon: <Stethoscope className="h-6 w-6" />, count: "150+ Professionals", group: "Healthcare" },
]

// Group categories by their group property
const groupedCategories = allCategories.reduce(
  (acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = []
    }
    acc[category.group].push(category)
    return acc
  },
  {} as Record<string, typeof allCategories>,
)

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333] mb-6">Browse Categories</h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto mb-8">
                Find skilled professionals across a wide range of categories to help with any job, big or small
              </p>
              <div className="max-w-md mx-auto relative">
                <Input type="text" placeholder="Search for a service..." className="pl-10 pr-4 py-6 rounded-full" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories by group */}
        {Object.entries(groupedCategories).map(([group, categories], groupIndex) => (
          <section key={group} className={`py-16 px-4 md:px-6 ${groupIndex % 2 === 0 ? "bg-white" : "bg-[#E0E0E0]"}`}>
            <div className="container mx-auto">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">{group}</h2>
              </AnimatedSection>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category, index) => (
                  <AnimatedSection key={category.title} animation="fade-up" delay={index * 50}>
                    <CategoryCard title={category.title} icon={category.icon} count={category.count} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Popular services section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Popular Services</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  These are the most requested services on our platform
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Plumbing services"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-2">Plumbing Services</h3>
                    <p className="text-[#666666] mb-4">
                      From fixing leaks to installing new fixtures, our verified plumbers can handle it all.
                    </p>
                    <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                      <Link href="/categories/plumbers">Find a Plumber</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Electrical services"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-2">Electrical Services</h3>
                    <p className="text-[#666666] mb-4">
                      Professional electricians for installations, repairs, and electrical emergencies.
                    </p>
                    <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                      <Link href="/categories/electricians">Find an Electrician</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Cleaning services"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-2">Cleaning Services</h3>
                    <p className="text-[#666666] mb-4">
                      Professional cleaning for homes and offices, including deep cleaning and regular maintenance.
                    </p>
                    <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                      <Link href="/categories/cleaners">Find a Cleaner</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">How to Hire a Professional</h2>
                <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                  Finding and hiring the right professional is easy with Revit
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 text-center">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Browse Categories</h3>
                  <p className="text-[#666666]">
                    Find the category that matches your needs and explore available professionals.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 text-center">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Compare Profiles</h3>
                  <p className="text-[#666666]">
                    Read reviews, check qualifications, and compare rates to find the right match.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="bg-[#E0E0E0] rounded-xl p-6 text-center">
                  <div className="bg-[#00A6A6] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">Book & Pay</h3>
                  <p className="text-[#666666]">
                    Schedule the service and pay securely through our platform when the job is done.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4 md:px-6 bg-[#00A6A6]">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
              Post a job and let professionals come to you with custom quotes
            </p>
            <Button asChild className="bg-white text-[#00A6A6] hover:bg-gray-100">
              <Link href="/post-job">Post a Job</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

