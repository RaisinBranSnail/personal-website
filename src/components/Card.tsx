'use client';

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './Card.module.css'

type ChromeStyle = 'pixel-edge' | 'none' | 'label' | 'tabs' | 'notebook';

export default function Card({ 
  title, 
  children, 
  className = '', 
  chrome = 'pixel-edge' 
}: { 
  title: string, 
  children: ReactNode, 
  className?: string,
  chrome?: ChromeStyle 
}) {
  const renderHeader = () => {
    switch (chrome) {
      case 'pixel-edge':
        return (
          <div className="relative">
            <div className="h-1.5 bg-[var(--accent)]" />
            <div className="flex items-center justify-between h-8 px-3 bg-[var(--surface)] border-b border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--muted)]">{title}</span>
              <span className="text-[var(--accent)] text-xs">▼</span>
            </div>
          </div>
        );
      case 'none':
        return null;
      case 'label':
        return (
          <div className="flex items-center h-8 px-3 bg-[var(--surface)] border-b border-[var(--border)]">
            <span className="font-mono text-xs text-[var(--muted)]">{title}</span>
          </div>
        );
              case 'tabs':
          return (
            <div className="flex items-center gap-1 h-10 px-4 bg-[var(--surface)]/60 backdrop-blur-md border-b border-[var(--border)]/30 shadow-lg">
              <span className="px-3 py-1.5 bg-[var(--accent)]/20 backdrop-blur-sm border border-[var(--accent)]/40 text-[var(--accent)] rounded-t-lg text-xs font-mono shadow-sm">{title}</span>
            </div>
          );
      case 'notebook':
        return (
          <div className="relative">
            <div className="h-8 px-3 bg-[var(--surface)] border-b border-[var(--border)] flex items-center">
              <span className="font-mono text-xs text-[var(--muted)]">{title}</span>
            </div>
            <div className="h-px bg-[var(--border)]">
              <div className={`w-full h-px bg-[var(--accent)] opacity-50 ${styles.notebookDividerAccent}`} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
    >
      {renderHeader()}
      <div className="p-6">{children}</div>
    </motion.div>
  )
}
