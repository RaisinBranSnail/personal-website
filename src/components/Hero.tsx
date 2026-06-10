'use client';

import { motion } from 'framer-motion';
import IdBadgeHeroCard from '@/components/IdBadgeHeroCard';
import HudButton from '@/components/HudButton';
import styles from './Hero.module.css';

const STATS = [
  { value: '4+', label: 'COMPLETED PROJECTS' },
  { value: '02', label: 'INTERNSHIPS' },
  { value: 'FS', label: 'FULL-STACK DEVELOPER' },
];

export default function Hero() {
  return (
    <section id="home" className={styles['hero-section']}>
      {/* Blueprint cross lines */}
      <div className={styles['hero-lines']} aria-hidden="true">
        <span className={styles['line-h1']} />
        <span className={styles['line-h2']} />
        <span className={styles['line-v1']} />
        <span className={styles['line-v2']} />
      </div>

      {/* Abstract pale blue shape */}
      <div className={styles['hero-shape']} aria-hidden="true" />

      <div className={styles['hero-container']}>
        {/* Top metadata strip */}
        <div className={styles['hero-meta-row']} aria-hidden="true">
          <span className="tech-label">COORDINATES: 36.6002° N / 121.8947° W</span>
          <span className="tech-label">MODE: DESIGN / DEVELOPMENT</span>
          <span className="tech-label">BUILD: 2026</span>
        </div>

        <div className={styles['hero-grid']}>
          <motion.div
            className={styles['hero-content']}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles['hero-system']}>
              [ SYSTEM ONLINE ] <span className="blink-cursor" />
            </p>

            <div className={styles['hero-title-stack']}>
              <span className={styles['hero-title-ghost']} aria-hidden="true">BRANDON</span>
              <h1 className={styles['hero-title']}>
                Brandon
                <br />
                Grimaldo
              </h1>
            </div>

            <p className={styles['hero-role']}>FULL-STACK DEVELOPER / WEB DESIGNER</p>

            <p className={styles['hero-subtitle']}>
              Building clean websites, apps, and digital systems with strong visuals
              and useful functionality.
            </p>

            <div className={styles['hero-buttons']}>
              <HudButton href="/#works">View My Work</HudButton>
              <HudButton
                variant="ghost"
                href="/images/brandonresume/Brandon Grimaldo Resume.pdf"
                download="Brandon Grimaldo Resume.pdf"
              >
                Download Resume
              </HudButton>
            </div>
          </motion.div>

          <motion.div
            className={styles['hero-badge-col']}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className={`${styles['hero-badge-frame']} brackets`}>
              <div className={styles['hero-badge-meta-top']}>
                <span className="tech-label">SUBJECT FILE</span>
                <span className="tech-label">REF: BG-00043</span>
              </div>
              <IdBadgeHeroCard />
              <div className={styles['hero-badge-meta-bottom']}>
                <span className="tech-label">CLEARANCE: FULL-STACK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          className={styles['hero-stats']}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className={styles['hero-stat']}>
              <span className={styles['hero-stat-value']}>{stat.value}</span>
              <span className="tech-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
