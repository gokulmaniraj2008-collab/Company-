import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Zap, Users, Target, TrendingUp, BookOpen, Brain } from 'lucide-react'

const levels = [
  { num: '01', title: 'Mindset', desc: 'Stop thinking like a student. Start thinking like a founder.', icon: Brain },
  { num: '02', title: 'Idea', desc: 'Find real problems. Turn them into startup ideas.', icon: Zap },
  { num: '03', title: 'Builder', desc: 'Create websites, products, and tools with AI.', icon: Target },
  { num: '04', title: 'Company', desc: 'Understand how real companies work — roles, systems, structure.', icon: Users },
  { num: '05', title: 'Startup', desc: 'Get your first users. Make your first sale.', icon: TrendingUp },
  { num: '06', title: 'Growth', desc: 'Scale with systems. Build teams. Become the owner.', icon: BookOpen },
]

const stats = [
  { value: '6', label: 'Levels to Company Owner' },
  { value: '3', label: 'Tools Built In' },
  { value: '0', label: 'Experience Needed' },
  { value: '∞', label: 'Potential' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-crimson rounded-full animate-pulse" />
            <span className="text-zinc-400 text-xs font-medium tracking-wide uppercase">Everyone can learn. Only builders join the company.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            Become a{' '}
            <span className="text-crimson">Company Owner</span>
            <br />from Zero.
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            GKFXL teaches you mindset, startup skills, and real company building — step by step, from zero experience to running your own business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn" className="btn-primary text-base px-8 py-4">
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link href="/vision" className="btn-secondary text-base px-8 py-4">
              See the Vision
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-800 bg-zinc-900/30 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-crimson mb-2">{s.value}</div>
              <div className="text-zinc-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Levels */}
      <section className="section">
        <div className="text-center mb-16">
          <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">The Path</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">6 Levels to Company Owner</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">Each level builds on the last. Complete all 6 and you are not a student — you are a founder.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, i) => {
            const Icon = level.icon
            return (
              <div key={level.num} className="card group hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-5xl font-black text-zinc-800 group-hover:text-crimson/20 transition-colors">
                    {level.num}
                  </span>
                  <div className="w-10 h-10 bg-zinc-800 group-hover:bg-crimson/10 rounded-lg flex items-center justify-center transition-colors">
                    <Icon size={18} className="text-zinc-400 group-hover:text-crimson transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{level.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/learn" className="btn-primary">
            Start Level 01 — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-6 py-20 bg-zinc-900/20 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Built-In Tools</p>
            <h2 className="text-4xl font-black mb-4">Three Tools. One Platform.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Not just lessons — real tools you use while learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'CEO AI',
                desc: 'Paste your team messages and get instant CEO-level analysis: problems, decisions, 24-hour action plan.',
                tag: 'AI-Powered',
                href: '/ceo-ai',
              },
              {
                title: 'Founder OS',
                desc: 'Your startup operating system. Projects, tasks, team roles, reports — all in one dashboard.',
                tag: 'Dashboard',
                href: '/dashboard/founder',
              },
              {
                title: 'Company Builder',
                desc: 'Learn company structure by building one. Assign roles, create SOPs, build your real team system.',
                tag: 'Interactive',
                href: '/learn',
              },
            ].map(tool => (
              <Link key={tool.title} href={tool.href} className="card group hover:border-crimson/40 transition-all duration-300 hover:-translate-y-1 block">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-crimson bg-crimson/10 px-3 py-1 rounded-full">{tool.tag}</span>
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-crimson group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="crimson-glow rounded-2xl border border-crimson/20 bg-crimson/5 p-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Ready to build?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Stop studying. Start doing. Your company starts with Level 01 — right now, for free.
            </p>
            <Link href="/learn" className="btn-primary text-base px-10 py-4">
              Begin Level 01 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
