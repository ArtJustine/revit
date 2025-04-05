import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-[#333333] mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-[#666666]">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">1. Introduction</h2>
            <p className="text-[#666666] mb-4">
              At Revit ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-[#666666] mb-4">We may collect information about you in a variety of ways:</p>
            <h3 className="text-lg font-bold text-[#333333] mt-6 mb-2">2.1 Personal Data</h3>
            <p className="text-[#666666] mb-4">When you register for an account, we collect:</p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>Name, email address, phone number, and physical address</li>
              <li>Professional credentials and qualifications (for service providers)</li>
              <li>Payment information</li>
              <li>Profile photos and portfolio images</li>
            </ul>

            <h3 className="text-lg font-bold text-[#333333] mt-6 mb-2">2.2 Usage Data</h3>
            <p className="text-[#666666] mb-4">
              We automatically collect certain information when you visit, use, or navigate our platform, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>IP address</li>
              <li>Browser and device characteristics</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Device information</li>
              <li>Pages that you visit before, during, and after using our platform</li>
              <li>Information about how you interact with our platform</li>
            </ul>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-[#666666] mb-4">
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>To provide, operate, and maintain our platform</li>
              <li>To improve, personalize, and expand our platform</li>
              <li>To understand and analyze how you use our platform</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you about our services, updates, and other information</li>
              <li>To process transactions and send related information</li>
              <li>To find and prevent fraud</li>
              <li>For compliance purposes, including enforcing our Terms of Service</li>
            </ul>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">4. Sharing Your Information</h2>
            <p className="text-[#666666] mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>Service providers who perform services for us</li>
              <li>Professional users and clients as necessary to facilitate services</li>
              <li>Business partners with your consent</li>
              <li>
                In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                acquisition
              </li>
              <li>With your consent or at your direction</li>
              <li>If required by law or to respond to legal process</li>
            </ul>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">5. Your Privacy Rights</h2>
            <p className="text-[#666666] mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of your information</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">6. Data Security</h2>
            <p className="text-[#666666] mb-4">
              We implement appropriate technical and organizational security measures designed to protect the security
              of any personal information we process. However, no electronic transmission over the internet or
              information storage technology can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">7. Data Retention</h2>
            <p className="text-[#666666] mb-4">
              We will retain your personal information only for as long as is necessary for the purposes set out in this
              Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our policies.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-[#666666] mb-4">
              Our platform is not intended for children under the age of 18. We do not knowingly collect personal
              information from children under 18. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-[#666666] mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">10. Contact Us</h2>
            <p className="text-[#666666] mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#666666] mb-4">
              Email: privacy@revit.com
              <br />
              Address: 123 Main Street, City, State, ZIP
              <br />
              Phone: (555) 123-4567
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-[#00A6A6] hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

