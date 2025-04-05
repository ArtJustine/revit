import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How to Find the Right Plumber for Your Home Renovation",
    excerpt:
      "Renovating your home can be exciting, but finding the right professional is crucial. Learn how to vet and hire the perfect plumber for your project.",
    author: "Sarah Johnson",
    date: "April 2, 2025",
    readTime: "5 min read",
    category: "Home Improvement",
    image: "/placeholder.svg?height=400&width=600",
    slug: "find-right-plumber-home-renovation",
  },
  {
    id: 2,
    title: "5 Questions to Ask Before Hiring an Electrician",
    excerpt:
      "Electrical work requires expertise and precision. Before you hire an electrician, make sure to ask these 5 essential questions to ensure quality and safety.",
    author: "Michael Rodriguez",
    date: "March 28, 2025",
    readTime: "4 min read",
    category: "Safety",
    image: "/placeholder.svg?height=400&width=600",
    slug: "questions-before-hiring-electrician",
  },
  {
    id: 3,
    title: "Growing Your Business as a Professional on Revit",
    excerpt:
      "Are you a skilled professional looking to expand your client base? Discover proven strategies to grow your business using the Revit platform.",
    author: "David Chen",
    date: "March 25, 2025",
    readTime: "7 min read",
    category: "Business Growth",
    image: "/placeholder.svg?height=400&width=600",
    slug: "growing-business-professional-revit",
  },
  {
    id: 4,
    title: "Home Maintenance Tasks You Shouldn't Ignore",
    excerpt:
      "Regular home maintenance prevents costly repairs down the line. Learn which essential tasks you should never put off and when to call a professional.",
    author: "Emma Wilson",
    date: "March 20, 2025",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/placeholder.svg?height=400&width=600",
    slug: "home-maintenance-tasks-not-ignore",
  },
  {
    id: 5,
    title: "How to Budget for Home Improvement Projects",
    excerpt:
      "Planning a home improvement project? Learn how to create a realistic budget, account for unexpected costs, and get the most value from professional services.",
    author: "James Taylor",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Finance",
    image: "/placeholder.svg?height=400&width=600",
    slug: "budget-home-improvement-projects",
  },
  {
    id: 6,
    title: "The Benefits of Hiring Local Professionals",
    excerpt:
      "When it comes to home services, hiring locally offers numerous advantages. Discover why choosing local professionals can lead to better results and stronger communities.",
    author: "Lisa Martinez",
    date: "March 10, 2025",
    readTime: "5 min read",
    category: "Community",
    image: "/placeholder.svg?height=400&width=600",
    slug: "benefits-hiring-local-professionals",
  },
]

// Featured post is the first post
const featuredPost = blogPosts[0]

// Recent posts are the rest
const recentPosts = blogPosts.slice(1)

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333] mb-6">Revit Blog</h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Insights, tips, and stories about home services, skilled professionals, and making the most of the Revit
                platform.
              </p>
            </div>
          </div>
        </section>

        {/* Featured post section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">Featured Article</h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-[#666666]">
                    <span className="bg-[#00A6A6]/10 text-[#00A6A6] px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#333333]">{featuredPost.title}</h3>
                  <p className="text-[#666666]">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=50&width=50"
                        alt={featuredPost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-[#666666]">By {featuredPost.author}</span>
                  </div>
                  <Button asChild className="bg-[#00A6A6] hover:bg-[#008f8f] text-white mt-4">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Recent posts section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">Recent Articles</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <AnimatedSection key={post.id} animation="fade-up" delay={index * 100}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                      <div className="relative h-48">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-sm text-[#666666] mb-3">
                          <span className="bg-[#00A6A6]/10 text-[#00A6A6] px-2 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#333333] mb-3">{post.title}</h3>
                        <p className="text-[#666666] text-sm mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-[#666666]">
                            By {post.author} • {post.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-[#00A6A6] rounded-xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-6">Get the latest articles, tips, and insights delivered directly to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg flex-grow text-[#333333]"
                />
                <Button className="bg-white text-[#00A6A6] hover:bg-gray-100">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

