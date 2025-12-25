'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePresets, useApp } from '@/lib/context';
import { AppShell } from '@/components/layout/AppShell';
import { SkillOrb, ToastContainer, useToast } from '@/components';
import { DEMO_SKILLS, Skill } from '@/lib/dummyData';
import { OrbState } from '@/components/ui/SkillOrb';

type ViewMode = 'grid' | 'list';

export default function LibraryPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { presets } = usePresets();
  const { startSession } = useApp();
  const { toasts, addToast, dismissToast } = useToast();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'saved' | 'ready' | 'learning'>(
    'all',
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Convert presets to skill format and merge with demo skills
  const presetSkills: Skill[] = presets.map((p) => ({
    id: p.id,
    name: p.topicName,
    state: (p.readinessScore >= 80
      ? 'ready'
      : p.readinessScore >= 50
        ? 'progress'
        : 'decay') as OrbState,
    score: p.readinessScore,
    lastPracticed: p.lastAttempted,
  }));

  // Merge with demo skills (avoiding duplicates)
  const allSkills = [...presetSkills];
  DEMO_SKILLS.forEach((skill) => {
    if (
      !allSkills.find((s) => s.name.toLowerCase() === skill.name.toLowerCase())
    ) {
      allSkills.push(skill);
    }
  });

  // Filter skills
  const filteredSkills = allSkills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    let matchesFilter = true;

    if (filter === 'saved') {
      matchesFilter = presets.some((p) => p.topicName === skill.name);
    } else if (filter === 'ready') {
      matchesFilter = skill.state === 'ready';
    } else if (filter === 'learning') {
      matchesFilter = skill.state === 'progress' || skill.state === 'decay';
    }

    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: allSkills.length,
    saved: presets.length,
    ready: allSkills.filter((s) => s.state === 'ready').length,
    learning: allSkills.filter(
      (s) => s.state === 'progress' || s.state === 'decay',
    ).length,
  };

  const handleSkillClick = (skill: Skill) => {
    startSession(skill.name, 'interview');
    router.push(
      `/app/drill/session?topic=${encodeURIComponent(skill.name)}&goal=interview`,
    );
  };

  const handleRepair = (skill: Skill) => {
    addToast(`Starting repair session for ${skill.name}...`, 'info');
    setTimeout(() => {
      startSession(skill.name, 'interview');
      router.push(
        `/app/drill/session?topic=${encodeURIComponent(skill.name)}&goal=interview`,
      );
    }, 500);
  };

  return (
    <AppShell>
      <div className='p-6 lg:p-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-text-primary mb-2'>
                Topic Library
              </h1>
              <p className='text-text-secondary'>
                Track your progress across all topics.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
            <StatPill
              label='All Topics'
              value={stats.total}
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            <StatPill
              label='Your Presets'
              value={stats.saved}
              color='var(--cool-blue)'
              active={filter === 'saved'}
              onClick={() => setFilter('saved')}
            />
            <StatPill
              label='Interview Ready'
              value={stats.ready}
              color='var(--neon-green)'
              active={filter === 'ready'}
              onClick={() => setFilter('ready')}
            />
            <StatPill
              label='In Progress'
              value={stats.learning}
              color='var(--electric-red)'
              active={filter === 'learning'}
              onClick={() => setFilter('learning')}
            />
          </div>

          {/* Search and View Toggle */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8'>
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search topics...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='input pl-10'
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <circle cx='7' cy='7' r='5' />
                <path d='M11 11l4 4' />
              </svg>
            </div>

            <div className='pill-toggle'>
              <button
                className={`pill-toggle-option ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={`pill-toggle-option ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>

          {/* Skills Display */}
          {viewMode === 'grid' ? (
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6'>
              {filteredSkills.map((skill) => (
                <SkillOrb
                  key={skill.id}
                  name={skill.name}
                  state={skill.state}
                  score={skill.score}
                  lastPracticed={skill.lastPracticed}
                  onClick={() => handleSkillClick(skill)}
                  onRepair={() => handleRepair(skill)}
                />
              ))}
            </div>
          ) : (
            <div className='space-y-2'>
              {filteredSkills.map((skill) => (
                <SkillListItem
                  key={skill.id}
                  skill={skill}
                  isSaved={presets.some((p) => p.topicName === skill.name)}
                  onClick={() => handleSkillClick(skill)}
                  onRepair={() => handleRepair(skill)}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredSkills.length === 0 && (
            <div className='text-center py-16'>
              <span className='text-4xl mb-4 block'>🔍</span>
              <p className='text-text-secondary'>No topics found</p>
              <p className='text-text-muted text-sm mt-1'>
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </AppShell>
  );
}

function StatPill({
  label,
  value,
  color,
  active,
  onClick,
}: {
  label: string;
  value: number;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between p-4 rounded-xl transition-all duration-200
        ${
          active
            ? 'bg-bg-surface border-2 border-cool-blue'
            : 'bg-bg-elevated border-2 border-transparent hover:bg-bg-surface'
        }
      `}
    >
      <span className='text-sm text-text-secondary'>{label}</span>
      <span
        className='text-xl font-bold font-mono'
        style={{ color: color || 'var(--text-primary)' }}
      >
        {value}
      </span>
    </button>
  );
}

function SkillListItem({
  skill,
  isSaved,
  onClick,
  onRepair,
}: {
  skill: Skill;
  isSaved: boolean;
  onClick: () => void;
  onRepair: () => void;
}) {
  const getStatusBadge = () => {
    switch (skill.state) {
      case 'ready':
        return <span className='badge badge-success'>Ready</span>;
      case 'progress':
        return <span className='badge badge-guidance'>Learning</span>;
      case 'decay':
        return <span className='badge badge-error'>Needs Review</span>;
      default:
        return <span className='badge badge-neutral'>Not Started</span>;
    }
  };

  return (
    <div
      className='card p-4 flex items-center justify-between hover:bg-bg-surface transition-colors cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            skill.state === 'ready'
              ? 'bg-neon-green/20 text-neon-green'
              : skill.state === 'progress'
                ? 'bg-cool-blue/20 text-cool-blue'
                : skill.state === 'decay'
                  ? 'bg-electric-red/20 text-electric-red'
                  : 'bg-bg-surface text-text-muted'
          }`}
        >
          {skill.state === 'ready'
            ? '★'
            : skill.state === 'progress'
              ? '◐'
              : skill.state === 'decay'
                ? '⚠'
                : '○'}
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-text-primary'>{skill.name}</p>
            {isSaved && <span className='text-xs text-cool-blue'>★ Saved</span>}
          </div>
          {skill.lastPracticed && (
            <p className='text-xs text-text-muted'>
              Last: {skill.lastPracticed}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-4'>
        {skill.score !== undefined && (
          <span className='font-mono text-text-secondary'>{skill.score}%</span>
        )}
        {getStatusBadge()}
        {skill.state === 'decay' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRepair();
            }}
            className='btn btn-danger text-xs py-1 px-3'
          >
            Repair
          </button>
        )}
      </div>
    </div>
  );
}
