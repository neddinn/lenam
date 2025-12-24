'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { samplePresets, formatRelativeTime, getReadinessStatus } from '@/lib/dummy-data';

export default function LibraryPage() {
  const router = useRouter();

  const handleContinue = (presetId: string) => {
    router.push('/drill');
  };

  const handleTeachMe = (presetId: string) => {
    router.push('/teach');
  };

  const handleNewDrill = () => {
    router.push('/setup');
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      {/* Header */}
      <header
        className="w-full py-4 px-6 border-b sticky top-0 bg-[var(--bg-primary)] z-10"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="container flex-between">
          <Link href="/" className="heading-4" style={{ letterSpacing: '-0.03em' }}>
            FlashLearn
          </Link>
          <Button variant="primary" size="default" onClick={handleNewDrill}>
            + New Drill
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="container max-w-3xl">
          <div className="stack-8">
            {/* Page Title */}
            <div className="animate-fade-in-up">
              <h1 className="heading-2">Your Presets</h1>
              <p className="body-base mt-2" style={{ color: 'var(--text-secondary)' }}>
                {samplePresets.length} saved presets
              </p>
            </div>

            {/* Presets List */}
            {samplePresets.length > 0 ? (
              <div className="stack-4 stagger-children">
                {samplePresets.map((preset) => {
                  const status = getReadinessStatus(preset.readinessScore);
                  const statusColors = {
                    success: {
                      bg: 'var(--status-success-bg)',
                      text: 'var(--status-success)',
                      border: 'var(--status-success-border)',
                    },
                    warning: {
                      bg: 'var(--status-warning-bg)',
                      text: 'var(--status-warning)',
                      border: 'var(--status-warning-border)',
                    },
                    neutral: {
                      bg: 'var(--status-neutral-bg)',
                      text: 'var(--status-neutral)',
                      border: 'var(--border-default)',
                    },
                  };
                  const colors = statusColors[status.color];

                  return (
                    <Card key={preset.id} variant="interactive" className="stack-4">
                      {/* Header row */}
                      <div className="flex-between">
                        <div className="stack-1">
                          <h3 className="heading-4">{preset.topic.title}</h3>
                          <div className="row-2">
                            <span
                              className="caption px-2 py-0.5 rounded"
                              style={{
                                background: 'var(--bg-sunken)',
                                textTransform: 'capitalize',
                              }}
                            >
                              {preset.goal}
                            </span>
                            {preset.lastAttempted && (
                              <span className="caption">
                                Last drilled {formatRelativeTime(preset.lastAttempted)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status badge */}
                        <span
                          className="badge"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {status.label}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="stack-2">
                        <ProgressBar
                          value={preset.readinessScore}
                          max={100}
                          variant={status.color === 'success' ? 'success' : status.color === 'warning' ? 'warning' : 'default'}
                        />
                        <div className="flex-between">
                          <span className="caption" style={{ color: colors.text }}>
                            Readiness: {preset.readinessScore}
                          </span>
                          <span className="caption">
                            {preset.attemptCount} attempts
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="row-3 pt-2">
                        <Button
                          variant="primary"
                          onClick={() => handleContinue(preset.id)}
                        >
                          Continue
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => handleTeachMe(preset.id)}
                        >
                          Teach Me
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div
                className="flex flex-col items-center justify-center py-20 text-center animate-fade-in"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'var(--bg-sunken)' }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <path
                      d="M16 4L20 12L28 13.5L22 19.5L23.5 28L16 24L8.5 28L10 19.5L4 13.5L12 12L16 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="heading-3 mb-2">No presets yet</h2>
                <p
                  className="body-base mb-8 max-w-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Complete your first drill to save a preset and track your readiness over time.
                </p>
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleNewDrill}
                  rightIcon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                >
                  Start a Drill
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 px-6 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="container flex-between">
          <span className="caption">
            Free tier: 1 preset saved
          </span>
          <Link
            href="/"
            className="caption text-[var(--accent-primary)] hover:underline"
          >
            Upgrade to Pro →
          </Link>
        </div>
      </footer>
    </div>
  );
}
