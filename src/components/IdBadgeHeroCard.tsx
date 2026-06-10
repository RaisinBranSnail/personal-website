'use client';

import Image from 'next/image';
import styles from './IdBadgeHeroCard.module.css';

/* Fully coded ID badge: black plastic holder + white subject card */
export default function IdBadgeHeroCard() {
  return (
    <div className={styles.wrapper} aria-label="Brandon Grimaldo ID badge">
      <div className={styles.holder}>
        {/* Lanyard cutouts */}
        <div className={styles.lanyardRow} aria-hidden="true">
          <span className={styles.holeRound} />
          <span className={styles.holeSlot} />
          <span className={styles.holeRound} />
        </div>

        {/* Ribbed press seal */}
        <div className={styles.seal} aria-hidden="true" />

        {/* White card */}
        <div className={styles.card}>
          <p className={styles.subjectLabel}>SUBJECT:</p>
          <div className={styles.rule} />

          <p className={styles.name}>
            Brandon
            <br />
            Grimaldo
          </p>
          <div className={styles.rule} />

          {/* Photo + barcode */}
          <div className={styles.photoRow}>
            <div className={styles.photoBox}>
              <Image
                src="/images/hero/brandon-portrait.png"
                alt="Brandon Grimaldo portrait"
                fill
                priority
                unoptimized
                className={styles.photo}
                sizes="(min-width: 1024px) 200px, 170px"
              />
            </div>
            <div className={styles.barcode} aria-hidden="true" />
          </div>

          <p className={styles.idNumber}>ID: 00043</p>
          <div className={styles.rule} />

          <div className={styles.footer}>
            <p className={styles.dept}>
              Software
              <br />
              Engineering Dept.
            </p>
            {/* Minimal person logo: circle over split triangle */}
            <svg className={styles.logo} viewBox="0 0 32 36" fill="currentColor" aria-hidden="true">
              <circle cx="16" cy="7" r="5" />
              <path d="M16 14 L28 34 H19 V24 H13 V34 H4 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
