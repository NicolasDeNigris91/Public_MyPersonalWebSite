import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/data/site';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nicolaspilegidenigris.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    'Portfolio de Nicolas Pilegi De Nigris — software developer em formação, vindo de uma trajetória de 10 anos no mercado de joalharia de luxo.',
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  keywords: [
    'Nicolas De Nigris',
    'Software Developer',
    'Portfolio',
    'Next.js',
    'TypeScript',
    'Python',
    'Java',
    'Go',
    'Full Stack',
    'São Paulo',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      'Portfolio pessoal com projetos, experiência e estudos. Precisão, craft e depth.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      'Portfolio pessoal com projetos, experiência e estudos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-obsidian text-platinum font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:px-6 focus:py-3 focus:bg-racing-green focus:text-pearl
                     focus:font-sans focus:text-caption focus:tracking-luxury focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
