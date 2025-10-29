'use client';

import { useEffect, useState } from 'react';
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
          <div className={styles['hero-content']}>
            <div>
              <h1 className={styles['hero-title']}>
                I&apos;m Brandon, a Software Engineer <code className="font-mono text-[var(--accent)]">() =&gt;</code>
              </h1>
              <p className={styles['hero-subtitle']}>
                I love creating websites and software solutions React, Node, and Python.<span className="caret" />
              </p>
            </div>

            <div className={styles['hero-button-group']}>
              <a href="#works" className={styles['hero-primary-button']}>
                View Portfolio
              </a>
              <a href="#contact" className={styles['hero-secondary-button']}>
                Contact Me
              </a>
            </div>

            <div className={styles['hero-scroll-indicator']}>
              <span className="font-mono">SCROLL ↓</span>
              <div className={styles['hero-scroll-line']} />
            </div>
          </div>

          <div className={styles['hero-avatar-container']}>
            <div className={styles['hero-avatar-wrapper']}>
              {/* soft glow behind avatar */}
              <div className={styles['hero-avatar-glow']} />

              {/* portrait */}
              <div className={styles['hero-avatar']}>
                <Image
                  src="/images/IMG_0757.jpg"
                  alt="Brandon portrait"
                  fill
                  sizes="(min-width:1024px) 20rem, 16rem"
                  priority
                  className="object-cover"
                />
              </div>

              {/* floating dots */}
              <div className={styles['hero-floating-dot-1']} />
              <div className={styles['hero-floating-dot-2']} />
            </div>
          </div>
        </div>

        <div className={styles['hero-stats-container']}>
          <div className={styles['hero-stats-grid']}>
            {[
              { n: '024', l: 'Shipped Projects' },
              { n: '05', l: 'Years Coding' },
              { n: '120', l: 'Repos' },
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
