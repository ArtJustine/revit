import Link from "next/link"
import { Briefcase, MessageSquare, Calendar, User, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SidebarProps {
  userType: "client" | "professional"
  stats: {
    activeJobs: number
    completedJobs: number
    totalSpent?: number
    openJobs?: number
  }
}

export function Sidebar({ userType, stats }: SidebarProps) {
  const isClient = userType === "client"

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="space-y-1">
            <Link
              href={isClient ? "/client/dashboard" : "/professional/dashboard"}
              className="flex items-center px-4 py-3 bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
            >
              <Briefcase className="mr-3 h-5 w-5" />
              <span>{isClient ? "My Jobs" : "Available Jobs"}</span>
            </Link>
            <Link
              href={isClient ? "/client/messages" : "/professional/messages"}
              className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href={isClient ? "/client/calendar" : "/professional/calendar"}
              className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            >
              <Calendar className="mr-3 h-5 w-5" />
              <span>Calendar</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            >
              <User className="mr-3 h-5 w-5" />
              <span>My Profile</span>
            </Link>
            <Link
              href={isClient ? "/client/settings" : "/professional/settings"}
              className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
            >
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#666666]">Active Jobs</span>
            <span className="font-bold text-[#333333]">{stats.activeJobs}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#666666]">Completed Jobs</span>
            <span className="font-bold text-[#333333]">{stats.completedJobs}</span>
          </div>
          {isClient && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-[#666666]">Total Spent</span>
                <span className="font-bold text-[#333333]">${stats.totalSpent?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#666666]">Open Jobs</span>
                <span className="font-bold text-[#333333]">{stats.openJobs}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}