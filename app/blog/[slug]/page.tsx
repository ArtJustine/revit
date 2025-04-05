import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// This would typically come from a CMS or database
// For this example, we'll create a sample blog post
const blogPost = {
  title: "How to Find the Right Plumber for Your Home Renovation",
  excerpt:
    "Renovating your home can be exciting, but finding the right professional is crucial. Learn how to vet and hire the perfect plumber for your project.",
  author: "Sarah Johnson",
  authorRole: "Home Improvement Specialist",
  date: "April 2, 2025",
  readTime: "5 min read",
  category: "Home Improvement",
  image: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>When embarking on a home renovation project, finding the right plumber can make all the difference between a smooth experience and a stressful one. Plumbing is a critical aspect of any renovation, and mistakes can lead to costly damages down the line.</p>
    
    <h2>Why Choosing the Right Plumber Matters</h2>
    
    <p>Plumbing issues can cause significant damage to your home if not handled properly. Water damage from leaky pipes or improper installations can lead to mold growth, structural damage, and expensive repairs. That's why it's essential to hire a qualified professional who understands the intricacies of plumbing systems.</p>
    
    <p>Beyond preventing potential disasters, a skilled plumber can also help you optimize your renovation plans. They can suggest efficient layouts, recommend quality fixtures that fit your budget, and ensure that your plumbing system meets local building codes.</p>
    
    <h2>Key Qualifications to Look For</h2>
    
    <p>When searching for a plumber for your renovation project, consider these important qualifications:</p>
    
    <ul>
      <li><strong>Proper Licensing:</strong> Ensure the plumber holds the appropriate licenses required in your area. This demonstrates they have the necessary training and knowledge.</li>
      <li><strong>Insurance Coverage:</strong> Verify that the plumber carries liability insurance and workers' compensation. This protects you from liability in case of accidents or damage during the project.</li>
      <li><strong>Experience with Renovations:</strong> Renovation plumbing differs from repair work. Look for someone with specific experience in renovation projects similar to yours.</li>
      <li><strong>Positive Reviews and References:</strong> Check online reviews and ask for references from past clients, particularly those who had similar renovation work done.</li>
      <li><strong>Clear Communication Skills:</strong> Your plumber should be able to explain complex issues in understandable terms and be responsive to your questions and concerns.</li>
    </ul>
    
    <h2>Questions to Ask Before Hiring</h2>
    
    <p>During your initial consultation with a potential plumber, ask these important questions:</p>
    
    <ol>
      <li>How long have you been working on renovation projects?</li>
      <li>Can you provide examples of similar projects you've completed?</li>
      <li>What permits will be needed for my project, and will you handle obtaining them?</li>
      <li>What is your timeline for completing the work?</li>
      <li>How do you handle unexpected issues that arise during the project?</li>
      <li>What warranty do you offer on your work?</li>
      <li>How do you structure your pricing (hourly rate vs. project-based)?</li>
    </ol>
    
    <h2>Red Flags to Watch Out For</h2>
    
    <p>Be cautious of plumbers who:</p>
    
    <ul>
      <li>Provide quotes that are significantly lower than others (this often indicates cutting corners)</li>
      <li>Demand large upfront payments before work begins</li>
      <li>Cannot provide proof of license or insurance</li>
      <li>Are unwilling to provide references</li>
      <li>Communicate poorly or seem disorganized</li>
      <li>Pressure you to make immediate decisions</li>
    </ul>
    
    <h2>Using Revit to Find Qualified Plumbers</h2>
    
    <p>Platforms like Revit make finding qualified plumbers easier than ever. When using Revit to search for a plumber for your renovation:</p>
    
    <ul>
      <li>Filter for professionals with specific renovation experience</li>
      <li>Read verified reviews from past clients</li>
      <li>Compare quotes from multiple qualified professionals</li>
      <li>Check their verification status and credentials</li>
      <li>Review their portfolio of past projects</li>
    </ul>
    
    <p>By taking the time to find the right plumber for your renovation project, you'll save yourself potential headaches and ensure that this crucial aspect of your home improvement project is handled with expertise and care.</p>
    
    <h2>Conclusion</h2>
    
    <p>Finding the right plumber for your home renovation doesn't have to be overwhelming. By understanding what qualifications to look for, asking the right questions, and using platforms like Revit to connect with verified professionals, you can make an informed decision that will contribute to the success of your renovation project.</p>
    
    <p>Remember that the cheapest option isn't always the best value. Investing in a qualified, experienced plumber will pay dividends in the quality of work, adherence to timelines, and peace of mind throughout your renovation journey.</p>
  `,
  relatedPosts: [
    {
      id: 2,
      title: "5 Questions to Ask Before Hiring an Electrician",
      excerpt:
        "Electrical work requires expertise and precision. Before you hire an electrician, make sure to ask these 5 essential questions to ensure quality and safety.",
      image: "/placeholder.svg?height=200&width=300",
      slug: "questions-before-hiring-electrician",
    },
    {
      id: 4,
      title: "Home Maintenance Tasks You Shouldn't Ignore",
      excerpt:
        "Regular home maintenance prevents costly repairs down the line. Learn which essential tasks you should never put off and when to call a professional.",
      image: "/placeholder.svg?height=200&width=300",
      slug: "home-maintenance-tasks-not-ignore",
    },
    {
      id: 5,
      title: "How to Budget for Home Improvement Projects",
      excerpt:
        "Planning a home improvement project? Learn how to create a realistic budget, account for unexpected costs, and get the most value from professional services.",
      image: "/placeholder.svg?height=200&width=300",
      slug: "budget-home-improvement-projects",
    },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the blog post based on the slug
  // For this example, we'll use our sample blog post

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-16 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-[#666666] hover:text-[#00A6A6] mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>

              <div className="flex items-center gap-4 text-sm text-[#666666] mb-4">
                <span className="bg-[#00A6A6]/10 text-[#00A6A6] px-3 py-1 rounded-full">{blogPost.category}</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blogPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {blogPost.readTime}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#333333] mb-6">
                {blogPost.title}
              </h1>

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt={blogPost.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#333333]">{blogPost.author}</p>
                  <p className="text-sm text-[#666666]">{blogPost.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        <div className="container mx-auto px-4 md:px-6 -mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={blogPost.image || "/placeholder.svg"}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Blog content */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              {/* Social sharing */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <p className="text-[#666666]">Share this article:</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Facebook className="h-4 w-4 text-[#666666]" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Twitter className="h-4 w-4 text-[#666666]" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Linkedin className="h-4 w-4 text-[#666666]" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </div>
              </div>

              {/* Blog content */}
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

              {/* Author bio */}
              <div className="mt-12 p-6 bg-[#E0E0E0] rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#333333] mb-1">About {blogPost.author}</h3>
                    <p className="text-[#666666] text-sm">
                      Sarah Johnson is a home improvement specialist with over 15 years of experience in the
                      construction industry. She specializes in helping homeowners make informed decisions about their
                      renovation projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts section */}
        <section className="py-12 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-[#333333] mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPost.relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                      <div className="relative h-40">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-[#333333] mb-2">{post.title}</h3>
                        <p className="text-[#666666] text-sm">{post.excerpt.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-[#00A6A6] rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
              <p className="mb-6">Subscribe to our newsletter to get more insights and tips delivered to your inbox.</p>
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

