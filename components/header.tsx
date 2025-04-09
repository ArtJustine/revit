"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/firebase/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, userData, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getDashboardLink = () => {
    if (!userData) return "/dashboard"
    return userData.userType === "professional" ? "/professional/dashboard" : "/dashboard"
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#00A6A6]">revit</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-[#333333] hover:text-[#00A6A6] transition-colors relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A6A6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#333333] hover:text-[#00A6A6] transition-colors relative group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A6A6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/investors"
            className="text-sm font-medium text-[#333333] hover:text-[#00A6A6] transition-colors relative group"
          >
            Investors
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A6A6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-[#333333] hover:text-[#00A6A6] transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A6A6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
  {user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border-[#00A6A6] transform transition-transform duration-300 hover:scale-105"
        >
          <User className="h-5 w-5 text-[#00A6A6]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="transform transition-transform duration-200 hover:scale-105"
        >
          <Link href={getDashboardLink()}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="transform transition-transform duration-200 hover:scale-105"
        >
          <Link href={userData?.userType === "professional" ? "/professional/profile" : "/dashboard/profile"}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="transform transition-transform duration-200 hover:scale-105"
        >
          <Link href={userData?.userType === "professional" ? "/professional/settings" : "/dashboard/settings"}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="transform transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button
        asChild
        className="bg-[#00A6A6] hover:bg-[#008f8f] text-white rounded-full px-6 transform transition-transform duration-300 hover:scale-105"
      >
        <Link href="/signup">Sign Up</Link>
      </Button>
    </>
  )}
</div>


        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-l-[#00A6A6]">
            <div className="flex justify-start py-4">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-[#00A6A6]">revit</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-6 mt-8">
              <Link
                href="/how-it-works"
                className="text-lg font-medium text-[#333333] hover:text-[#00A6A6] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/blog"
                className="text-lg font-medium text-[#333333] hover:text-[#00A6A6] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/investors"
                className="text-lg font-medium text-[#333333] hover:text-[#00A6A6] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Investors
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium text-[#333333] hover:text-[#00A6A6] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col gap-2 mt-8">
                {user ? (
                  <>
                    <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white rounded-full">
                      <Link href={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full border-[#00A6A6] text-[#00A6A6]"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button asChild className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white rounded-full">
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

