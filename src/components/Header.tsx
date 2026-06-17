'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORK_LINKS = [
  { href: '/projects/origami-design', label: 'Origami Web Design' },
  { href: '/projects/kims-mart', label: 'Kims Mart Davis' },
  { href: '/projects/chloe-portfolio', label: 'Chloe Yap Portfolio' },
  { href: '/projects/sunny-day-socials', label: 'Sunny Day Socials' },
  { href: '/projects/kaizen-hosting', label: 'Kaizen Hosting' },
];

const NAV_LINKS = [
  { href: '/#home', label: 'HOME' },
  { href: '/#about', label: 'ABOUT' },
  { href: '/#resume', label: 'RESUME' },
  { href: '/#contact', label: 'CONTACT' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink =
    'inline-block font-mono text-[10px] tracking-[0.18em] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--accent)]/35 px-2.5 py-1.5 transition-colors duration-200';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-5">
      <div
        className={`max-w-[900px] mx-auto brackets border border-[var(--border)] backdrop-blur-md transition-all duration-200 ${
          isScrolled ? 'bg-[var(--surface-strong)]' : 'bg-[var(--surface)]'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-6 h-6 border border-[var(--border)] bg-[var(--accent)]/35 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors duration-200">
              <span className="font-mono font-bold text-[10px] text-[var(--text)]">B</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--text)]">BRANDON.DEV</span>
              <span className="tech-label mt-1">SYSTEM: PORTFOLIO</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-3">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a key={link.href} href={link.href} className={navLink}>{link.label}</a>
            ))}

            <div
              className="relative flex items-center"
              onMouseEnter={() => setWorksOpen(true)}
              onMouseLeave={() => setWorksOpen(false)}
            >
              <a href="/#works" className={navLink}>WORKS</a>
              <AnimatePresence>
                {worksOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-60 border border-[var(--border)] bg-[var(--bg-alt)] shadow-[0_16px_40px_rgba(27,36,48,0.12)] py-1"
                  >
                    {WORK_LINKS.map((link, i) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--accent)]/40 transition-colors duration-200"
                      >
                        <span className="text-[var(--line)]">{String(i + 1).padStart(2, '0')}</span>
                        {link.label.toUpperCase()}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.slice(2).map((link) => (
              <a key={link.href} href={link.href} className={navLink}>{link.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="tech-label flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--accent-strong)] inline-block animate-pulse" />
              STATUS: ONLINE
            </span>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-[var(--text)]"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[var(--border-soft)]"
            >
              <div className="flex flex-col px-4 py-3">
                {[NAV_LINKS[0], NAV_LINKS[1], { href: '/#works', label: 'WORKS' }, NAV_LINKS[2], NAV_LINKS[3]].map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 py-2.5 font-mono text-xs tracking-[0.14em] text-[var(--muted)] hover:text-[var(--text)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-[var(--line)] text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
