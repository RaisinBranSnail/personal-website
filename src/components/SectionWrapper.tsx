import { type ReactNode } from 'react';

type SectionWrapperProps = {
  id: string;
  number: string;
  label: string;
  title: string;
  meta?: string;
  children: ReactNode;
};

/* Section shell: numbered header row with rule line + uppercase labels */
export default function SectionWrapper({ id, number, label, title, meta, children }: SectionWrapperProps) {
  return (
    <section id={id} className="relative py-16 md:py-24">
      <div className="section-wrap">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[var(--muted)]">{number}</span>
            <span className="tech-label">{label}</span>
          </div>
          {meta && <span className="tech-label hidden sm:block">{meta}</span>}
        </div>
        <div className="h-px bg-[var(--line)] opacity-50 mb-8" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
