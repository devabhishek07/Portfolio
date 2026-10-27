import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display, Geist_Mono } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0c0c',
};
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { siteConfig } from "@/lib/constants";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Abhishek Kumar | Video Editor & Graphic Designer',
    template: '%s | Abhishek Kumar'
  },
  description: "Explore Abhishek Kumar's work in video editing, AI video ads, motion graphics, talking-head content, and graphic design. Based in Gorakhpur, India.",
  keywords: [
    'Abhishek Kumar', 
    'Video Editor', 
    'Graphic Designer', 
    'AI Video Creator', 
    'Motion Graphics India', 
    'Talking-Head Video Editor', 
    'After Effects Artist', 
    'Premiere Pro Editor'
  ],
  authors: [{ name: 'Abhishek Kumar', url: 'https://abhishek-dev7.vercel.app/' }],
  creator: 'Abhishek Kumar',
  metadataBase: new URL('https://abhishek-dev7.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Abhishek Kumar — Video Editor & Graphic Designer',
    description: 'Compelling visual stories through video editing, AI-assisted creation, motion graphics, and design.',
    url: 'https://abhishek-dev7.vercel.app/',
    siteName: 'Abhishek Kumar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abhishek Kumar — Video Editor & Graphic Designer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Kumar — Video Editor & Graphic Designer',
    description: 'Compelling visual stories through video editing, AI-assisted creation, motion graphics, and design.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${dmSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrollProvider>
            <InteractiveBackground />
            <div className="grain-overlay" />
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
