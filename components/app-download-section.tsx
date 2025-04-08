import Image from "next/image"
import Link from "next/link"

export function AppDownloadSection() {
  return (
    <section className="py-10 px-4 md:px-6 bg-[#E0E0E0] text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text & Download Buttons */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#333333]">
              Get the Revit App
            </h2>
            <p className="text-lg max-w-md mx-auto md:mx-0 text-[#333333]">
              Download our mobile app to find professionals or get jobs on the go.
              Available for iOS and Android devices.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center md:justify-start">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <div className="bg-black rounded-xl px-4 py-3 flex items-center justify-center sm:justify-start hover:bg-[#006666] transition">
                  <Image
                    src="/appstore.png"
                    alt="Apple icon"
                    width={32}
                    height={32}
                    className="mr-3 w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <div className="text-left">
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
                <div className="bg-black rounded-xl px-4 py-3 flex items-center justify-center sm:justify-start hover:bg-[#006666] transition">
                  <Image
                    src="/google.png"
                    alt="Google Play icon"
                    width={32}
                    height={32}
                    className="mr-3 w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <div className="text-left">
                    <p className="text-xs text-white">GET IT ON</p>
                    <p className="text-base sm:text-lg font-semibold text-white">Google Play</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* App Image */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-[80%] sm:w-[60%] md:w-full max-w-sm">
              <Image
                src="/revitapp.webp"
                alt="Revit mobile app"
                width={500}
                height={1000}
                layout="responsive"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
