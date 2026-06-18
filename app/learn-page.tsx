import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Lock, CheckCircle, Brain, Zap, Wrench, Building2, Rocket, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const levels = [
  {
    num: '01',
    title: 'Mindset',
    tag: 'Foundation',
    icon: Brain,
    color: 'from-crimson/20 to-crimson/5',
    border: 'border-crimson/40',
    free: true,
    lessons: [
      'Fixed mindset vs growth mindset',
      'Why most people stay stuck',
      'Discipline over motivation',
      'How founders actually think',
      'Overthinking vs taking action',
    ],
    output: 'You think like a builder, not a follower.',
  },
  {
    num: '02',
    title: 'Idea',
    tag: 'Discovery',
    icon: Zap,
    color: 'from-yellow-500/10 to-transparent',
    border: 'border-yellow-500/20',
    free: true,
    lessons: [
      'How to find real problems around you',
      'Turning problems into startup ideas',
      'How to choose ONE idea (not many)',
      'Idea validation — useful or not?',
      'AI Idea Generator (tool included)',
    ],
    output: 'You have a clear, validated startup idea.',
  },
  {
    num: '03',
    title: 'Builder',
    tag: 'Skills',
    icon: Wrench,
    color: 'from-blue-500/10 to-transparent',
    border: 'border-blue-500/20',
    free: false,
    lessons: [
      'Build a website with AI (no code)',
      'Create a startup landing page',
      'Use ChatGPT to build products',
      'Canva for branding & design',
      'Mini project: your first live page',
    ],
    output: 'You have a real product online.',
  },
  {
    num: '04',
    title: 'Company',
    tag: 'Structure',
    icon: Building2,
    color: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/20',
    free: false,
    lessons: [
      'What is a real company?',
      'Businessman vs Company Owner',
      'Why systems beat individuals',
      'All 8 company roles explained',
      'How companies actually grow',
    ],
    output: 'You understand how a real company works.',
  },
  {
    num: '05',
    title: 'Startup',
    tag: 'Execution',
    icon: Rocket,
    color: 'from-orange-500/10 to-transparent',
    border: 'border-orange-500/20',
    free: false,
    lessons: [
      'How to get your first users',
      'DM scripts that actually work',
      'How to sell an idea',
      'Pricing basics for beginners',
      'Your first ₹0 → ₹1 moment',
    ],
    output: 'You have your first users or first sale.',
  },
  {
    num: '06',
    title: 'Growth',
    tag: 'Scale',
    icon: TrendingUp,
    color: 'from-green-500/10 to-transparent',
    border: 'border-green-500/20',
    free: false,
    lessons: [
      'Assigning roles to your team',
      'How to delegate work properly',
      'Creating SOPs (process systems)',
      'Automation mindset',
      'Scaling from 1 user to many',
    ],
    output: 'Your business runs with a team — not just you.',
  },
]

const roles = [
  { icon: '👨‍💼', role: 'Founder', desc: 'Vision & leadership' },
  { icon: '📊', role: 'Product Manager', desc: 'Planning & structure' },
  { icon: '💻', role: 'Developer', desc: 'Builds the product' },
  { icon: '🎨', role: 'Designer', desc: 'UI & branding' },
  { icon: '📢', role: 'Marketing', desc: 'Users & growth' },
  { icon: '💰', role: 'Sales', desc: 'Revenue generation' },
  { icon: '🛠', role: 'Operations', desc: 'Daily systems' },
  { icon: '🧠', role: 'HR', desc: 'Team management' },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-4">The Learning Path</p>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          6 Levels.<br />One Outcome.
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
          Complete all 6 levels and you won't just have knowledge — you'll have a real company.
        </p>
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-sm text-zinc-400">
          <CheckCircle size={14} className="text-green-400" />
          Levels 01 & 02 are completely free
        </div>
      </section>

      {/* Levels */}
      <section className="px-6 pb-24 max-w-4xl mx-auto space-y-6">
        {levels.map((level) => {
          const Icon = level.icon
          return (
            <div
              key={level.num}
              className={`rounded-2xl border bg-gradient-to-br ${level.color} ${level.border} p-8 relative overflow-hidden`}
            >
              {/* Lock badge */}
              {!level.free && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-700 rounded-full px-3 py-1">
                  <Lock size={11} className="text-zinc-400" />
                  <span className="text-zinc-400 text-xs font-medium">Unlock</span>
                </div>
              )}
              {level.free && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
                  <CheckCircle size={11} className="text-green-400" />
                  <span className="text-green-400 text-xs font-medium">Free</span>
                </div>
              )}

              <div className="flex items-start gap-5 mb-6">
                <div className="flex-shrink-0">
                  <span className="font-mono text-5xl font-black text-white/10">{level.num}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Icon size={18} className="text-zinc-300" />
                    <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">{level.tag}</span>
                  </div>
                  <h2 className="text-3xl font-black">Level {level.num}: {level.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-3">What you learn</p>
                  <ul className="space-y-2">
                    {level.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="text-crimson mt-0.5 flex-shrink-0">→</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                    <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-2">Output</p>
                    <p className="text-white font-semibold leading-relaxed">{level.output}</p>
                  </div>
                  <div className="mt-4">
                    {level.free ? (
                      <Link href="#" className="btn-primary w-full justify-center text-sm py-3">
                        Start Level {level.num} <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button className="w-full border border-zinc-700 text-zinc-500 font-medium px-6 py-3 rounded-lg text-sm cursor-not-allowed flex items-center justify-center gap-2">
                        <Lock size={14} /> Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Company Roles */}
      <section className="px-6 py-20 border-t border-zinc-800 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Level 04 Preview</p>
            <h2 className="text-4xl font-black mb-3">8 Roles of a Real Company</h2>
            <p className="text-zinc-400">Every company needs all 8. You'll learn to fill them — or hire for them.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map(r => (
              <div key={r.role} className="card text-center hover:border-crimson/30 transition-colors">
                <div className="text-3xl mb-3">{r.icon}</div>
                <p className="font-bold text-sm mb-1">{r.role}</p>
                <p className="text-zinc-500 text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4">Start with Level 01. It's free.</h2>
          <p className="text-zinc-400 mb-8">No signup needed to begin. Just start.</p>
          <Link href="#" className="btn-primary text-base px-10 py-4">
            Begin Level 01: Mindset <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
