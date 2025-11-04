'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import SocialBar from "@/components/SocialBar";
import Image from "next/image";
import { useState } from "react";

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
    } catch (err) {
      // Fallback: copy the PDF link URL
      try {
        await navigator.clipboard.writeText(window.location.origin + '/images/brandonresume/Brandon Grimaldo Resume.pdf');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
    }
  };

  return (
    <main id="main" className="min-h-screen">
      <div className="hidden lg:block fixed right-2 top-1/2 -translate-y-1/2 rotate-90 opacity-70 font-mono tracking-wider text-sm">
        Software Engineering | Full-Stack Development
      </div>
      <Header />
      <Hero />
      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Card title="~/about" chrome="tabs">
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                About Me
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-[var(--muted)] leading-relaxed text-base sm:text-lg">
                  I'm Brandon Grimaldo a web designer and developer based in California. I love creating clean, modern websites that blend design and function. My background in computer science and UI/UX lets me handle both the creative and technical sides of projects, from concept to launch.
                </p>
                <p className="text-[var(--muted)] leading-relaxed text-base sm:text-lg">
                  I've built for small businesses, startups, and personal brands creating sites that not only look good but also perform well. My work often focuses on detail, accessibility, and smooth user experience. Outside of client work, I'm always building new projects and refining my craft through design, code, and real-world experimentation.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "AWS"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs sm:text-sm font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {["Skateboarding", "Music", "Drawing", "Graphic Design"].map((interest) => (
                    <span key={interest} className="px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs sm:text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-16 md:py-24 bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Featured Projects</h2>
            <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl mx-auto">
              A collection of projects that showcase my skills in full-stack development, 
              from concept to deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Project 1 - OrigamiWebDesign */}
            <Card title="~/origami-design" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/origamiwebdesign/origami.png?v=1" alt="Origami Web Design icon" width={48} height={48} className="w-full h-full object-contain" priority />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold">Origami Web Design</h3>
                    <p className="hidden sm:block text-[var(--muted)] text-sm">Origami Web Design</p>
                  </div>
                </div>
                <div className="hidden sm:block space-y-2">
                  <p className="text-[var(--muted)] leading-relaxed">
                    A modern design agency website showcasing creative services and portfolio work. 
                    Features interactive elements, smooth transitions, and responsive layouts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "GSAP", "Sass", "Netlify"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a href="https://www.origamiwebdesign.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-sm font-mono transition-colors">
                      View Live →
                    </a>
                    <a href="/projects/origami-design" className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/60 text-sm font-mono transition-colors">
                      View more →
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project 2 - Kims Mart Davis */}
            <Card title="~/kims-mart" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/kimsmart/km.svg" alt="Kims Mart logo" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold">Kims Mart Davis</h3>
                    <p className="hidden sm:block text-[var(--muted)] text-sm">Local Market E-commerce</p>
                  </div>
                </div>
                <div className="hidden sm:block space-y-2">
                  <p className="text-[var(--muted)] leading-relaxed">
                    A full-stack e-commerce platform for a local market in Davis. 
                    Features inventory management, online ordering, and payment processing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Express", "MongoDB", "Stripe"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a href="https://kimsmartdavis.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-sm font-mono transition-colors">
                      View Live →
                    </a>
                    <a href="/projects/kims-mart" className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/60 text-sm font-mono transition-colors">
                      View more →
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project 3 - Chloe Yap Portfolio */}
            <Card title="~/chloe-portfolio" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/chloeyap/Chloe_Yap_Logo.png" alt="Chloe Yap logo" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold">Chloe Yap Portfolio</h3>
                    <p className="hidden sm:block text-[var(--muted)] text-sm">Creative Portfolio Website</p>
                  </div>
                </div>
                <div className="hidden sm:block space-y-2">
                  <p className="text-[var(--muted)] leading-relaxed">
                    A stunning portfolio website showcasing creative work and artistic projects. 
                    Features smooth animations, responsive design, and elegant typography.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a href="https://chloeyap.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-sm font-mono transition-colors">
                      View Live →
                    </a>
                    <a href="/projects/chloe-portfolio" className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/60 text-sm font-mono transition-colors">
                      View more →
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project 4 - Pioneer */}
            <Card title="~/pioneer" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/pioneer/Pioneer_Icon.png" alt="Pioneer icon" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold">Pioneer</h3>
                    <p className="hidden sm:block text-[var(--muted)] text-sm">Social Travel Map</p>
                  </div>
                </div>
                <div className="hidden sm:block space-y-2">
                  <p className="text-[var(--muted)] leading-relaxed">
                    A social map to discover places, build multi‑stop routes, and share trips with friends.
                    Fast, Mapbox‑powered UX with geocoding and a streamlined trip planner.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "Mapbox GL JS", "Supabase", "Framer Motion"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a href="https://www.officialpioneer.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-sm font-mono transition-colors">
                      View Live →
                    </a>
                    <a href="/projects/pioneer" className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/60 text-sm font-mono transition-colors">
                      View more →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Card title="Resume" chrome="tabs">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-2xl font-bold">
                  Resume
                </h2>
                <div className="flex items-center gap-4">
                  <a 
                    href="/images/brandonresume/Brandon Grimaldo Resume.pdf" 
                    download="Brandon Grimaldo Resume.pdf"
                    className="px-4 py-2 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)]/25 transition-colors font-mono text-sm"
                  >
                    Download Resume →
                  </a>
                  <button 
                    onClick={copyResumeToClipboard}
                    className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/60 transition-colors font-mono text-sm"
                  >
                    {copied ? 'Copied!' : 'Copy Resume →'}
                  </button>
                </div>
              </div>
              <div className="w-full flex items-center justify-center border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--surface)]/30 p-4">
                <div className="max-w-6xl w-full" style={{ maxHeight: '85vh' }}>
                  <Image
                    src="/images/brandonresume/Brandon Grimaldo Resume-1.png"
                    alt="Brandon Grimaldo Resume"
                    width={1200}
                    height={1600}
                    className="w-full h-auto"
                    style={{ maxHeight: '85vh', objectFit: 'contain' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      <SocialBar />
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[var(--muted)] text-sm">© 2024 Brandon. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
