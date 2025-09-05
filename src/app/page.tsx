import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import SocialBar from "@/components/SocialBar";

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <div className="hidden lg:block fixed right-2 top-1/2 -translate-y-1/2 rotate-90 opacity-70 font-mono tracking-wider text-sm">
        Software Engineering | Full-Stack Development
      </div>
      <Header />
      <Hero />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div id="about">
              <Card title="~/about" chrome="tabs">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span>🌙</span>
                    About Me
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    Coder building clean interfaces.
                    Based in Gilroy, always chasing that perfect commit.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Python", "TypeScript", "🧗", "🎧"].map((t) => (
                      <span key={t} className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div id="work">
              <Card title="~/work" chrome="tabs">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span>💻</span>
                    My Work
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    Selected projects that keep me up at 3AM. Simple solutions to complex problems.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span>🗺️</span>
                        Pioneer
                      </h4>
                      <p className="text-sm text-[var(--muted)]">Maps & routing platform</p>
                    </div>
                    <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span>🐾</span>
                        Paws Connect
                      </h4>
                      <p className="text-sm text-[var(--muted)]">Pet adoption marketplace</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <SocialBar />
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[var(--muted)] text-sm">© {new Date().getFullYear()} Brandon. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
