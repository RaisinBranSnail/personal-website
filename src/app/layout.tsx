import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import '../styles.css';

import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('@/components/BackgroundFX'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Brandon - Web Developer',
  description: 'I build fast, clean web apps with React, Node, and Python.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0F14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <BackgroundFX />
        {children}
      </body>
    </html>
  );
}
