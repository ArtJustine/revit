"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Settings, Briefcase, CalendarIcon, MessageSquare, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"

// Mock data for calendar events
const mockEvents = [
  {
    id: "1",
    title: "Kitchen Faucet Repair",
    date: new Date(2023, 3, 10, 10, 0),
    endDate: new Date(2023, 3, 10, 12, 0),
    client: "John Smith",
    location: "123 Main St",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Bathroom Renovation Consultation",
    date: new Date(2023, 3, 12, 14, 0),
    endDate: new Date(2023, 3, 12, 15, 30),
    client: "Sarah Johnson",
    location: "456 Oak Ave",
    status: "pending",
  },
  {
    id: "3",
    title: "Electrical Wiring Inspection",
    date: new Date(2023, 3, 15, 9, 0),
    endDate: new Date(2023, 3, 15, 11, 0),
    client: "Michael Brown",
    location: "789 Pine Rd",
    status: "confirmed",
  },
]

export default function CalendarPage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()

      // Check if there are events on this day
      const eventsOnDay = mockEvents.filter(
        (event) => event.date.getDate() === day && event.date.getMonth() === month && event.date.getFullYear() === year,
      )

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        events: eventsOnDay,
        date,
      })
    }

    return days
  }

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
              <h1 className="text-3xl font-bold text-[#333333]">Calendar</h1>
              <p className="text-[#666666]">Manage your appointments and schedule</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Briefcase className="mr-3 h-5 w-5" />
                        <span>My Jobs</span>
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        <span>Messages</span>
                      </Link>
                      <Link
                        href="/dashboard/calendar"
                        className="flex items-center px-4 py-3 bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                      >
                        <CalendarIcon className="mr-3 h-5 w-5" />
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
                        href="/dashboard/settings"
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
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="border-l-4 border-[#00A6A6] pl-3 py-1">
                        <p className="font-medium text-[#333333]">{event.title}</p>
                        <p className="text-sm text-[#666666]">
                          {event.date.toLocaleDateString()} at {formatTime(event.date)}
                        </p>
                      </div>
                    ))}
                    <Button asChild variant="outline" className="w-full border-[#00A6A6] text-[#00A6A6]">
                      <Link href="#add-event">
                        <Plus className="mr-2 h-4 w-4" /> Add Event
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main content */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={goToNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Day names */}
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-medium text-[#666666] py-2">
                          {day}
                        </div>
                      ))}

                      {/* Calendar days */}
                      {generateCalendarDays().map((day, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[80px] p-1 border rounded-md
                            ${!day.isCurrentMonth ? "bg-gray-50" : ""}
                            ${day.isToday ? "border-[#00A6A6]" : "border-gray-100"}
                            ${day.isSelected ? "bg-[#00A6A6]/5" : ""}
                          `}
                          onClick={() => day.day && setSelectedDate(day.date)}
                        >
                          {day.day && (
                            <>
                              <div
                                className={`
                                text-right text-sm font-medium p-1
                                ${day.isToday ? "text-[#00A6A6]" : "text-[#333333]"}
                              `}
                              >
                                {day.day}
                              </div>
                              <div className="mt-1">
                                {day.events &&
                                  day.events.map((event, i) => (
                                    <div
                                      key={i}
                                      className="text-xs bg-[#00A6A6] text-white p-1 rounded mb-1 truncate cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedEvent(event)
                                      }}
                                    >
                                      {formatTime(event.date)} - {event.title}
                                    </div>
                                  ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected date events */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Events for {selectedDate.toLocaleDateString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getEventsForSelectedDate().length === 0 ? (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-[#333333] mb-1">No Events</h3>
                        <p className="text-[#666666]">There are no events scheduled for this day.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getEventsForSelectedDate().map((event) => (
                          <div key={event.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg text-[#333333]">{event.title}</h3>
                                <p className="text-[#666666]">
                                  {formatTime(event.date)} - {formatTime(event.endDate)}
                                </p>
                              </div>
                              <div
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  event.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {event.status === "confirmed" ? "Confirmed" : "Pending"}
                              </div>
                            </div>
                            <div className="mt-3 space-y-2">
                              <p className="text-sm">
                                <span className="font-medium">Client:</span> {event.client}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Location:</span> {event.location}
                              </p>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="border-[#00A6A6] text-[#00A6A6]">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

