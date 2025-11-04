'use client';

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark'|'sand'>('dark')
  const [worksOpen, setWorksOpen] = useState(false)

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
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-md flex items-center justify-center">
              <span className="text-[var(--bg)] font-bold text-sm">B</span>
            </div>
            <span className="font-mono font-semibold text-lg">brandon.dev</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/#home', label: 'Home' },
              { href: '/#about', label: 'About' },
            ].map(l => (
              <a key={l.href} href={l.href} className="text-[var(--text)] hover:text-[var(--accent)] transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
              </a>
            ))}
            
            {/* Works dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWorksOpen(true)}
              onMouseLeave={() => setWorksOpen(false)}
            >
              <a href="/#works" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors relative">
                Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
              </a>
              <AnimatePresence>
                {worksOpen && (
                  <motion.div
                    key="works-dd"
                    className="absolute top-full left-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    <div className="py-2">
                      <a href="/projects/origami-design" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface)]/60 hover:text-[var(--accent)] transition-colors">Origami Web Design</a>
                      <a href="/projects/kims-mart" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface)]/60 hover:text-[var(--accent)] transition-colors">Kims Mart Davis</a>
                      <a href="/projects/chloe-portfolio" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface)]/60 hover:text-[var(--accent)] transition-colors">Chloe Yap Portfolio</a>
                      <a href="/projects/pioneer" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface)]/60 hover:text-[var(--accent)] transition-colors">Pioneer</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="/#resume" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors relative group">
              Resume
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
            </a>
          </nav>

          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-[var(--surface)] transition-colors" aria-label={`Switch theme`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
