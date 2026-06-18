import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-crimson rounded-lg flex items-center justify-center text-white font-black text-sm">G</span>
            <span className="font-black text-xl tracking-wider text-white">GKFXL</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            We transform beginners into company owners by teaching mindset, skills, and real startup building step-by-step.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-4">Platform</p>
          <div className="flex flex-col gap-2">
            {['Home', 'Vision', 'Learn', 'Team', 'Contact'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-zinc-400 hover:text-white text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-4">Tools</p>
          <div className="flex flex-col gap-2">
            {['CEO AI', 'Founder OS', 'Idea Lab', 'Company Builder'].map(item => (
              <Link key={item} href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs">© 2025 GKFXL. All rights reserved.</p>
        <p className="text-zinc-600 text-xs">Built for builders. Everyone can learn. Only builders join.</p>
      </div>
    </footer>
  )
}
