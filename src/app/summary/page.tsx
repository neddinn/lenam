'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ReadinessMeter from '@/components/ReadinessMeter';

interface SessionStats {
  questionsAnswered: number;
  correctCount: number;
  highConfidenceWrongCount: number;
  readinessStart: number;
  readinessEnd: number;
  topGap: string;
}

export default function SummaryPage() {
  const router = useRouter();
  const [showBadge, setShowBadge] = useState(false);

  // Dummy session stats
  const stats: SessionStats = {
    questionsAnswered: 12,
    correctCount: 9,
    highConfidenceWrongCount: 1,
    readinessStart: 45,
    readinessEnd: 78,
    topGap: 'Effect cleanup timing',
  };

  const delta = stats.readinessEnd - stats.readinessStart;
  const isReady = stats.readinessEnd >= 80;

  // Show badge animation if ready
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShowBadge(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const handleTeachMe = () => {
    router.push('/teach');
  };

  const handleReDrill = () => {
    router.push('/drill');
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      {/* Header */}
      <header
        className="w-full py-4 px-6 border-b"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="container flex-between">
          <span className="heading-4">FlashLearn</span>
          <Link
            href="/library"
            className="body-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            View Library →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md stack-10 text-center">
          {/* Title */}
          <div className="animate-fade-in-up">
            <span className="body-small font-semibold" style={{ color: 'var(--text-muted)' }}>
              SESSION COMPLETE
            </span>
            <h1 className="heading-2 mt-2">React Rendering</h1>
          </div>

          {/* Readiness Score */}
          <div
            className="flex flex-col items-center justify-center animate-scale-in"
            style={{ animationDelay: '100ms' }}
          >
            <ReadinessMeter
              score={stats.readinessEnd}
              size="large"
              animate
            />

            {/* Delta */}
            <div
              className="mt-4 row-2 animate-fade-in"
              style={{
                animationDelay: '900ms',
                color: delta >= 0 ? 'var(--status-success)' : 'var(--status-error)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={delta >= 0 ? "M8 4L12 8L8 12M4 4L8 8L4 12" : "M8 12L4 8L8 4M12 12L8 8L12 4"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="body-base font-semibold">
                {delta >= 0 ? '+' : ''}{delta} this session
              </span>
            </div>

            {/* Ready Badge */}
            {isReady && showBadge && (
              <div
                className="mt-4 animate-scale-in"
                style={{
                  animationTimingFunction: 'var(--ease-bounce)',
                }}
              >
                <span className="badge badge-success text-sm py-2 px-4">
                  ✓ Interview Ready
                </span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div
            className="card animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="stack-4">
              <div className="flex-between body-base">
                <span style={{ color: 'var(--text-secondary)' }}>Questions answered</span>
                <span className="font-semibold">{stats.questionsAnswered}</span>
              </div>
              <div className="flex-between body-base">
                <span style={{ color: 'var(--text-secondary)' }}>Correct</span>
                <span className="font-semibold" style={{ color: 'var(--status-success)' }}>
                  {stats.correctCount}
                </span>
              </div>
              <div className="flex-between body-base">
                <span style={{ color: 'var(--text-secondary)' }}>Missed</span>
                <span className="font-semibold" style={{ color: 'var(--status-error)' }}>
                  {stats.questionsAnswered - stats.correctCount}
                </span>
              </div>
              <div className="flex-between body-base">
                <span style={{ color: 'var(--text-secondary)' }}>High-confidence wrong</span>
                <span
                  className="font-semibold"
                  style={{
                    color: stats.highConfidenceWrongCount > 0
                      ? 'var(--status-error)'
                      : 'var(--text-muted)',
                  }}
                >
                  {stats.highConfidenceWrongCount}
                </span>
              </div>
            </div>
          </div>

          {/* Top Gap */}
          <div
            className="stack-4 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="stack-2">
              <span className="caption">Top gap to close</span>
              <span className="body-base font-semibold">{stats.topGap}</span>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleTeachMe}
              rightIcon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            >
              Teach Me This
            </Button>
          </div>

          {/* Primary CTA */}
          <div
            className="stack-4 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleReDrill}
            >
              Re-drill (5 min)
            </Button>

            <div className="row-4 justify-center">
              <Link
                href="/library"
                className="body-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Save Preset
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <Link
                href="/"
                className="body-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                See Pricing
              </Link>
            </div>
          </div>

          {/* Quota hint */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <span className="caption">
              2 drills remaining today · <Link href="/" className="text-[var(--accent-primary)] hover:underline">Unlock unlimited</Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
