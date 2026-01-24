import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 bg-gradient-to-b from-blue-50 via-white to-white">
         <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-white to-white" />
         
        <div className="max-w-4xl mx-auto space-y-4 text-center px-4 relative z-10">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-100 shadow-sm mb-2">
            Contact Support &amp; Sales
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
            Get In Touch
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 mx-auto leading-relaxed">
            Have a project in mind or need assistance? Let's talk about how we can help you grow.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex justify-center pb-20 px-4">
        <Reveal>
          <div className="max-w-6xl w-full grid gap-8 lg:grid-cols-3 mx-auto">

          {/* Contact Info Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-gray-100 shadow-sm bg-blue-50/50">
              <CardHeader className="pb-3">
                 <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm mb-2">
                    <MapPin className="w-5 h-5" />
                 </div>
                <CardTitle className="text-base text-blue-950">Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  207 Blue Point<br />
                  Surat, Gujarat<br />
                  India
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm bg-blue-50/50">
              <CardHeader className="pb-3">
                 <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm mb-2">
                    <Phone className="w-5 h-5" />
                 </div>
                <CardTitle className="text-base text-blue-950">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  +91 98765 43210
                </p>
                <p className="text-xs text-gray-500 mt-1">Mon-Fri from 9am to 6pm</p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm bg-blue-50/50">
              <CardHeader className="pb-3">
                 <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm mb-2">
                    <Mail className="w-5 h-5" />
                 </div>
                <CardTitle className="text-base text-blue-950">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  info@growcodesolution.com
                </p>
                 <p className="text-xs text-gray-500 mt-1">We usually reply within 24 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-gray-100 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-950">Send us a Message</CardTitle>
                <CardDescription className="text-gray-500">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <Input
                        placeholder="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <Input
                      placeholder="Project inquiry"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all">
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>

                  {submitted && (
                    <div className="rounded-lg bg-green-50 p-4 text-green-800 text-sm border border-green-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Thank you! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
        </Reveal>
      </section>
    </div>
  )
}
