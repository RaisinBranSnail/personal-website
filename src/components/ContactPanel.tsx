import HudButton from './HudButton';

/* Final transmission panel */
export default function ContactPanel() {
  return (
    <div className="panel brackets p-8 sm:p-14">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-10">
        <span className="tech-label">TRANSMISSION // 04</span>
        <span className="tech-label flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--accent-strong)] inline-block" />
          CHANNEL: OPEN
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.05] max-w-3xl mb-6">
        Let&apos;s build something clear, useful, and visual.
      </h2>
      <p className="text-[var(--muted)] max-w-xl mb-10">
        Open to opportunities, collaborations, and conversations about web development
        and software engineering.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-12">
        <HudButton href="mailto:BrandonGrimaldo16@gmail.com">Initiate Contact</HudButton>
        <HudButton
          variant="ghost"
          href="https://www.linkedin.com/in/brandon-grimaldo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </HudButton>
        <HudButton
          variant="ghost"
          href="https://github.com/RaisinBranSnail"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </HudButton>
      </div>

      <div className="pt-6 border-t border-[var(--border-soft)] flex flex-wrap gap-x-8 gap-y-2">
        <span className="tech-label">EMAIL: BRANDONGRIMALDO16@GMAIL.COM</span>
        <span className="tech-label">LOCATION: CALIFORNIA, USA</span>
        <span className="tech-label">RESPONSE TIME: &lt; 24H</span>
      </div>
    </div>
  );
}
