"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, User, Settings, Briefcase, Calendar, MessageSquare, Send } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/firebase/auth-context"

// Mock data for messages
const mockContacts = [
  {
    id: "1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I need help with my electrical wiring.",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you provide a quote for the job?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for completing the work so quickly!",
    timestamp: "Monday",
    unread: false,
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "1",
    text: "I need help with my electrical wiring.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Hello! I'd be happy to help. Can you describe the issue in more detail?",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    senderId: "1",
    text: "I'm renovating my kitchen and need to install new lighting fixtures and outlets.",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    senderId: "current-user",
    text: "I can definitely help with that. Would you like me to come take a look and provide a quote?",
    timestamp: "10:38 AM",
  },
  {
    id: "5",
    senderId: "1",
    text: "Yes, that would be great. When are you available?",
    timestamp: "10:40 AM",
  },
]

export default function ProfessionalMessagesPage() {
  const { user, signOut } = useAuth()
  const [selectedContact, setSelectedContact] = useState(mockContacts[0])
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim() === "") return

    const newMessage = {
      id: `${messages.length + 1}`,
      senderId: "current-user",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <ProtectedRoute requiredUserType="professional">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
              <h1 className="text-3xl font-bold text-[#333333]">Messages</h1>
              <p className="text-[#666666]">Communicate with clients and manage job inquiries</p>
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
                        href="/professional/dashboard"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Briefcase className="mr-3 h-5 w-5" />
                        <span>My Jobs</span>
                      </Link>
                      <Link
                        href="/professional/messages"
                        className="flex items-center px-4 py-3 bg-[#00A6A6]/10 text-[#00A6A6] font-medium"
                      >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        <span>Messages</span>
                      </Link>
                      <Link
                        href="/professional/calendar"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Calendar className="mr-3 h-5 w-5" />
                        <span>Calendar</span>
                      </Link>
                      <Link
                        href="/professional/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <User className="mr-3 h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/professional/settings"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-[#666666] hover:text-[#00A6A6] transition-colors"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main content */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3">
                <Card className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    {/* Contacts list */}
                    <div className="border-r">
                      <div className="p-4 border-b">
                        <Input
                          placeholder="Search messages..."
                          className="w-full"
                          prefix={<Search className="h-4 w-4 text-gray-400" />}
                        />
                      </div>
                      <div className="overflow-y-auto h-[calc(100%-65px)]">
                        {mockContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact.id === contact.id ? "bg-[#00A6A6]/5" : ""}`}
                            onClick={() => setSelectedContact(contact)}
                          >
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                              <Image
                                src={contact.avatar || "/placeholder.svg"}
                                alt={contact.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium text-[#333333] truncate">{contact.name}</h3>
                                <span className="text-xs text-[#666666]">{contact.timestamp}</span>
                              </div>
                              <p className="text-sm text-[#666666] truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread && <div className="h-2 w-2 bg-[#00A6A6] rounded-full ml-2"></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chat area */}
                    <div className="col-span-2 flex flex-col h-full">
                      {/* Chat header */}
                      <div className="p-4 border-b flex items-center">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={selectedContact.avatar || "/placeholder.svg"}
                            alt={selectedContact.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#333333]">{selectedContact.name}</h3>
                          <p className="text-xs text-[#666666]">Online</p>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.senderId === "current-user"
                                  ? "bg-[#00A6A6] text-white rounded-br-none"
                                  : "bg-gray-100 text-[#333333] rounded-bl-none"
                              }`}
                            >
                              <p>{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${message.senderId === "current-user" ? "text-white/70" : "text-[#666666]"}`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message input */}
                      <div className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex items-center">
                          <Input
                            placeholder="Type a message..."
                            className="flex-1 mr-2"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button type="submit" className="bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
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

