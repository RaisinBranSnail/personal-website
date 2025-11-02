'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import SocialBar from "@/components/SocialBar";
import Image from "next/image";

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <div className="hidden lg:block fixed right-2 top-1/2 -translate-y-1/2 rotate-90 opacity-70 font-mono tracking-wider text-sm">
        Software Engineering | Full-Stack Development
      </div>
      <Header />
      <Hero />
      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <Card title="~/about" chrome="tabs">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>🌙</span>
                About Me
              </h2>
              <p className="text-[var(--muted)] leading-relaxed text-lg">
                Coder building clean interfaces and robust backend systems.
                Based in Gilroy, always chasing that perfect commit and the next breakthrough.
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "AWS"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {["Skateboarding", "Music", "Drawing", "Graphic Design"].map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm">
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
      <section id="works" className="py-24 bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              A collection of projects that showcase my skills in full-stack development, 
              from concept to deployment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 - Pioneer */}
            <Card title="~/pioneer" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/pioneer/Pioneer_Icon.png" alt="Pioneer icon" width={48} height={48} className="object-contain translate-x-[6px]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Pioneer</h3>
                    <p className="text-[var(--muted)] text-sm">Social Travel Map</p>
                  </div>
                </div>
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
            </Card>

            {/* Project 2 - Chloe Yap Portfolio */}
            <Card title="~/chloe-portfolio" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/chloeyap/Chloe_Yap_Logo.png" alt="Chloe Yap logo" width={48} height={48} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Chloe Yap Portfolio</h3>
                    <p className="text-[var(--muted)] text-sm">Creative Portfolio Website</p>
                  </div>
                </div>
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
            </Card>

            {/* Project 3 - Kims Mart Davis */}
            <Card title="~/kims-mart" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/kimsmart/km.svg" alt="Kims Mart logo" width={48} height={48} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Kims Mart Davis</h3>
                    <p className="text-[var(--muted)] text-sm">Family Grocery Store</p>
                  </div>
                </div>
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
            </Card>

            {/* Project 4 - OrigamiWebDesign */}
            <Card title="~/origami-design" chrome="pixel-edge">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-[var(--border)] flex items-center justify-center">
                    <Image src="/images/origamiwebdesign/origami.png" alt="OrigamiWebDesign icon" width={48} height={48} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">OrigamiWebDesign</h3>
                    <p className="text-[var(--muted)] text-sm">Creative Website Agency</p>
                  </div>
                </div>
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
            </Card>
          </div>
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
