'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionWrapper from '@/components/SectionWrapper';
import ProjectCard, { type ProjectCardData } from '@/components/ProjectCard';
import HudButton from '@/components/HudButton';
import TechTag from '@/components/TechTag';
import ContactPanel from '@/components/ContactPanel';
import Image from 'next/image';
import { useState } from 'react';

const FEATURED_PROJECTS: ProjectCardData[] = [
  {
    slug: 'origami-design',
    title: 'Origami Web Design',
    category: 'Design Agency',
    description:
      'A modern design agency website showcasing creative services and portfolio work. Features interactive elements, smooth transitions, and responsive layouts.',
    tech: ['React', 'GSAP', 'Sass', 'Netlify'],
    thumbnail: '/images/origamiwebdesign/1.png',
    live: 'https://www.origamiwebdesign.com',
  },
  {
    slug: 'kims-mart',
    title: 'Kims Mart Davis',
    category: 'E-commerce',
    description:
      'A full-stack e-commerce platform for a local market in Davis. Features inventory management, online ordering, and payment processing.',
    tech: ['React', 'Express', 'MongoDB', 'Stripe'],
    thumbnail: '/images/kimsmart/1.png',
    live: 'https://kimsmartdavis.com',
  },
  {
    slug: 'chloe-portfolio',
    title: 'Chloe Yap Portfolio',
    category: 'Creative Portfolio',
    description:
      'A stunning portfolio website showcasing creative work and artistic projects. Features smooth animations, responsive design, and elegant typography.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    thumbnail: '/images/chloeyap/first_image.png',
    live: 'https://chloeyap.com',
  },
  {
    slug: 'sunny-day-socials',
    title: 'Sunny Day Socials',
    category: 'Marketing Site',
    description:
      'Multi-page marketing site for Hawaii social media management and photography: portfolio gallery, packages, services, and lead capture delivered in about a week.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'],
    thumbnail: '/images/sunny-day-socials/1.png',
    live: 'https://www.sunnydaysocials.com/',
  },
  {
    slug: 'kaizen-hosting',
    title: 'Kaizen Hosting',
    category: 'Minecraft Hosting',
    description:
      'Full-stack Minecraft host: marketing site, Supabase auth, and a Pterodactyl-powered dashboard for servers, files, and mods.',
    tech: ['Next.js 16', 'React 19', 'Supabase', 'Pterodactyl'],
    thumbnail: '/images/kaizen-hosting/1.png',
    live: 'https://www.kaizenhosting.com/',
  },
];

const INTERESTS = ['Skateboarding', 'Music', 'Drawing', 'Graphic Design'];

const EXPERIENCE = [
  {
    role: 'Full Stack Intern',
    org: 'DKomplex · Seaside, CA',
    period: 'AUG 2024 – NOV 2024',
    points: [
      'Built and maintained a MERN stack web app to manage organizational roles and performance data',
      'Developed a dynamic Role Specification Form in React with tabs and real-time input handling',
      'Implemented secure JWT authentication and protected routes for user access control',
      'Created frontend components using React and Tailwind CSS, integrated with Node.js/Express backend',
    ],
  },
  {
    role: 'Data Analyst Intern',
    org: 'The SETI Institute · Mountain View, CA',
    period: 'JUN 2023 – SEP 2023',
    points: [
      'Wrote Python scripts using NumPy, Pandas, and Matplotlib to clean, process, and visualize pulsar radio wave data',
      'Automated extraction and transformation of raw .fits telescope data into structured formats for analysis',
      'Used Jupyter Notebooks for reproducible research and collaboration with astrophysicists and data scientists',
    ],
  },
];

const FOCUS_AREAS = [
  'Full-stack web development',
  'UI/UX & responsive design',
  'API integration & deployment',
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyResumeToClipboard = async () => {
    try {
      const response = await fetch('/images/brandonresume/Brandon Grimaldo Resume.pdf');
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ 'application/pdf': blob });
      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(
          window.location.origin + '/images/brandonresume/Brandon Grimaldo Resume.pdf'
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
    }
  };

  return (
    <main id="main" className="min-h-screen relative">
      <Header />
      <Hero />

      {/* 01 — ABOUT: split layout, label left / panel right */}
      <SectionWrapper id="about" number="01" label="PROFILE" title="About Me" meta="FILE: SUBJECT_OVERVIEW">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left rail */}
          <div className="lg:col-span-3 space-y-4">
            <div className="panel p-5">
              <p className="tech-label mb-3">OPERATOR</p>
              <p className="font-mono text-sm font-semibold">BRANDON GRIMALDO</p>
              <p className="font-mono text-[11px] text-[var(--muted)] mt-1">CALIFORNIA, USA</p>
            </div>
            <div className="panel p-5">
              <p className="tech-label mb-3">INTERESTS</p>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map((interest) => (
                  <TechTag key={interest} label={interest} />
                ))}
              </div>
            </div>
            <div className="panel p-5">
              <p className="tech-label mb-3">FOCUS AREAS</p>
              <ul className="space-y-2">
                {FOCUS_AREAS.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <span className="text-[var(--accent-strong)] font-mono text-xs">▸</span> {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-9 space-y-8">
            <div className="panel brackets p-6 sm:p-8">
              <p className="tech-label mb-4">// BIO</p>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  I&apos;m Brandon Grimaldo, a web designer and developer based in California. I love creating clean, modern websites that blend design and function. My background in computer science and UI/UX lets me handle both the creative and technical sides of projects, from concept to launch.
                </p>
                <p>
                  I&apos;ve built for small businesses, startups, and personal brands creating sites that not only look good but also perform well. My work often focuses on detail, accessibility, and smooth user experience. Outside of client work, I&apos;m always building new projects and refining my craft through design, code, and real-world experimentation.
                </p>
              </div>
            </div>

            <div className="panel p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="tech-label">// EXPERIENCE LOG</p>
                <span className="tech-label hidden sm:block">ENTRIES: 02</span>
              </div>
              <div className="space-y-8">
                {EXPERIENCE.map((job) => (
                  <div key={job.role} className="pl-4 border-l border-[var(--accent-strong)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h4 className="font-bold uppercase tracking-tight">{job.role}</h4>
                        <p className="text-sm text-[var(--muted)]">{job.org}</p>
                      </div>
                      <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--primary)]">{job.period}</span>
                    </div>
                    <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-[var(--line)] font-mono shrink-0">·</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 02 — PROJECTS */}
      <SectionWrapper id="works" number="02" label="CASE STUDIES" title="Featured Projects" meta={`INDEX: ${FEATURED_PROJECTS.length} ENTRIES`}>
        <p className="text-[var(--muted)] max-w-xl -mt-6 mb-10">
          A collection of projects that showcase my skills in full-stack development,
          from concept to deployment.
        </p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* 03 — RESUME */}
      <SectionWrapper id="resume" number="03" label="DOCUMENT" title="Resume" meta="FORMAT: PDF / A4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="panel brackets p-3">
            <Image
              src="/images/brandonresume/Brandon Grimaldo Resume-1.png"
              alt="Brandon Grimaldo Resume"
              width={1200}
              height={1600}
              className="w-full h-auto border border-[var(--border-soft)]"
            />
          </div>
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="panel p-6 sm:p-8">
              <p className="tech-label mb-4">// DOCUMENT ACCESS</p>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Download or view my resume to learn more about my experience, skills, and projects in software engineering and web development.
              </p>
              <div className="flex flex-wrap gap-3">
                <HudButton
                  href="/images/brandonresume/Brandon Grimaldo Resume.pdf"
                  download="Brandon Grimaldo Resume.pdf"
                >
                  Download
                </HudButton>
                <HudButton
                  variant="ghost"
                  href="/images/brandonresume/Brandon Grimaldo Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Online
                </HudButton>
                <HudButton variant="ghost" as="button" type="button" onClick={copyResumeToClipboard}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </HudButton>
              </div>
              <div className="mt-8 pt-5 border-t border-[var(--border-soft)] flex flex-wrap gap-x-6 gap-y-2">
                <span className="tech-label">LAST UPDATED: 2026</span>
                <span className="tech-label">VERSION: 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 04 — CONTACT */}
      <section id="contact" className="relative py-16 md:py-24">
        <div className="section-wrap">
          <ContactPanel />
        </div>
      </section>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
          <span className="tech-label">© 2026 BRANDON GRIMALDO</span>
          <span className="tech-label">BUILT WITH NEXT.JS + TAILWIND</span>
          <span className="tech-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-strong)] inline-block animate-pulse" />
            END OF TRANSMISSION
          </span>
        </div>
      </footer>
    </main>
  );
}
