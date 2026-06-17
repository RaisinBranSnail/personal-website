import styles from './GridBackground.module.css';

/* Global fixed backdrop: blueprint grid, NOISE-style abstract blocks, static grain */
export default function GridBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.fineGrid} />
      <div className={styles.coarseGrid} />

      {/* Blueprint divider lines */}
      <span className={styles.frameH} style={{ top: '22%' }} />
      <span className={styles.frameH} style={{ top: '58%' }} />
      <span className={styles.frameV} style={{ left: '28%' }} />
      <span className={styles.frameV} style={{ right: '22%' }} />

      {/* Layered abstract geometric blocks */}
      <div className={styles.shapes}>
        <div className={`${styles.shape} ${styles.shapeA}`} />
        <div className={`${styles.shape} ${styles.shapeB}`} />
        <div className={`${styles.shape} ${styles.shapeC}`} />
        <div className={`${styles.shape} ${styles.shapeD}`} />
        <div className={`${styles.shape} ${styles.shapeE}`} />
        <div className={`${styles.shape} ${styles.shapeF}`} />
        <div className={`${styles.shape} ${styles.shapeG}`} />
        <div className={`${styles.shape} ${styles.shapeH}`} />
      </div>

      {/* Static / film grain texture */}
      <div className={styles.grainCoarse} />
      <div className={styles.grainFine} />
      <div className={styles.grainStatic} />

      <div className="scanline" />
    </div>
  );
}
