"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, User, MapPin, ArrowLeft, Plus } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"
import { Sidebar } from "@/components/sidebar"

// Sample calendar events
const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Home Cleaning",
    date: new Date(2025, 3, 10, 10, 0),
    endTime: new Date(2025, 3, 10, 13, 0),
    location: "123 Main St, Anytown",
    client: "John Smith",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Office Maintenance",
    date: new Date(2025, 3, 12, 14, 0),
    endTime: new Date(2025, 3, 12, 17, 0),
    location: "456 Business Ave, Commerce City",
    client: "Acme Corp",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Garden Landscaping",
    date: new Date(2025, 3, 15, 9, 0),
    endTime: new Date(2025, 3, 15, 15, 0),
    location: "789 Garden Lane, Greenville",
    client: "Sarah Johnson",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Plumbing Repair",
    date: new Date(2025, 3, 5, 13, 0),
    endTime: new Date(2025, 3, 5, 15, 0),
    location: "321 Water St, Riverside",
    client: "Michael Brown",
    status: "completed",
  },
  {
    id: "5",
    title: "Electrical Installation",
    date: new Date(2025, 3, 3, 11, 0),
    endTime: new Date(2025, 3, 3, 14, 0),
    location: "654 Power Ave, Electown",
    client: "Tech Solutions Inc",
    status: "completed",
  },
]

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// Helper function to get day of week (0 = Sunday, 6 = Saturday)
const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month, day).getDay()
}

export default function CalendarPage() {
  const { user, userData } = useAuth()
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1)

  // Create calendar days array
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    if (!day) return []

    const date = new Date(currentYear, currentMonth, day)
    return SAMPLE_EVENTS.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth &&
        event.date.getFullYear() === currentYear,
    )
  }

  // Check if a day has events
  const dayHasEvents = (day: number) => {
    return getEventsForDay(day).length > 0
  }

  // Get all events for selected date
  const selectedDateEvents = selectedDate
    ? SAMPLE_EVENTS.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  // Get upcoming events (limited to 3)
  const upcomingEvents = SAMPLE_EVENTS.filter((event) => event.status === "upcoming" && event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3)

  return (
    <ProtectedRoute requiredUserType="professional">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/professional/dashboard")}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold text-[#333333]">Calendar</h1>
              </div>
              <Button className="mt-4 md:mt-0 bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar />

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Upcoming Jobs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.length === 0 ? (
                      <p className="text-[#666666] text-center py-4">No upcoming jobs scheduled</p>
                    ) : (
                      upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedDate(event.date)}
                        >
                          <h3 className="font-medium text-[#333333]">{event.title}</h3>
                          <div className="flex items-center text-sm text-[#666666] mt-1">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-sm text-[#666666] mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {formatTime(event.date)} - {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-[#666666] mt-1">
                            <User className="h-3 w-3 mr-1" />
                            <span>{event.client}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Main content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextMonth}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 mt-4">
                      {/* Day names */}
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-medium text-[#666666] py-2">
                          {day}
                        </div>
                      ))}

                      {/* Calendar days */}
                      {calendarDays.map((day, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[80px] p-1 border rounded-md
                            ${day === null ? "bg-gray-50" : "hover:bg-gray-50 cursor-pointer"}
                            ${
                              day === new Date().getDate() &&
                              currentMonth === new Date().getMonth() &&
                              currentYear === new Date().getFullYear()
                                ? "border-[#00A6A6] bg-[#00A6A6]/5"
                                : "border-gray-100"
                            }
                            ${
                              selectedDate &&
                              day === selectedDate.getDate() &&
                              currentMonth === selectedDate.getMonth() &&
                              currentYear === selectedDate.getFullYear()
                                ? "border-[#00A6A6] bg-[#00A6A6]/10"
                                : ""
                            }
                          `}
                          onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                        >
                          {day && (
                            <>
                              <div className="text-right font-medium text-[#333333]">{day}</div>
                              {dayHasEvents(day) && (
                                <div className="mt-1">
                                  {getEventsForDay(day)
                                    .slice(0, 2)
                                    .map((event) => (
                                      <div
                                        key={event.id}
                                        className="text-xs p-1 mb-1 rounded bg-[#00A6A6]/20 text-[#00A6A6] truncate"
                                      >
                                        {formatTime(event.date)} {event.title}
                                      </div>
                                    ))}
                                  {getEventsForDay(day).length > 2 && (
                                    <div className="text-xs text-[#666666] pl-1">
                                      +{getEventsForDay(day).length - 2} more
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected day events */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Events for {formatDate(selectedDate)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedDateEvents.length === 0 ? (
                          <p className="text-center py-6 text-[#666666]">No events scheduled for this day</p>
                        ) : (
                          <div className="space-y-4">
                            {selectedDateEvents.map((event) => (
                              <div
                                key={event.id}
                                className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                              >
                                <h3 className="font-medium text-lg text-[#333333]">{event.title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                  <div>
                                    <div className="flex items-center text-[#666666] mt-1">
                                      <Clock className="h-4 w-4 mr-2" />
                                      <span>
                                        {formatTime(event.date)} - {formatTime(event.endTime)}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-[#666666] mt-1">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      <span>{event.location}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex items-center text-[#666666] mt-1">
                                      <User className="h-4 w-4 mr-2" />
                                      <span>Client: {event.client}</span>
                                    </div>
                                    <div className="flex items-center text-[#666666] mt-1">
                                      <div
                                        className={`px-2 py-1 rounded-full text-xs ${
                                          event.status === "upcoming"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                      >
                                        {event.status === "upcoming" ? "Upcoming" : "Completed"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                  <Button variant="outline" className="mr-2">
                                    Edit
                                  </Button>
                                  <Button className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">View Details</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
