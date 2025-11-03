'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

const PROJECTS: Record<string, {
  title: string;
  summary: string;
  tech: string[];
  deployment: string;
  challenges: string;
  outcomes: string;
  role: string;
  timeline: string;
  responsibilities: string[];
  features: string[];
  live?: string;
  images?: { src: string; alt: string }[];
  designPhilosophy?: string;
  targetAudience?: string;
}> = {
  'pioneer': {
    title: 'Pioneer',
    summary: 'A social media for sharing locations and trips with others and friends! Discover places, plan multi‑stop routes, and share them effortlessly.',
    tech: ['React 18', 'Mapbox GL JS v3', 'Supabase (Postgres + Auth + RLS)', 'Framer Motion'],
    deployment: 'Frontend hosted on Vercel with CDN assets; Supabase for Postgres, Auth, and RLS; Mapbox for tiles/styles, Geocoding, and Directions APIs; CI/CD via Vercel.',
    challenges: 'Balancing map performance and UX, enforcing RLS-safe reads/writes, and ensuring robust routing via Mapbox Directions.',
    outcomes: 'Sub-second map search and route generation for small waypoint sets; improved perceived latency with skeleton loaders; normalized schema enabling scalable post stats and media.',
    role: 'Frontend map/UX and full-stack contributor (routing integration, Supabase queries, RLS policies, SimpleLeaderboard, Main Page polish).',
    timeline: 'v0 (map + geocoding + feed) → v1 (trip drawer + Directions) → v1.2 (route storage + normalization)',
    responsibilities: [
      'Main Page polish and layout',
      'LocalMap experience and marker/popup management',
      'Trip drawer with add/reorder stops and previews',
      'Routing integration via Mapbox Directions wrapper',
      'Supabase queries with RLS-safe read paths',
      'SimpleLeaderboard and profile access',
    ],
    features: [
      'Interactive Mapbox map with geocoding search',
      'Create Trips with Routes: add/reorder stops, preview, generate routes',
      'Things To Do feed with images and tags',
      'Leaderboards of top contributors',
      'User profiles and followers',
    ],
    live: 'https://www.officialpioneer.com',
    images: [
      { src: '/images/pioneer/1.png', alt: 'Pioneer — Landing' },
      { src: '/images/pioneer/2.png', alt: 'Pioneer — Map View' },
      { src: '/images/pioneer/3.png', alt: 'Pioneer — Route Details' },
      { src: '/images/pioneer/4.png', alt: 'Pioneer — Settings' },
    ],
    designPhilosophy: 'Fast, map-first exploration with minimal chrome; contextual actions; defaults that favor sharing and collaboration.',
    targetAudience: 'Travelers, outdoor enthusiasts, and friends planning trips together.',
  },
  'chloe-portfolio': {
    title: 'Chloe Yap Portfolio',
    summary: 'Sophisticated, dual-architecture portfolio for a graphic design student: a polished main portfolio plus a standalone immersive experience with advanced motion.',
    tech: ['React 18', 'Vite', 'Framer Motion', 'GSAP'],
    deployment: 'Main portfolio built with Vite and deployed to a global edge platform. Immersive experiences shipped as a standalone build with GPU-accelerated animations and image preloading.',
    challenges: 'Balancing rich animations with Core Web Vitals, implementing custom scroll pagination, and OS-aware responsive positioning while keeping content accessible.',
    outcomes: 'Silky motion with strong Lighthouse scores, engaging case studies, and a professional presentation with resume download support.',
    role: 'Frontend Engineer',
    timeline: '3–4 weeks',
    responsibilities: ['Design implementation', 'Animation systems', 'Accessibility pass', 'Performance tuning'],
    features: [
      'Dual architecture (portfolio + immersive experiences)',
      'Filtering showcases and case study pages',
      'Seamless infinite carousel with physics',
      'Custom scroll pagination system',
      'Gallery lightbox & modal presentations',
      'Downloadable resume flow'
    ],
    live: 'https://chloeyap.com',
    images: [
      { src: '/images/chloeyap/first_image.png', alt: 'Chloe portfolio — Landing (Home)' },
      { src: '/images/chloeyap/second_image.png', alt: 'Chloe portfolio — Work Grid with Filters' },
      { src: '/images/chloeyap/third_image.png', alt: 'Chloe portfolio — Immersive Experience' },
      { src: '/images/chloeyap/fourth%20page.png', alt: 'Chloe portfolio — Case Study Page' },
    ],
    designPhilosophy: 'Typography-led presentation where motion communicates hierarchy; quiet grids that let the work speak; accessibility without sacrificing craft.',
    targetAudience: 'Prospective clients and employers, fellow designers, and academic reviewers.',
  },
  'kims-mart': {
    title: 'Kims Mart Davis',
    summary: 'Local market e-commerce with real-time inventory and streamlined checkout flow.',
    tech: ['React', 'Express', 'MongoDB', 'Stripe'],
    deployment: 'Server and client deployed behind a reverse proxy with HTTPS and environment-managed secrets.',
    challenges: 'Payment flows, cart edge-cases, and keeping product inventory in sync during peak hours.',
    outcomes: 'Stable checkout with graceful error handling and observable metrics for order success rates.',
    role: 'Full‑stack Engineer',
    timeline: '6–8 weeks',
    responsibilities: ['Cart & checkout', 'Stripe integration', 'Inventory sync', 'Admin dashboards'],
    features: ['Product search', 'Cart recovery', 'Order tracking', 'Promo codes'],
    live: 'https://kimsmartdavis.com',
    images: [
      { src: '/images/kimsmart/1.png', alt: 'Kims Mart — Landing' },
      { src: '/images/kimsmart/2.png', alt: 'Kims Mart — Product Grid' },
      { src: '/images/kimsmart/3.png', alt: 'Kims Mart — Product Detail' },
      { src: '/images/kimsmart/4.png', alt: 'Kims Mart — Checkout Flow' },
    ],
    designPhilosophy: 'Frictionless shopping with clear hierarchy, predictable flows, and trust-building microcopy and feedback.',
    targetAudience: 'Local shoppers seeking quick, reliable ordering on mobile and desktop.',
  },
  'vintage-archive': {
    title: 'VintageArchive',
    summary: 'Digital archive for vintage media with robust search and categorization.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'AWS S3'],
    deployment: 'Object storage for media, signed URLs for access, and nightly backups for database content.',
    challenges: 'Designing efficient search over large metadata sets and secure media access.',
    outcomes: 'Fast search response times and scalable media delivery with minimal operational overhead.',
    role: 'Platform Engineer',
    timeline: '10–12 weeks',
    responsibilities: ['Schema design', 'Search strategy', 'Upload pipeline', 'Access controls'],
    features: ['Faceted search', 'Collections', 'Asset pipeline', 'Admin moderation'],
    designPhilosophy: 'Content-first browsing with faceted search; calm UI that scales with metadata density and preserves context.',
    targetAudience: 'Archivists, researchers, and enthusiasts of vintage media.',
  },
  'origami-design': {
    title: 'OrigamiWebDesign',
    summary: 'Modern agency site to market services, showcase work, and drive leads via a validated contact funnel.',
    tech: ['Next.js 14', 'React 18.2', 'Tailwind CSS 3.4', 'TypeScript 5', 'Zod', 'Nodemailer (SMTP)'],
    deployment: 'Deployed on Vercel with automatic preview builds and main-branch production releases. Contact form emails are handled via SMTP using environment variables for secure configuration.',
    challenges: 'Performance without layout shift, reliable email delivery, responsive grids, and SEO/semantics.',
    outcomes: 'High Lighthouse locally (90s+ typical for Next/Tailwind), live contact funnel with SMTP email notifications, fast pages and easy content updates.',
    role: 'Solo designer/developer',
    timeline: '≈2–3 weeks (1.5 weeks build, 0.5–1.5 weeks polish/content)',
    responsibilities: [
      'Page builds: Home, About, Services, Projects, Blog, Contact',
      'Components: Hero, CardsGrid, Pricing, Reviews, ReadingProgress, TableOfContents, StickyCTA, ContactForm',
      'Contact API: /api/contact with Zod validation and Nodemailer SMTP',
      'Accessibility pass, image optimization, and responsive layout work',
      'Deployment setup and environment configuration'
    ],
    features: [
      'Services overview and details',
      '4‑item portfolio grid',
      'Blog listing and case studies',
      'Validated contact form → SMTP email',
      'Reading progress and sticky CTA',
      'Responsive images and clean semantics'
    ],
    live: 'https://origamiwebdesign.com',
    images: [
      { src: '/images/origamiwebdesign/1.png', alt: 'OrigamiWebDesign — Landing' },
      { src: '/images/origamiwebdesign/2.png', alt: 'OrigamiWebDesign — Services' },
      { src: '/images/origamiwebdesign/3.png', alt: 'OrigamiWebDesign — Portfolio' },
      { src: '/images/origamiwebdesign/4.png', alt: 'OrigamiWebDesign — Contact' },
    ],
    designPhilosophy: 'Clarity and speed; service-led storytelling with responsive layouts and strong contrast for readability.',
    targetAudience: 'Small businesses and founders seeking a modern web presence and lead-generation funnel.',
  },
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug];
  const isChloe = params.slug === 'chloe-portfolio';
  const isPioneer = params.slug === 'pioneer';

  // Lightbox state for screenshots (use per-project images if provided)
  const galleryImages: { src: string; alt: string }[] = (project as any).images ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const hasGallery = galleryImages.length > 0;

  const openLightbox = (idx: number) => {
    if (!hasGallery) return;
    setCurrentImageIdx(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIdx((i) => (i + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIdx((i) => (i + galleryImages.length - 1) % galleryImages.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  if (!project) {
    return (
      <main className="min-h-screen max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <p className="text-[var(--muted)] mb-8">The project you are looking for doesn’t exist yet.</p>
        <Link href="/" className="text-[var(--accent)]">← Back to home</Link>
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen">
      <Header />
      {/* Lightbox overlay */}
      <AnimatePresence>
      {lightboxOpen && hasGallery && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={nextImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button aria-label="Close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-4 right-4 px-3 py-1 rounded-md bg-[var(--surface)]/80 border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)]">
            Close
          </button>
          <div className="absolute top-4 left-4 text-[var(--muted)] font-mono text-sm">
            {currentImageIdx + 1} / {galleryImages.length}
          </div>
          <motion.div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              key={galleryImages[currentImageIdx].src}
              src={galleryImages[currentImageIdx].src}
              alt={galleryImages[currentImageIdx].alt}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-contain select-none"
              priority
            />
            <button aria-label="Previous" onClick={prevImage} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60">‹</button>
            <button aria-label="Next" onClick={nextImage} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60">›</button>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
      {/* Hero with gradient + breadcrumb */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-10">
          <nav className="text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--text)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#works" className="hover:text-[var(--text)]">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">{project.title}</span>
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/25 transition-colors text-sm font-mono"
              >
                Visit live site →
              </a>
            )}
          </div>
          <p className="text-[var(--muted)] mt-3 max-w-3xl">{project.summary}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          {/* Overview + Features */}
          <div className="space-y-8">
            <motion.div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-[var(--muted)] leading-relaxed">
                {isPioneer
                  ? 'Discover spots, build multi‑stop routes, and share trips with friends, all in one fast Mapbox‑powered experience.'
                  : project.summary}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Screenshots</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {galleryImages.length > 0 ? (
                    galleryImages.map((img, idx) => (
                      <button key={img.src} onClick={() => openLightbox(idx)} className="relative aspect-video rounded-xl border border-[var(--border)] overflow-hidden group">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                          priority={idx === 0}
                        />
                        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </button>
                    ))
                  ) : (
                    <>
                      <div className="aspect-video rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)]/60 flex items-center justify-center text-[var(--muted)]">Hero image</div>
                      <div className="aspect-video rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)]/60 flex items-center justify-center text-[var(--muted)]">Feature section</div>
                      <div className="aspect-video rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)]/60 flex items-center justify-center text-[var(--muted)]">Mobile view</div>
                      <div className="aspect-video rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)]/60 flex items-center justify-center text-[var(--muted)]">Dashboard</div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tech Stack integrated below Overview */}
            <motion.div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
              <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 text-[var(--accent)]">▸</span>
                    <span className="text-[var(--text)]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {isChloe && (
              <div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Portfolio Highlights</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Brand Identity: Café Sol Identity',
                    'Social: Studio Nori Social Kit',
                    'Editorial: Linea Editorial System',
                    'Interactive App: Axolotl App',
                    'Interactive App: Keebys (keyboard marketplace)',
                    'Guidelines: RSPB Style Guide',
                    'Print: Bauhaus Magazine',
                    'Branding: Home Builders',
                    'Print: Menu Design',
                    'Media: Film Photography + Video Editing',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--accent)]">▸</span>
                      <span className="text-[var(--text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Narrative case study */}
            <motion.div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6 space-y-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              {project.designPhilosophy && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Design Philosophy</h2>
                  <p className="text-[var(--muted)] leading-relaxed">{project.designPhilosophy}</p>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2">Design</h2>
                <p className="text-[var(--muted)] leading-relaxed">Focused on clarity and speed: typography choices to improve scan-ability, high-contrast UI for readability, and a layout that highlights primary actions and content without distraction.</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Development</h2>
                <p className="text-[var(--muted)] leading-relaxed">Built with {project.tech.join(', ')}. Emphasis on modular components, predictable state handling, and accessible interactions. Performance budgets guided media usage and bundle size.</p>
              </div>
              {project.targetAudience && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Target Audience</h2>
                  <p className="text-[var(--muted)] leading-relaxed">{project.targetAudience}</p>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2">Deployment</h2>
                <p className="text-[var(--muted)] leading-relaxed">{project.deployment}</p>
              </div>
            </motion.div>

            {isChloe && (
              <div className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Advanced Techniques</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Breathing text and variable font interactions',
                    'Scroll-triggered reveals (motion choreography)',
                    'Click spark micro-interactions',
                    'Seamless infinite carousel (physics-based)',
                    'OS-aware responsive positioning',
                    'Modal presentations and gallery lightbox',
                    'Image preloading and GPU-accelerated motion',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-[var(--accent)]">▸</span>
                      <span className="text-[var(--text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            
          </div>

        </div>

        {/* Callouts */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6">
            <h3 className="font-semibold mb-2">Challenges</h3>
            <p className="text-[var(--muted)]">{project.challenges}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6">
            <h3 className="font-semibold mb-2">Outcomes</h3>
            <p className="text-[var(--muted)]">{project.outcomes}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-wrap items-center gap-4 mt-10 pt-6 border-t border-[var(--border)]/50">
          <Link href="/#works" className="px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--surface)]/60 transition-colors">← Back to projects</Link>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/25 transition-colors">Visit live site →</a>
          )}
        </div>
      </section>
    </main>
  );
}


