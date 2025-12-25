import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lenam - Master Your Knowledge',
  description:
    'Deep focus learning platform for developers. Drill, learn, and master technical concepts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
