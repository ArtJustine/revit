"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would handle form submission here
    console.log(values)
    // Show success message
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-[#E0E0E0]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#333333] mb-4">Contact Us</h1>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact form section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-[#333333] mb-6">Get in Touch</h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      className="bg-[#00A6A6] hover:bg-[#008f8f] text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="support">Customer Support</SelectItem>
                                <SelectItem value="business">Business Partnership</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="How can we help you?" className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-[#00A6A6] hover:bg-[#008f8f] text-white">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </Button>
                    </form>
                  </Form>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#333333] mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#00A6A6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333]">Email</h3>
                      <p className="text-[#666666]">support@revit.com</p>
                      <p className="text-[#666666]">info@revit.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#00A6A6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333]">Phone</h3>
                      <p className="text-[#666666]">+1 (555) 123-4567</p>
                      <p className="text-[#666666]">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#00A6A6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333]">Office</h3>
                      <p className="text-[#666666]">123 Main Street</p>
                      <p className="text-[#666666]">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#E0E0E0] rounded-xl">
                  <h3 className="text-lg font-semibold text-[#333333] mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#333333]">How do I sign up as a professional?</h4>
                      <p className="text-sm text-[#666666]">
                        Visit our sign-up page and select "I'm a Professional" to create your account.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#333333]">How does payment work?</h4>
                      <p className="text-sm text-[#666666]">
                        We use a secure payment system. Clients pay through the app, and professionals receive payment
                        after job completion.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#333333]">What if I'm not satisfied with the service?</h4>
                      <p className="text-sm text-[#666666]">
                        We offer a satisfaction guarantee. Contact our support team if you're not happy with the
                        service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="py-16 px-4 md:px-6 bg-[#E0E0E0]">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#333333]">Find Us</h2>
              <p className="text-[#666666]">Visit our office or reach out online</p>
            </div>

            <div className="h-[400px] bg-white rounded-xl overflow-hidden">
              {/* This would be a map in a real application */}
              <div className="h-full w-full flex items-center justify-center bg-gray-200">
                <MapPin className="h-12 w-12 text-[#00A6A6]" />
                <span className="ml-2 text-lg font-medium text-[#666666]">Map would be displayed here</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

