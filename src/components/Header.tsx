'use client';

import { useEffect, useState } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark'|'sand'>('dark')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    const current = (document.documentElement.getAttribute('data-theme') as 'dark'|'sand') || 'dark'
    setTheme(current)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'sand' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
              <span className="text-[var(--bg)] font-bold text-sm">B</span>
            </div>
            <span className="font-mono font-semibold text-lg">brandon.dev</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#work', label: 'Work' },
              { href: '#contact', label: 'Contact' },
            ].map(l => (
              <a key={l.href} href={l.href} className="text-[var(--text)] hover:text-[var(--accent)] transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-[var(--surface)] transition-colors" aria-label={`Switch theme`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
