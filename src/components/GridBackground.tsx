/* Global fixed backdrop: faint blueprint grid, grain, abstract blue shapes, scanline */
export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(154, 169, 181, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 169, 181, 0.13) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />
      {/* Coarse grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(154, 169, 181, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 169, 181, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '280px 280px',
        }}
      />

      {/* Large translucent abstract shapes (pale blue, hard-edged like the reference) */}
      <div
        className="absolute -top-[12%] right-[-8%] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] opacity-50"
        style={{
          background: 'linear-gradient(165deg, rgba(185, 211, 229, 0.85) 0%, rgba(185, 211, 229, 0.3) 70%, transparent 100%)',
          clipPath: 'polygon(35% 0, 100% 0, 100% 70%, 60% 100%, 0 55%)',
        }}
      />
      <div
        className="absolute top-[55%] left-[-10%] w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] opacity-40"
        style={{
          background: 'linear-gradient(30deg, rgba(185, 211, 229, 0.8) 0%, rgba(185, 211, 229, 0.25) 80%)',
          clipPath: 'polygon(0 30%, 55% 0, 100% 45%, 70% 100%, 0 100%)',
        }}
      />

      {/* Grain / noise */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Subtle moving scanline */}
      <div className="scanline" />
    </div>
  );
}
