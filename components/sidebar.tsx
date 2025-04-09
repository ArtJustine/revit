"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, MessageSquare, Calendar, User, Settings } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="space-y-1">
          <Link
            href="/professional/dashboard"
            className={`flex items-center px-4 py-3 ${
              pathname === "/professional/dashboard"
                ? "bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                : "hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            }`}
          >
            <Briefcase className="mr-3 h-5 w-5" />
            <span>My Jobs</span>
          </Link>
          <Link
            href="/professional/messages"
            className={`flex items-center px-4 py-3 ${
              pathname === "/professional/messages"
                ? "bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                : "hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            }`}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="/professional/calendar"
            className={`flex items-center px-4 py-3 ${
              pathname === "/professional/calendar"
                ? "bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                : "hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            }`}
          >
            <Calendar className="mr-3 h-5 w-5" />
            <span>Calendar</span>
          </Link>
          <Link
            href="/professional/profile"
            className={`flex items-center px-4 py-3 ${
              pathname === "/professional/profile"
                ? "bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                : "hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            }`}
          >
            <User className="mr-3 h-5 w-5" />
            <span>My Profile</span>
          </Link>
          <Link
            href="/professional/settings"
            className={`flex items-center px-4 py-3 ${
              pathname === "/professional/settings"
                ? "bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                : "hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </CardContent>
    </Card>
  )
}
