import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-[#333333] mb-8">Terms and Conditions</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-[#666666]">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">1. Introduction</h2>
            <p className="text-[#666666] mb-4">
              Welcome to Revit ("we," "our," or "us"). These Terms and Conditions govern your use of our website and
              services. By accessing or using our platform, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">2. Definitions</h2>
            <p className="text-[#666666] mb-4">"Client" refers to users who seek services from Professionals.</p>
            <p className="text-[#666666] mb-4">
              "Professional" refers to users who offer services through our platform.
            </p>
            <p className="text-[#666666] mb-4">
              "Services" refers to the connection and facilitation services provided by Revit.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">3. Account Registration</h2>
            <p className="text-[#666666] mb-4">
              To use our services, you must register for an account. You agree to provide accurate, current, and
              complete information during registration and to update such information to keep it accurate, current, and
              complete.
            </p>
            <p className="text-[#666666] mb-4">
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">4. User Conduct</h2>
            <p className="text-[#666666] mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-[#666666]">
              <li>Use our services for any illegal purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Distribute unsolicited promotional content</li>
              <li>Attempt to interfere with the proper functioning of our platform</li>
              <li>Bypass measures we may use to prevent or restrict access to our services</li>
            </ul>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">5. Professional Services</h2>
            <p className="text-[#666666] mb-4">
              Revit is a platform that connects Clients with Professionals. We do not provide the actual services
              performed by Professionals and are not responsible for the quality, safety, or legality of the services
              provided.
            </p>
            <p className="text-[#666666] mb-4">
              Professionals are independent contractors and not employees of Revit. Any agreement for services is
              between the Client and the Professional.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">6. Fees and Payment</h2>
            <p className="text-[#666666] mb-4">
              Revit charges service fees for the use of our platform. These fees are clearly displayed before any
              transaction is completed.
            </p>
            <p className="text-[#666666] mb-4">
              Payment processing is handled by third-party payment processors. By using our services, you agree to their
              terms and conditions.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-[#666666] mb-4">
              To the maximum extent permitted by law, Revit shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or revenues.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">8. Changes to Terms</h2>
            <p className="text-[#666666] mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting the updated Terms on our website or through other communications.
            </p>

            <h2 className="text-xl font-bold text-[#333333] mt-8 mb-4">9. Contact Information</h2>
            <p className="text-[#666666] mb-4">If you have any questions about these Terms, please contact us at:</p>
            <p className="text-[#666666] mb-4">
              Email: support@revit.com
              <br />
              Address: 123 Main Street, City, State, ZIP
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

