import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

export function AppDownloadSection() {
  return (
    <section className="py-5 px-4 md:px-6 bg-[#E0E0E0] text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#333333]">Get the Revit App</h2>
            <p className="text-lg max-w-md text-[#333333]">
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
                <div className="bg-black rounded-xl p-3 sm:p-2 flex items-center justify-center sm:justify-start hover:bg-[#006666]">
                  <div className="mr-3">
                    <Image
                      src="/appstore.png"
                      alt="Apple icon"
                      width={32}
                      height={32}
                      className="sm:w-8 sm:h-8 w-6 h-6"/>
                  </div>
                  <div>
                    <p className="text-xs text-white">Download on the</p>
                    <p className="text-base sm:text-lg font-semibold text-white">App Store</p>
                  </div>
                </div>
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <div className="bg-black rounded-xl p-3 sm:p-2 flex items-center justify-center sm:justify-start hover:bg-[#006666]">
                  <div className="mr-3">
                    <Image
                      src="/google.png"
                      alt="Apple icon"
                      width={32}
                      height={32}
                      className="sm:w-8 sm:h-8 w-6 h-6"/>
                  </div>
                  <div>
                    <p className="text-xs text-white">GET IT ON</p>
                    <p className="text-base sm:text-lg font-semibold text-white">Google Play</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative w-full flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/revitapp.webp"
                alt="Revit mobile app"
                layout="responsive"
                width={500}
                height={1000}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

