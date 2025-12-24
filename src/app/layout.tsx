import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlashLearn — Interview Readiness Trainer',
  description:
    'Prove readiness, not just preparation. Drill, learn, and track your interview readiness with targeted gap remediation.',
  keywords: [
    'interview prep',
    'coding interview',
    'developer training',
    'technical interview',
  ],
  authors: [{ name: 'FlashLearn' }],
  openGraph: {
    title: 'FlashLearn — Interview Readiness Trainer',
    description: 'Prove readiness, not just preparation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
