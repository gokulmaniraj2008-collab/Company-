import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 bg-crimson rounded-lg flex items-center justify-center text-white font-black text-xs">G</span>
            <span className="font-black text-lg tracking-wider text-zinc-900">GKFXL</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            We transform beginners into company owners by teaching mindset, skills, and real startup building step-by-step.
          </p>
        </div>

        <div>
          <p className="text-zinc-900 font-semibold text-sm mb-3">Platform</p>
          <div className="flex flex-col gap-2">
            {['Home', 'Vision', 'Learn', 'Team', 'Contact'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-zinc-900 font-semibold text-sm mb-3">Tools</p>
          <div className="flex flex-col gap-2">
            {['CEO AI', 'Founder OS', 'Idea Lab', 'Company Builder'].map(item => (
              <Link key={item} href="#" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-zinc-400 text-xs">© 2025 GKFXL. All rights reserved.</p>
        <p className="text-zinc-400 text-xs">Everyone can learn. Only builders join.</p>
      </div>
    </footer>
  )
}
