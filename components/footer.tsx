import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-[#00A6A6]">revit</span>
            </Link>
            <p className="text-sm text-gray-300 mb-6 max-w-xs">
              Connecting skilled professionals with clients who need their services. Find the right expert for any job,
              big or small.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00A6A6] bg-gray-800 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00A6A6] bg-gray-800 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-[#00A6A6] bg-gray-800 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-[#00A6A6]">For Clients</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link href="/signup/client" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Sign Up as Client
                </Link>
              </li>
              <li>
                <Link href="/client-benefits" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Client Benefits
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-[#00A6A6]">For Professionals</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/signup/worker" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Sign Up as Professional
                </Link>
              </li>
              <li>
                <Link
                  href="/professional-benefits"
                  className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors"
                >
                  Professional Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/professional-expectations"
                  className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors"
                >
                  Professional Expectations
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-[#00A6A6]">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-[#00A6A6] text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Revit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

