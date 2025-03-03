import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Create walls 80% faster in revit',
  description: 'Transform your BIM workflow with our revolutionary wall creation tool. Save up to 80% of modeling time.',
  keywords: 'Revit plugin, BIM, wall creation, Autodesk Revit, architecture software, engineering software, BIM manager, Revit automation, productivity tools',
  authors: [{ name: 'CreateWalls Team' }],
  openGraph: {
    type: 'website',
    url: 'https://easebit.in/createwall',
    title: 'Create walls 80% faster in revit',
    description: 'Transform your BIM workflow with our revolutionary wall creation tool. Save up to 80% of modeling time.',
    siteName: 'CreateWalls',
    images: [{ url: 'https://createwalls.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreateWalls - Enterprise Revit Plugin for Wall Creation',
    description: 'Transform your BIM workflow with our revolutionary wall creation tool. Save up to 80% of modeling time.',
    images: ['https://createwalls.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}