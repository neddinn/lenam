'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useApp } from '@/lib/context';
import { AppShell } from '@/components/layout/AppShell';
import { AnimatedCounter, BadgeStamp } from '@/components';
import { DEMO_SESSION_HISTORY } from '@/lib/dummyData';

function SummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '75');
  const correct = parseInt(searchParams.get('correct') || '4');
  const total = parseInt(searchParams.get('total') || '5');
  const topic = searchParams.get('topic') || 'General';

  const { isAuthenticated } = useAuth();
  const { startSession } = useApp();

  const [showBadge, setShowBadge] = useState(false);
  const isHighScore = score >= 80;
  const isLowScore = score < 50;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleCountComplete = () => {
    if (isHighScore) {
      setTimeout(() => setShowBadge(true), 300);
      setTimeout(() => setShowBadge(false), 2500);
    }
  };

  const handleReDrill = () => {
    startSession(topic, 'interview');
    router.push(
      `/app/drill/session?topic=${encodeURIComponent(topic)}&goal=interview`,
    );
  };

  if (!isAuthenticated) return null;

  const chartData = [...DEMO_SESSION_HISTORY, { date: 'Today', score }];

  return (
    <AppShell>
      <div className='p-6 lg:p-8 max-w-3xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12 animate-fade-in'>
          <span className='text-5xl mb-4 block'>
            {isHighScore ? '🎉' : isLowScore ? '💪' : '👍'}
          </span>
          <h1 className='text-3xl font-bold text-text-primary mb-2'>
            {isHighScore
              ? 'Excellent Session!'
              : isLowScore
                ? 'Keep Practicing!'
                : 'Good Progress!'}
          </h1>
          <p className='text-text-secondary'>
            {topic} • {correct}/{total} correct
          </p>
        </div>

        {/* Score Display */}
        <div className='card p-8 mb-8 text-center animate-slide-up'>
          <p className='text-sm text-text-tertiary mb-2'>Readiness Score</p>
          <div
            className={`text-7xl font-bold font-mono ${
              isHighScore
                ? 'text-neon-green'
                : isLowScore
                  ? 'text-electric-red'
                  : 'text-cool-blue'
            }`}
            style={{
              textShadow: isHighScore
                ? '0 0 30px var(--neon-green-glow)'
                : isLowScore
                  ? '0 0 30px var(--electric-red-glow)'
                  : 'none',
            }}
          >
            <AnimatedCounter
              value={score}
              duration={2000}
              onComplete={handleCountComplete}
            />
          </div>
          <p className='text-text-tertiary mt-2'>/ 100</p>
        </div>

        {/* Progress Chart */}
        <div
          className='card p-6 mb-8 animate-slide-up'
          style={{ animationDelay: '100ms' }}
        >
          <h2 className='text-sm font-medium text-text-secondary mb-4'>
            Your Progress
          </h2>
          <div className='h-48 flex items-end justify-between gap-2'>
            {chartData.map((session, index) => {
              const isToday = index === chartData.length - 1;
              const height = (session.score / 100) * 100;
              const barColor =
                session.score >= 80
                  ? 'var(--neon-green)'
                  : session.score >= 50
                    ? 'var(--cool-blue)'
                    : 'var(--neutral-500)';

              return (
                <div
                  key={index}
                  className='flex-1 flex flex-col items-center gap-2'
                >
                  <span className='text-xs font-mono text-text-tertiary'>
                    {session.score}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      isToday ? 'animate-slide-up' : ''
                    }`}
                    style={{
                      height: `${height}%`,
                      backgroundColor: barColor,
                      boxShadow: isToday ? `0 0 20px ${barColor}40` : 'none',
                      animationDelay: isToday ? '500ms' : '0ms',
                    }}
                  />
                  <span className='text-xs text-text-muted'>
                    {typeof session.date === 'string' && session.date.length > 5
                      ? session.date.slice(5)
                      : session.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div
          className='grid grid-cols-3 gap-4 mb-8 animate-slide-up'
          style={{ animationDelay: '200ms' }}
        >
          <div className='card p-4 text-center'>
            <p className='text-xs text-text-tertiary mb-1'>Correct</p>
            <p className='text-2xl font-bold font-mono text-neon-green'>
              {correct}/{total}
            </p>
          </div>
          <div className='card p-4 text-center'>
            <p className='text-xs text-text-tertiary mb-1'>Accuracy</p>
            <p className='text-2xl font-bold font-mono text-cool-blue'>
              {Math.round((correct / total) * 100)}%
            </p>
          </div>
          <div className='card p-4 text-center'>
            <p className='text-xs text-text-tertiary mb-1'>Session</p>
            <p className='text-2xl font-bold font-mono text-text-secondary'>
              #8
            </p>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className='animate-slide-up' style={{ animationDelay: '300ms' }}>
          {isLowScore ? (
            <button
              onClick={handleReDrill}
              className='btn btn-danger btn-xl w-full'
              style={{ boxShadow: '0 0 30px var(--electric-red-glow)' }}
            >
              🎯 Re-drill {topic}
            </button>
          ) : isHighScore ? (
            <Link
              href='/app/library'
              className='btn btn-primary btn-xl w-full'
              style={{ boxShadow: '0 0 30px var(--neon-green-glow)' }}
            >
              ✅ Lock in this score
            </Link>
          ) : (
            <button
              onClick={handleReDrill}
              className='btn btn-guidance btn-xl w-full'
            >
              📚 Continue with {topic}
            </button>
          )}

          <div className='flex justify-center gap-4 mt-4'>
            <Link href='/app/drill' className='btn btn-ghost'>
              New Topic
            </Link>
            <Link href='/app' className='btn btn-ghost'>
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <BadgeStamp title='Interview Ready' icon='🏆' show={showBadge} />
    </AppShell>
  );
}

export default function DrillSummaryPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-pulse text-text-secondary'>Loading...</div>
        </div>
      }
    >
      <SummaryContent />
    </Suspense>
  );
}
