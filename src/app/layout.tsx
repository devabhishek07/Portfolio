import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0c0c',
};
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Abhishek Kumar | Video Editor and Graphic Designer',
    template: '%s | Abhishek Kumar'
  },
  description: "Video editor and graphic designer in Gorakhpur, India. View selected work in video editing, advertising, motion graphics, and design.",
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
  authors: [{ name: 'Abhishek Kumar' }],
  creator: 'Abhishek Kumar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Abhishek Kumar | Video Editor and Graphic Designer',
    description: 'Video editing, advertising, motion graphics, and graphic design by Abhishek Kumar.',
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
    title: 'Abhishek Kumar | Video Editor and Graphic Designer',
    description: 'Video editing, advertising, motion graphics, and graphic design by Abhishek Kumar.',
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
      className={`dark ${roboto.variable}`}
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
