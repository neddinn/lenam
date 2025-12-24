import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'Lenam | Deep Focus Learning',
  description:
    'Master technical concepts through adaptive drilling. Interview Ready in weeks, not months.',
  keywords: [
    'learning',
    'technical interview',
    'coding practice',
    'algorithms',
    'system design',
  ],
  authors: [{ name: 'Lenam' }],
  openGraph: {
    title: 'Lenam | Deep Focus Learning',
    description:
      'Master technical concepts through adaptive drilling. Interview Ready in weeks, not months.',
    type: 'website',
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
        <div className='mesh-gradient' aria-hidden='true' />
        {children}
      </body>
    </html>
  );
}
