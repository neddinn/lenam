'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePresets } from '@/lib/context';
import { AppShell } from '@/components/layout/AppShell';
import { ReadinessMeter } from '@/components/ui/ReadinessMeter';
import { DEMO_SESSION_HISTORY } from '@/lib/dummyData';

export default function ProgressPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { presets } = usePresets();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Calculate overall stats
  const totalSessions = presets.reduce(
    (acc, p) => acc + Math.floor(p.questionsAttempted / 5),
    0,
  );
  const totalQuestions = presets.reduce(
    (acc, p) => acc + p.questionsAttempted,
    0,
  );
  const totalCorrect = presets.reduce((acc, p) => acc + p.correctAnswers, 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const avgReadiness =
    presets.length > 0
      ? Math.round(
          presets.reduce((acc, p) => acc + p.readinessScore, 0) /
            presets.length,
        )
      : 0;

  // Top performing topics
  const topTopics = [...presets]
    .sort((a, b) => b.readinessScore - a.readinessScore)
    .slice(0, 5);

  // Topics needing work
  const weakTopics = [...presets]
    .filter((p) => p.readinessScore < 70)
    .sort((a, b) => a.readinessScore - b.readinessScore)
    .slice(0, 5);

  return (
    <AppShell>
      <div className='p-6 lg:p-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-2xl md:text-3xl font-bold text-text-primary mb-2'>
              Your Progress
            </h1>
            <p className='text-text-secondary'>
              Track your learning journey and identify areas for improvement.
            </p>
          </div>

          {/* Overview Stats */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            <div className='card p-6 text-center'>
              <p className='text-sm text-text-tertiary mb-2'>Sessions</p>
              <p className='text-4xl font-bold text-text-primary font-mono'>
                {totalSessions}
              </p>
            </div>
            <div className='card p-6 text-center'>
              <p className='text-sm text-text-tertiary mb-2'>Questions</p>
              <p className='text-4xl font-bold text-text-primary font-mono'>
                {totalQuestions}
              </p>
            </div>
            <div className='card p-6 text-center'>
              <p className='text-sm text-text-tertiary mb-2'>Accuracy</p>
              <p className='text-4xl font-bold text-cool-blue font-mono'>
                {overallAccuracy}%
              </p>
            </div>
            <div className='card p-6 flex flex-col items-center justify-center'>
              <p className='text-sm text-text-tertiary mb-2'>Avg Readiness</p>
              <ReadinessMeter
                score={avgReadiness}
                size='lg'
                showLabel={false}
              />
            </div>
          </div>

          {/* Activity chart */}
          <div className='card p-6 mb-8'>
            <h2 className='text-lg font-semibold text-text-primary mb-6'>
              Recent Activity
            </h2>
            <div className='h-48 flex items-end justify-between gap-2'>
              {DEMO_SESSION_HISTORY.map((session, index) => {
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
                      className='w-full rounded-t-md'
                      style={{
                        height: `${height}%`,
                        backgroundColor: barColor,
                      }}
                    />
                    <span className='text-xs text-text-muted'>
                      {session.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Top Performing */}
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-text-primary'>
                  Strongest Topics
                </h2>
                <span className='text-neon-green'>🏆</span>
              </div>
              {topTopics.length > 0 ? (
                <div className='space-y-3'>
                  {topTopics.map((preset, index) => (
                    <div
                      key={preset.id}
                      className='flex items-center justify-between p-3 rounded-lg bg-bg-surface'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='w-6 h-6 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold flex items-center justify-center'>
                          {index + 1}
                        </span>
                        <span className='font-medium text-text-primary'>
                          {preset.topicName}
                        </span>
                      </div>
                      <span className='font-mono text-neon-green'>
                        {preset.readinessScore}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-text-muted text-center py-8'>
                  Complete some drills to see your top topics!
                </p>
              )}
            </div>

            {/* Needs Improvement */}
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-text-primary'>
                  Needs Improvement
                </h2>
                <span className='text-electric-red'>🎯</span>
              </div>
              {weakTopics.length > 0 ? (
                <div className='space-y-3'>
                  {weakTopics.map((preset) => (
                    <div
                      key={preset.id}
                      className='flex items-center justify-between p-3 rounded-lg bg-electric-red/5 border border-electric-red/20'
                    >
                      <span className='font-medium text-text-primary'>
                        {preset.topicName}
                      </span>
                      <div className='flex items-center gap-3'>
                        <span className='font-mono text-electric-red'>
                          {preset.readinessScore}%
                        </span>
                        <button className='text-xs text-electric-red hover:underline'>
                          Practice →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-text-muted text-center py-8'>
                  Great work! No weak topics found.
                </p>
              )}
            </div>
          </div>

          {/* Learning insights */}
          <div className='card p-6 mt-8'>
            <h2 className='text-lg font-semibold text-text-primary mb-4'>
              💡 Insights
            </h2>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='p-4 rounded-lg bg-cool-blue/5 border border-cool-blue/20'>
                <p className='text-sm text-text-primary'>
                  <span className='text-cool-blue font-semibold'>
                    Best time:
                  </span>{' '}
                  You perform best in morning sessions.
                </p>
              </div>
              <div className='p-4 rounded-lg bg-neon-green/5 border border-neon-green/20'>
                <p className='text-sm text-text-primary'>
                  <span className='text-neon-green font-semibold'>Streak:</span>{' '}
                  3 days in a row! Keep it going!
                </p>
              </div>
              <div className='p-4 rounded-lg bg-amber-500/5 border border-amber-500/20'>
                <p className='text-sm text-text-primary'>
                  <span className='text-amber-400 font-semibold'>Tip:</span>{' '}
                  Focus on SQL Essentials to round out your skills.
                </p>
              </div>
              <div className='p-4 rounded-lg bg-bg-surface'>
                <p className='text-sm text-text-primary'>
                  <span className='text-text-secondary font-semibold'>
                    Goal:
                  </span>{' '}
                  2 more topics at 80% to be interview ready!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
