import Footer from '@/components/layout/Footer'
import { ArrowRight, Lock, CheckCircle, Brain, Zap, Wrench, Building2, Rocket, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const levels = [
  {
    num: '01', title: 'Mindset', tag: 'Foundation', icon: Brain,
    border: 'border-crimson/30', bg: 'bg-red-50',
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
    num: '02', title: 'Idea', tag: 'Discovery', icon: Zap,
    border: 'border-yellow-200', bg: 'bg-yellow-50',
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
    num: '03', title: 'Builder', tag: 'Skills', icon: Wrench,
    border: 'border-blue-200', bg: 'bg-blue-50',
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
    num: '04', title: 'Company', tag: 'Structure', icon: Building2,
    border: 'border-purple-200', bg: 'bg-purple-50',
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
    num: '05', title: 'Startup', tag: 'Execution', icon: Rocket,
    border: 'border-orange-200', bg: 'bg-orange-50',
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
    num: '06', title: 'Growth', tag: 'Scale', icon: TrendingUp,
    border: 'border-green-200', bg: 'bg-green-50',
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
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-4">The Learning Path</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5 text-zinc-900">
          6 Levels.<br />One Outcome.
        </h1>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-6">
          Complete all 6 levels and you won't just have knowledge — you'll have a real company.
        </p>
        <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 text-sm text-zinc-500">
          <CheckCircle size={13} className="text-green-500" />
          Levels 01 &amp; 02 are completely free
        </div>
      </section>

      {/* Levels */}
      <section className="px-6 pb-20 max-w-4xl mx-auto space-y-5">
        {levels.map((level) => {
          const Icon = level.icon
          return (
            <div key={level.num} className={`rounded-2xl border ${level.border} ${level.bg} p-6 relative`}>
              {/* Badge */}
              <div className="absolute top-5 right-5">
                {level.free ? (
                  <div className="flex items-center gap-1.5 bg-white border border-green-200 rounded-full px-3 py-1">
                    <CheckCircle size={11} className="text-green-500" />
                    <span className="text-green-600 text-xs font-semibold">Free</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-full px-3 py-1">
                    <Lock size={11} className="text-zinc-400" />
                    <span className="text-zinc-400 text-xs font-medium">Unlock</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex items-start gap-4 mb-5">
                <span className="font-mono text-4xl font-black text-black/10">{level.num}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={15} className="text-zinc-500" />
                    <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">{level.tag}</span>
                  </div>
                  <h2 className="text-2xl font-black text-zinc-900">Level {level.num}: {level.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lessons */}
                <div>
                  <p className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-3">What you learn</p>
                  <ul className="space-y-2">
                    {level.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                        <span className="text-crimson mt-0.5 flex-shrink-0">→</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Output + CTA */}
                <div className="flex flex-col justify-between gap-4">
                  <div className="bg-white rounded-xl p-4 border border-white/80 shadow-sm">
                    <p className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-2">Output</p>
                    <p className="text-zinc-800 font-semibold text-sm leading-relaxed">{level.output}</p>
                  </div>
                  {level.free ? (
                    <Link href="#" className="btn-primary justify-center text-sm py-2.5">
                      Start Level {level.num} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button disabled className="w-full border border-zinc-300 text-zinc-400 font-medium px-5 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 cursor-not-allowed bg-white">
                      <Lock size={13} /> Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Company Roles */}
      <section className="px-6 py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-3">Level 04 Preview</p>
            <h2 className="text-3xl font-black mb-2 text-zinc-900">8 Roles of a Real Company</h2>
            <p className="text-zinc-500 text-sm">Every company needs all 8. You'll learn to fill them — or hire for them.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roles.map(r => (
              <div key={r.role} className="bg-white border border-zinc-200 rounded-xl p-4 text-center hover:border-crimson/30 hover:shadow-sm transition-all">
                <div className="text-2xl mb-2">{r.icon}</div>
                <p className="font-bold text-sm text-zinc-900 mb-1">{r.role}</p>
                <p className="text-zinc-400 text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-3 text-zinc-900">Start with Level 01. It's free.</h2>
          <p className="text-zinc-500 text-sm mb-8">No signup needed to begin. Just start.</p>
          <Link href="#" className="btn-primary px-10 py-3">
            Begin Level 01: Mindset <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
