'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/vision', label: 'Vision' },
  { href: '/learn', label: 'Learn' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm' : 'bg-white border-b border-zinc-100'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 bg-crimson rounded-lg flex items-center justify-center text-white font-black text-xs">G</span>
          <span className="font-black text-lg tracking-wider text-zinc-900 group-hover:text-crimson transition-colors">GKFXL</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">Login</Link>
          <Link href="/learn" className="btn-primary text-xs py-2 px-4">Start Free</Link>
        </div>

        <button className="md:hidden text-zinc-500 hover:text-zinc-900" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 pb-5 pt-2 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-zinc-600 hover:text-zinc-900 text-sm font-medium py-2 border-b border-zinc-100" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/learn" className="btn-primary text-sm justify-center mt-2" onClick={() => setOpen(false)}>Start Free</Link>
        </div>
      )}
    </nav>
  )
}
