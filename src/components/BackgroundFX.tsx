'use client';

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
    </div>
  );
}

