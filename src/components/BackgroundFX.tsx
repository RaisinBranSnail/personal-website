'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0;

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];

    let primary = '#4F8CFF';
    let accent = '#00FF88';

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      primary = (style.getPropertyValue('--primary') || '#4F8CFF').trim();
      accent  = (style.getPropertyValue('--accent')  || '#00FF88').trim();
    };
    updateColors();

    const mo = new MutationObserver(updateColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 20000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // subtle grid
      ctx.globalAlpha = 0.06;
      const step = 16;
      ctx.strokeStyle = '#ffffff';
      for (let x = 0; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.globalAlpha = 1;

      // particles + connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) { p.vx += (dx / (dist + 0.001)) * 0.2; p.vy += (dy / (dist + 0.001)) * 0.2; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() < 0.5 ? primary : accent;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d2 = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
          if (d2 < 100 * 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = primary;
            ctx.globalAlpha = 0.06;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      const g = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.8);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);   // attach to window (canvas is pointer-events:none)
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden={true}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[var(--bg)]"
    />
  );
}
