import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationSchema } from '@/lib/seo';
import { site } from '@/data/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Advanced Cardiology | Cardiologists in Drummoyne & Bowral',
    template: '%s | Advanced Cardiology',
  },
  description: site.shortDescription,
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  icons: {
    icon: [
      { url: '/images/branding/heart-mark-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/branding/heart-mark-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/branding/heart-mark-180.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#13263a',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <a
          href="#main"
          className="skip-link rounded-md bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lifted"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} id="schema-organization" />
      </body>
    </html>
  );
}
