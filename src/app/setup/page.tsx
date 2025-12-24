'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SetupInput } from '@/components';

export default function SetupPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = (topic: string, goal: string) => {
    // Start implode animation
    setIsTransitioning(true);

    // Navigate after animation
    setTimeout(() => {
      router.push(`/drill?topic=${encodeURIComponent(topic)}&goal=${goal}`);
    }, 500);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between px-6 py-4'>
        <Link href='/' className='text-xl font-bold text-text-primary'>
          Lenam
        </Link>
        <Link href='/library' className='btn btn-ghost text-sm'>
          My Library
        </Link>
      </header>

      {/* Main content */}
      <main
        className={`
          flex-1 flex flex-col items-center justify-center px-6 py-12
          ${isTransitioning ? 'animate-implode' : ''}
        `}
      >
        {/* Title */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-text-primary mb-3'>
            What are we mastering today?
          </h1>
          <p className='text-text-secondary'>
            Choose your focus and let&apos;s drill deep.
          </p>
        </div>

        {/* Setup Input */}
        <SetupInput onStart={handleStart} />

        {/* Suggested topics */}
        <div className='mt-16 w-full max-w-xl'>
          <p className='text-sm text-text-tertiary text-center mb-4'>
            Popular topics
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            {[
              'React Hooks',
              'System Design',
              'SQL Optimization',
              'TypeScript',
              'Algorithms',
              'REST APIs',
              'Data Structures',
              'AWS',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleStart(topic, 'interview')}
                className='px-4 py-2 text-sm rounded-full bg-bg-surface border border-white/10 text-text-secondary hover:text-text-primary hover:border-cool-blue/50 transition-all duration-200'
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='px-6 py-4 text-center'>
        <p className='text-xs text-text-muted'>
          Press{' '}
          <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
            Esc
          </kbd>{' '}
          to go back
        </p>
      </footer>
    </div>
  );
}
