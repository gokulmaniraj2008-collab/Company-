import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const roles = [
  { icon: '👨‍💼', role: 'Founder', desc: 'Vision, leadership, and final decisions.' },
  { icon: '📊', role: 'Product Manager', desc: 'Planning, structure, and roadmap.' },
  { icon: '💻', role: 'Developer', desc: 'Builds the product.' },
  { icon: '🎨', role: 'Designer', desc: 'UI, branding, and user experience.' },
  { icon: '📢', role: 'Marketing', desc: 'Growth, users, and awareness.' },
  { icon: '💰', role: 'Sales', desc: 'Revenue and customer relationships.' },
  { icon: '🛠', role: 'Operations', desc: 'Daily systems and execution.' },
  { icon: '🧠', role: 'HR', desc: 'Team management and culture.' },
]

const team = [
  { name: 'GOKUL M', role: 'Founder', tag: 'Founder', bio: 'Builder. Thinker. Creator of GKFXL.', initials: 'GM' },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-3">The People</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Built by builders.</h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto">
          GKFXL is built by a small team with one goal — turn beginners into company owners.
        </p>
      </section>

      {/* Team Members */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map(member => (
            <div key={member.name} className="card text-center hover:border-crimson/30 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-crimson rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
                {member.initials}
              </div>
              <span className="text-xs font-semibold text-crimson bg-crimson/10 px-3 py-1 rounded-full">{member.tag}</span>
              <h3 className="text-lg font-black mt-3 mb-1">{member.name}</h3>
              <p className="text-zinc-500 text-xs mb-2">{member.role}</p>
              <p className="text-zinc-400 text-sm">{member.bio}</p>
            </div>
          ))}

          {/* Open Roles */}
          {['Designer', 'Developer', 'Marketing'].map(open => (
            <div key={open} className="card text-center border-dashed hover:border-crimson/30 transition-all">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 font-black text-2xl mx-auto mb-4">+</div>
              <span className="text-xs font-semibold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">Open Role</span>
              <h3 className="text-lg font-black mt-3 mb-1 text-zinc-400">{open}</h3>
              <p className="text-zinc-400 text-sm mt-2">Complete all 6 levels and apply to join.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Roles */}
      <section className="px-6 py-16 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-3">Company Structure</p>
            <h2 className="text-3xl font-black mb-3">Every company needs these 8 roles.</h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">Learn them in Level 04. Then build your own team with them.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map(r => (
              <div key={r.role} className="card text-center hover:border-crimson/30 hover:shadow-sm transition-all">
                <div className="text-2xl mb-2">{r.icon}</div>
                <p className="font-bold text-sm mb-1">{r.role}</p>
                <p className="text-zinc-400 text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-3">Want to join GKFXL?</h2>
          <p className="text-zinc-500 text-sm mb-2">
            We don't hire. We <span className="text-crimson font-semibold">build</span>.
          </p>
          <p className="text-zinc-400 text-sm mb-8">
            Complete all 6 levels. Build something real. Then we talk.
          </p>
          <a href="/learn" className="btn-primary px-8 py-3">
            Start Learning →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
