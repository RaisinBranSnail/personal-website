'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HudButton from '@/components/HudButton';
import styles from './Hero.module.css';

const HERO_TITLE = 'BRANDON\nGRIMALDO';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    if (shouldReduceMotion === null) return;

    if (shouldReduceMotion) {
      setTypedTitle(HERO_TITLE);
      return;
    }

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      index += 1;
      setTypedTitle(HERO_TITLE.slice(0, index));

      if (index < HERO_TITLE.length) {
        const currentCharacter = HERO_TITLE[index - 1];
        const nextDelay = currentCharacter === '\n' ? 180 : 58 + Math.random() * 46;
        timeoutId = setTimeout(typeNextCharacter, nextDelay);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, 420);

    return () => clearTimeout(timeoutId);
  }, [shouldReduceMotion]);

  const titleLines = typedTitle.split('\n');
  const firstLine = titleLines[0] || '';
  const secondLine = titleLines[1] || '';
  const isTypingSecondLine = typedTitle.includes('\n');

  return (
    <section id="home" className={styles['hero-section']}>
      <div className={styles['hero-lines']} aria-hidden="true">
        <span className={styles['line-h1']} />
        <span className={styles['line-h2']} />
        <span className={styles['line-h3']} />
        <span className={styles['line-v1']} />
        <span className={styles['line-v2']} />
        <span className={styles['line-v3']} />
        <span className={styles['line-v4']} />
      </div>

      <div className={styles['hero-background-shapes']} aria-hidden="true">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={styles['floating-shape']} />
        ))}
      </div>

      <div className={styles['hero-container']}>
        <div className={styles['hero-meta-row']} aria-hidden="true">
          <span className="tech-label">COORDINATES: 36.6002 N / 121.8947 W</span>
          <span className={styles['meta-divider']} />
          <span className="tech-label">MODE: DESIGN / DEVELOPMENT</span>
          <span className={styles['meta-divider']} />
          <span className="tech-label">BUILD: 2026</span>
        </div>

        <motion.div
          className={styles['hero-content']}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles['target-plus-left-top']} aria-hidden="true">+</span>
          <span className={styles['target-plus-right-top']} aria-hidden="true">+</span>
          <span className={styles['target-plus-left-bottom']} aria-hidden="true">+</span>
          <span className={styles['target-plus-right-bottom']} aria-hidden="true">+</span>

          <p className={styles['hero-system']}>
            [ SYSTEM ONLINE ] <span className="blink-cursor" />
          </p>

          <h1 className={styles['hero-title']} aria-label="Brandon Grimaldo">
            <span className={styles['hero-title-text']} aria-hidden="true">
              <span className={styles['hero-title-line']}>
                {firstLine || '\u00A0'}
                {!isTypingSecondLine && <span className={styles['type-cursor']} aria-hidden="true" />}
              </span>
              <span className={styles['hero-title-line']}>
                {secondLine || '\u00A0'}
                {isTypingSecondLine && <span className={styles['type-cursor']} aria-hidden="true" />}
              </span>
            </span>
          </h1>

          <span className={styles['center-tick']} aria-hidden="true" />

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

        <div className={styles['hero-bottom-indicator']} aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </div>
    </section>
  );
}
