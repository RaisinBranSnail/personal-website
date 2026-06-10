'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TechTag from './TechTag';

export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  thumbnail: string;
  live?: string;
};

type ProjectCardProps = {
  project: ProjectCardData;
  index?: number;
};

/* Futuristic case-study card: numbered, outlined, mono metadata */
export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="group brackets panel flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-strong)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Preview */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
        <Image
          src={project.thumbnail}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-2 left-2 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] bg-[var(--surface-strong)] border border-[var(--border-soft)] text-[var(--text)]">
          PRJ_{number}
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="tech-label mb-1.5">{project.category}</p>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--text)]">
              {project.title}
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--line)] shrink-0">{number}</span>
        </div>

        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>

        {/* Metadata + links row */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-soft)]">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--text)] hover:bg-[var(--accent)]/50 px-1.5 py-1 -ml-1.5 transition-colors duration-200"
          >
            [ View Case ]
          </Link>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
