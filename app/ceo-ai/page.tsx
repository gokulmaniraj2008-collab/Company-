'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Brain, Loader2, Copy, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'

const SECTIONS = [
  { key: 'summary', icon: '👑', label: 'CEO Summary' },
  { key: 'performance', icon: '📊', label: 'Team Performance' },
  { key: 'problems', icon: '⚙️', label: 'Key Problems' },
  { key: 'focus', icon: '📦', label: 'Best Focus Area' },
  { key: 'stop', icon: '❌', label: 'What To Stop' },
  { key: 'start', icon: '🚀', label: 'What To Start' },
  { key: 'decision', icon: '🧠', label: 'AI Decision' },
  { key: 'action', icon: '📌', label: '24-Hour Action Plan' },
  { key: 'risk', icon: '⚠️', label: 'Risk Alerts' },
  { key: 'advice', icon: '💡', label: 'Final CEO Advice' },
]

const EXAMPLE = `Team update - June 18:
- Arjun (Developer): Still working on login page. 3 days delayed. No update given.
- Priya (Designer): Completed homepage design. Waiting for feedback.
- Ravi (Marketing): Posted 2 Instagram reels. Got 150 new followers.
- Meena (Sales): Had 3 customer calls. 1 interested buyer. No follow-up done yet.
- No team meeting this week.
- Product launch target: June 25.`

export default function CeoAiPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleSection = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const parseSection = (text: string, label: string) => {
    const lines = text.split('\n')
    const start = lines.findIndex(l => l.includes(label))
    if (start === -1) return null
    const end = lines.findIndex((l, i) => i > start + 1 && SECTIONS.some(s => l.includes(s.label)))
    const content = lines.slice(start + 1, end === -1 ? undefined : end).filter(l => l.trim()).join('\n')
    return content || null
  }

  const analyze = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult('')
    setExpanded({})

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are "Auto CEO AI" — an autonomous startup decision-making system acting as CEO of a small startup team. Analyze the team data provided and respond ONLY using this exact format with these exact section headers:

👑 CEO SUMMARY:
[brief overview]

📊 TEAM PERFORMANCE:
- Strong members: [names or "unclear"]
- Weak members: [names or "unclear"]  
- Inactive members: [names or "unclear"]

⚙️ KEY PROBLEMS:
[bullet list of main issues]

📦 BEST FOCUS AREA:
[what to focus on today]

❌ WHAT TO STOP:
[low-value work or weak activities]

🚀 WHAT TO START:
[new actions for growth]

🧠 AI DECISION:
[clear recommended decision]

📌 24-HOUR ACTION PLAN:
- Step 1: [action]
- Step 2: [action]
- Step 3: [action]

⚠️ RISK ALERTS:
[what may fail]

💡 FINAL CEO ADVICE:
[one strong decision-level sentence]

Rules: Use only provided data. Do NOT invent info. If unclear write "unclear". Be strict and practical.`,
          messages: [{ role: 'user', content: `Analyze this team data:\n\n${input}` }],
        }),
      })

      const data = await response.json()
      const text = data.content?.[0]?.text || ''
      setResult(text)
      // Expand all sections by default
      const allExpanded: Record<string, boolean> = {}
      SECTIONS.forEach(s => { allExpanded[s.key] = true })
      setExpanded(allExpanded)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setInput('')
    setResult('')
    setError('')
    setExpanded({})
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-10 px-6 max-w-3xl mx-auto text-center">
        <div className="w-12 h-12 bg-crimson/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Brain size={22} className="text-crimson" />
        </div>
        <p className="text-crimson text-xs font-semibold tracking-widest uppercase mb-3">AI-Powered Tool</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900">CEO AI</h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Paste your team messages, updates, or reports. Get instant CEO-level analysis — problems, decisions, and a 24-hour action plan.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-3xl mx-auto space-y-5">

        {/* Input */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Team Data Input</p>
            <button
              onClick={() => setInput(EXAMPLE)}
              className="text-xs text-crimson hover:underline font-medium"
            >
              Use example
            </button>
          </div>
          <textarea
            rows={8}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste team messages, updates, reports here..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-crimson transition-colors resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-zinc-400">{input.length} characters</span>
            <div className="flex gap-2">
              {result && (
                <button onClick={reset} className="btn-secondary text-xs py-2 px-3 gap-1">
                  <RotateCcw size={12} /> Reset
                </button>
              )}
              <button
                onClick={analyze}
                disabled={loading || !input.trim()}
                className="btn-primary text-xs py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={13} className="animate-spin" /> Analyzing...</>
                ) : (
                  <><Brain size={13} /> Analyze</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Analysis Results</p>
              <button onClick={copyResult} className="btn-secondary text-xs py-1.5 px-3 gap-1">
                <Copy size={12} /> {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>

            {SECTIONS.map(section => {
              const content = parseSection(result, section.label)
              if (!content) return null
              const isOpen = expanded[section.key]
              return (
                <div key={section.key} className="card border-zinc-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-bold text-sm text-zinc-900">{section.label}</span>
                    </div>
                    {isOpen ? <ChevronUp size={15} className="text-zinc-400" /> : <ChevronDown size={15} className="text-zinc-400" />}
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-zinc-100">
                      <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line">{content}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* How it works */}
        {!result && !loading && (
          <div className="card bg-zinc-50 border-zinc-200">
            <p className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-4">How It Works</p>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Paste your team messages, daily updates, or project reports above.' },
                { step: '2', text: 'Click Analyze — the AI reads your data like a real CEO.' },
                { step: '3', text: 'Get a full breakdown: team performance, problems, decisions, and a 24-hour action plan.' },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-crimson text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{item.step}</span>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
