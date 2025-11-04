'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero(){
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles['hero-section']}>
      <div className={styles['hero-container']}>
        <div className={styles['hero-grid']}>
          <motion.div
            className={styles['hero-content']}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div>
              <motion.h1 className={styles['hero-title']} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                I&apos;m Brandon, a Software Engineer <code className="font-mono text-[var(--accent)]">() =&gt;</code>
              </motion.h1>
              <motion.p className={styles['hero-subtitle']} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                I love creating websites and software solutions React, Node, and Python.<span className="caret" />
              </motion.p>
            </div>

            <motion.div className={styles['hero-button-group']} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }}>
              <a href="/#works" className={styles['hero-secondary-button']}>
                View Projects
              </a>
              <a href="/#resume" className={styles['hero-secondary-button']}>
                View Resume
              </a>
            </motion.div>

            <div className={styles['hero-scroll-indicator']}>
              <span className="font-mono">SCROLL ↓</span>
              <div className={styles['hero-scroll-line']} />
            </div>
          </motion.div>

          <motion.div className={styles['hero-avatar-container']} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}>
            <div className={styles['hero-avatar-wrapper']}>
              {/* soft glow behind avatar */}
              <div className={styles['hero-avatar-glow']} />

              {/* portrait */}
              <div className={styles['hero-avatar']}>
                <Image
                  src="/images/IMG_0757.jpg"
                  alt="Brandon portrait"
                  fill
                  sizes="(min-width:1024px) 24rem, 16rem"
                  priority
                  className="object-cover"
                />
              </div>

              {/* floating dots */}
              <div className={styles['hero-floating-dot-1']} />
              <div className={styles['hero-floating-dot-2']} />
            </div>
          </motion.div>
        </div>

        <div className={styles['hero-stats-container']}>
          <div className={styles['hero-stats-grid']}>
            {[
              { n: '4', l: 'Shipped Projects' },
              { n: '05', l: 'Years Coding' },
              { n: '2', l: 'Internships' },
            ].map(s => (
              <div key={s.l} className={styles['hero-stat-item']}>
                <div className={styles['hero-stat-number']}>{s.n}</div>
                <div className={styles['hero-stat-label']}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className={styles['hero-scroll-button']}
        aria-label="Scroll to about section"
      >
        <svg className={styles['hero-scroll-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  )
}
