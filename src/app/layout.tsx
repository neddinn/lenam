import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lenam | Interview-Ready in Minutes',
  description:
    'Master technical concepts through adaptive drilling. Drill it, learn it, prove it. Interview ready in weeks, not months.',
  keywords: [
    'interview prep',
    'technical interview',
    'coding practice',
    'algorithms',
    'system design',
    'react',
    'typescript',
  ],
  authors: [{ name: 'Lenam' }],
  openGraph: {
    title: 'Lenam | Interview-Ready in Minutes',
    description:
      'Master technical concepts through adaptive drilling. Drill it, learn it, prove it.',
    type: 'website',
    siteName: 'Lenam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lenam | Interview-Ready in Minutes',
    description: 'Master technical concepts through adaptive drilling.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <AppProvider>
          <div className='mesh-gradient' aria-hidden='true' />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
