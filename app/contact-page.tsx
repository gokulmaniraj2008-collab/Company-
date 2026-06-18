'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Send, Mail, MapPin, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Us</h1>
        <p className="text-zinc-500 text-base max-w-md mx-auto">
          Have a question, idea, or want to collaborate? We'd love to hear from you.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">Info</p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@gkfxl.com' },
                  { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India' },
                  { icon: MessageSquare, label: 'Response', value: 'Within 24 hours' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-crimson/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={14} className="text-crimson" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-zinc-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-crimson/5 border-crimson/20">
              <p className="text-xs font-semibold text-crimson tracking-widest uppercase mb-2">Quick Note</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                If you're a student who completed Level 06 and want to join the team — mention it in your message.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {sent ? (
              <div className="card border-green-200 bg-green-50 text-center py-16">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2 text-zinc-900">Message Sent!</h3>
                <p className="text-zinc-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase block mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-crimson transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase block mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-crimson transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase block mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-crimson transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option>General Question</option>
                    <option>I want to join the team</option>
                    <option>Partnership / Collaboration</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-crimson transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
