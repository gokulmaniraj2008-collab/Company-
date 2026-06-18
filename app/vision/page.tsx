import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-4">Our Vision</p>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          A world where anyone can build a company.
        </h1>
        <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
          Not just the privileged. Not just the connected. Anyone with the mindset and the willingness to act.
        </p>
      </section>

      {/* Vision Statement */}
      <section className="px-6 py-16 border-y border-zinc-800 bg-zinc-900/20">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-3xl md:text-4xl font-black leading-snug text-center">
            <span className="text-crimson">"</span>
            We transform beginners into company owners by teaching mindset, skills, and real startup building step-by-step.
            <span className="text-crimson">"</span>
          </blockquote>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Mission</p>
            <h2 className="text-4xl font-black mb-6">Turn students into builders. Builders into owners.</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Most education teaches you to follow systems. GKFXL teaches you to build them. We believe the gap between a student and a company owner is not talent — it's access to the right system.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We give you that system. 6 levels. 3 tools. One outcome: you run a real company.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Problem', text: 'Most people have ideas but no system to execute.' },
              { label: 'Our Fix', text: 'A step-by-step path from mindset to company owner.' },
              { label: 'The Rule', text: 'Everyone can learn. Only builders join the company.' },
            ].map(item => (
              <div key={item.label} className="card border-zinc-800">
                <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-2">{item.label}</p>
                <p className="text-white font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 bg-zinc-900/20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Core Values</p>
            <h2 className="text-4xl font-black">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 'Action First', desc: 'Ideas mean nothing without execution. We reward doing, not planning.' },
              { value: 'Zero Gatekeeping', desc: 'No background required. No connections needed. Just willingness.' },
              { value: 'Real Results', desc: 'We measure success by what you build, not what you learn.' },
              { value: 'System Thinking', desc: 'We teach you to build companies that run without you.' },
            ].map(item => (
              <div key={item.value} className="card hover:border-crimson/30 transition-colors">
                <div className="w-2 h-2 bg-crimson rounded-full mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.value}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4">This vision needs builders.</h2>
          <p className="text-zinc-400 mb-8">Are you one of them?</p>
          <Link href="/learn" className="btn-primary text-base px-10 py-4">
            Start Building <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
