import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

export function AppDownloadSection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-[#00A6A6] text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get the Revit App</h2>
            <p className="text-lg max-w-md">
              Download our mobile app to find professionals or get jobs on the go. Available for iOS and Android
              devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xs mx-auto sm:max-w-none sm:mx-0">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <div className="bg-black rounded-xl p-3 sm:p-2 flex items-center justify-center sm:justify-start hover:bg-gray-900 transition-colors">
                  <div className="mr-3">
                    <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <p className="text-xs">Download on the</p>
                    <p className="text-base sm:text-lg font-semibold">App Store</p>
                  </div>
                </div>
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <div className="bg-black rounded-xl p-3 sm:p-2 flex items-center justify-center sm:justify-start hover:bg-gray-900 transition-colors">
                  <div className="mr-3">
                    <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <p className="text-xs">GET IT ON</p>
                    <p className="text-base sm:text-lg font-semibold">Google Play</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] flex justify-center">
            <div className="relative h-full w-[250px]">
              <Image
                src="/placeholder.svg?height=500&width=250"
                alt="Revit mobile app"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

