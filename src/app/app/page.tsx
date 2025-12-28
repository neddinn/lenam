'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth, usePresets, useApp } from '@/lib/context';
import { AppShell } from '@/components/layout/AppShell';
import { ReadinessMeter } from '@/components/ui/ReadinessMeter';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { presets } = usePresets();
  const { startSession } = useApp();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Calculate stats
  const totalPresets = presets.length;
  const readyCount = presets.filter((p) => p.readinessScore >= 80).length;
  const avgScore =
    totalPresets > 0
      ? Math.round(
          presets.reduce((acc, p) => acc + p.readinessScore, 0) / totalPresets,
        )
      : 0;

  // Get recently practiced presets
  const recentPresets = [...presets]
    .sort((a, b) =>
      (b.lastAttempted || '').localeCompare(a.lastAttempted || ''),
    )
    .slice(0, 3);

  // Presets that need attention (low score or not practiced)
  const needsAttention = presets
    .filter((p) => p.readinessScore < 70)
    .slice(0, 3);

  const handleQuickDrill = (topic: string) => {
    startSession(topic, 'interview');
    router.push(`/app/drill/session?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <AppShell>
      <div className='p-6 lg:p-8 max-w-6xl mx-auto'>
        {/* Welcome header */}
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-text-primary mb-2'>
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className='text-text-secondary'>
            Ready to sharpen your skills? Here&apos;s your dashboard.
          </p>
        </div>

        {/* Stats overview */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard
            label='Topics'
            value={totalPresets.toString()}
            subtitle='being tracked'
            icon='📚'
          />
          <StatCard
            label='Ready'
            value={readyCount.toString()}
            subtitle='topics at 80%+'
            icon='✅'
            highlight={readyCount > 0}
          />
          <StatCard
            label='Avg Score'
            value={`${avgScore}%`}
            subtitle='across all topics'
            icon='📊'
          />
          <StatCard
            label='Streak'
            value='3 days'
            subtitle='keep it going!'
            icon='🔥'
            highlight
          />
        </div>

        {/* Quick actions */}
        <div className='card p-6 mb-8'>
          <h2 className='text-lg font-semibold text-text-primary mb-4'>
            Quick Start
          </h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Link
              href='/app/drill'
              className='btn btn-primary btn-lg justify-start'
            >
              <span className='text-xl mr-3'>⚡</span>
              Start New Drill
            </Link>
            <Link
              href='/app/library'
              className='btn btn-secondary btn-lg justify-start'
            >
              <span className='text-xl mr-3'>📚</span>
              Browse Topics
            </Link>
            <Link
              href='/app/progress'
              className='btn btn-ghost btn-lg justify-start border border-white/10'
            >
              <span className='text-xl mr-3'>📈</span>
              View Progress
            </Link>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Continue where you left off */}
          {recentPresets.length > 0 && (
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-text-primary'>
                  Continue Learning
                </h2>
                <Link
                  href='/app/library'
                  className='text-sm text-cool-blue hover:underline'
                >
                  View all
                </Link>
              </div>
              <div className='space-y-3'>
                {recentPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleQuickDrill(preset.topicName)}
                    className='w-full flex items-center justify-between p-4 rounded-xl bg-bg-surface hover:bg-bg-hover transition-colors text-left'
                  >
                    <div className='flex items-center gap-4'>
                      <ReadinessMeter
                        score={preset.readinessScore}
                        size='sm'
                        showLabel={false}
                        animated={false}
                      />
                      <div>
                        <p className='font-medium text-text-primary'>
                          {preset.topicName}
                        </p>
                        <p className='text-xs text-text-muted'>
                          Last practiced: {preset.lastAttempted || 'Never'}
                        </p>
                      </div>
                    </div>
                    <span className='text-text-muted'>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Needs attention */}
          {needsAttention.length > 0 && (
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-text-primary'>
                  Needs Attention
                </h2>
                <span className='badge badge-error'>Low scores</span>
              </div>
              <div className='space-y-3'>
                {needsAttention.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleQuickDrill(preset.topicName)}
                    className='w-full flex items-center justify-between p-4 rounded-xl bg-electric-red/5 border border-electric-red/20 hover:bg-electric-red/10 transition-colors text-left'
                  >
                    <div className='flex items-center gap-4'>
                      <ReadinessMeter
                        score={preset.readinessScore}
                        size='sm'
                        showLabel={false}
                        animated={false}
                      />
                      <div>
                        <p className='font-medium text-text-primary'>
                          {preset.topicName}
                        </p>
                        <p className='text-xs text-electric-red'>
                          Score: {preset.readinessScore}% — needs improvement
                        </p>
                      </div>
                    </div>
                    <span className='btn btn-danger text-xs py-1 px-3'>
                      Practice
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended topics for new users */}
        {presets.length < 3 && (
          <div className='card p-6 mt-8'>
            <h2 className='text-lg font-semibold text-text-primary mb-4'>
              Recommended Topics
            </h2>
            <p className='text-sm text-text-secondary mb-4'>
              Start with these popular topics to build your foundation.
            </p>
            <div className='flex flex-wrap gap-3'>
              {[
                'React Hooks',
                'JavaScript Fundamentals',
                'TypeScript Basics',
                'REST APIs',
                'SQL Essentials',
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleQuickDrill(topic)}
                  className='px-4 py-2 rounded-full bg-bg-surface border border-white/10 text-sm text-text-secondary hover:bg-cool-blue/10 hover:border-cool-blue/30 hover:text-cool-blue transition-all'
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div className={`card p-4 ${highlight ? 'border-neon-green/30' : ''}`}>
      <div className='flex items-start justify-between mb-2'>
        <span className='text-2xl'>{icon}</span>
        {highlight && (
          <span className='w-2 h-2 rounded-full bg-neon-green animate-pulse' />
        )}
      </div>
      <p className='text-2xl font-bold text-text-primary mb-1'>{value}</p>
      <p className='text-sm text-text-secondary'>{label}</p>
      <p className='text-xs text-text-muted'>{subtitle}</p>
    </div>
  );
}
