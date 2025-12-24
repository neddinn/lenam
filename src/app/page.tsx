'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DrillCard, StreakCounter, TeachOverlay } from '@/components';
import { DEMO_QUESTIONS, TEACH_CONTENT } from '@/lib/dummyData';

export default function LandingPage() {
  const [streak, setStreak] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(
    null,
  );
  const [showTeach, setShowTeach] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Current question for the landing demo
  const question = DEMO_QUESTIONS[0];
  const teachContent = TEACH_CONTENT[question.id];

  // Track mouse for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setHasAnswered(true);
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setStreak((prev) => prev + 1);
    }
  }, []);

  const handleTeachRequest = useCallback(() => {
    setShowTeach(true);
  }, []);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated mesh gradient background that follows mouse */}
      <div
        className='fixed inset-0 transition-all duration-1000 ease-out pointer-events-none'
        style={{
          background: `
            radial-gradient(
              600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
              rgba(0, 255, 136, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              400px circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%,
              rgba(0, 184, 255, 0.06) 0%,
              transparent 50%
            ),
            var(--bg-obsidian)
          `,
        }}
      />

      {/* Header */}
      <header className='relative z-10 flex items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-bold text-text-primary'>Lenam</span>
          <span className='badge badge-guidance'>Beta</span>
        </div>
        <nav className='flex items-center gap-4'>
          <Link href='/library' className='btn btn-ghost'>
            Library
          </Link>
          <Link href='/setup' className='btn btn-secondary'>
            Sign In
          </Link>
        </nav>
      </header>

      {/* Main hero section */}
      <main className='relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12'>
        {/* Hero text */}
        <div className='text-center mb-12 max-w-2xl animate-fade-in'>
          <h1 className='text-4xl md:text-5xl font-bold text-text-primary mb-4 text-balance'>
            Master Technical Skills
            <br />
            <span className='text-neon-green'>Through Deep Focus</span>
          </h1>
          <p className='text-lg text-text-secondary'>
            Adaptive drilling that builds real confidence. Interview ready in
            weeks, not months.
          </p>
        </div>

        {/* Streak counter - appears after correct answer */}
        {streak > 0 && (
          <div className='mb-6 animate-scale-in'>
            <StreakCounter count={streak} isAnimating />
          </div>
        )}

        {/* Live micro-drill card - floating in 3D space */}
        <div
          className='w-full max-w-2xl animate-float'
          style={{
            perspective: '1000px',
          }}
        >
          <DrillCard
            question={question}
            onAnswer={handleAnswer}
            onTeachRequest={handleTeachRequest}
            isLanding
          />
        </div>

        {/* CTA Button - changes based on state */}
        <div
          className='mt-12 animate-slide-up'
          style={{ animationDelay: '200ms' }}
        >
          {!hasAnswered && (
            <p className='text-text-tertiary text-sm mb-4 text-center'>
              ↑ Try answering above to experience the magic
            </p>
          )}

          <Link
            href='/setup'
            className={`btn btn-xl ${
              lastAnswerCorrect
                ? 'btn-primary animate-glow-pulse'
                : lastAnswerCorrect === false
                  ? 'btn-danger'
                  : 'btn-secondary'
            }`}
          >
            {lastAnswerCorrect
              ? '🔥 Keep the Streak Alive'
              : lastAnswerCorrect === false
                ? '📚 Start Learning'
                : 'Get Started Free'}
          </Link>
        </div>

        {/* Features section */}
        <div className='mt-24 grid md:grid-cols-3 gap-8 max-w-4xl w-full'>
          <FeatureCard
            icon='🎯'
            title='Adaptive Drilling'
            description='Questions adapt to your knowledge gaps. Focus on what matters.'
          />
          <FeatureCard
            icon='⚡'
            title='Instant Feedback'
            description='Learn from mistakes immediately with contextual explanations.'
          />
          <FeatureCard
            icon='📈'
            title='Track Progress'
            description="Visual readiness scores show exactly when you're interview ready."
          />
        </div>
      </main>

      {/* Teach Overlay */}
      {teachContent && (
        <TeachOverlay
          question={question.question}
          correctAnswer={question.options[question.correctIndex]}
          content={teachContent}
          isOpen={showTeach}
          onClose={() => setShowTeach(false)}
        />
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className='card p-6 text-center hover:bg-bg-surface transition-colors duration-200'>
      <span className='text-3xl mb-4 block'>{icon}</span>
      <h3 className='text-lg font-semibold text-text-primary mb-2'>{title}</h3>
      <p className='text-sm text-text-secondary'>{description}</p>
    </div>
  );
}
