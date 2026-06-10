import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import '../styles.css';
import { Analytics } from '@vercel/analytics/react';
import GridBackground from '@/components/GridBackground';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brandon Grimaldo — Full-Stack Developer',
  description: 'Building clean websites, apps, and digital systems with strong visuals and useful functionality.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#eef1f2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased font-[family-name:var(--font-inter)]">
        <a href="#main" className="skip-link">Skip to main content</a>
        <GridBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
