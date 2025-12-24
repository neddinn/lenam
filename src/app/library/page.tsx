'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SkillOrb, ToastContainer, useToast } from '@/components';
import { DEMO_SKILLS, Skill } from '@/lib/dummyData';

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'ready' | 'progress' | 'decay' | 'grey';

export default function LibraryPage() {
  const router = useRouter();
  const { toasts, addToast, dismissToast } = useToast();

  const [skills, setSkills] = useState<Skill[]>(DEMO_SKILLS);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter skills
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || skill.state === filter;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: skills.length,
    ready: skills.filter((s) => s.state === 'ready').length,
    progress: skills.filter((s) => s.state === 'progress').length,
    decay: skills.filter((s) => s.state === 'decay').length,
    grey: skills.filter((s) => s.state === 'grey').length,
  };

  // Handlers
  const handleSkillClick = useCallback(
    (skill: Skill) => {
      router.push(
        `/drill?topic=${encodeURIComponent(skill.name)}&goal=interview`,
      );
    },
    [router],
  );

  const handleRepair = useCallback(
    (skill: Skill) => {
      addToast(`Starting repair session for ${skill.name}...`, 'info');
      setTimeout(() => {
        router.push(
          `/drill?topic=${encodeURIComponent(skill.name)}&goal=interview&mode=repair`,
        );
      }, 500);
    },
    [addToast, router],
  );

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between px-6 py-4 border-b border-white/5'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='text-xl font-bold text-text-primary'>
            Lenam
          </Link>
          <span className='text-text-muted'>/</span>
          <h1 className='text-lg font-medium text-text-secondary'>Library</h1>
        </div>
        <Link href='/setup' className='btn btn-primary'>
          Start Drill
        </Link>
      </header>

      <main className='flex-1 px-6 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Stats Overview */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-8'>
            <StatPill
              label='Total'
              value={stats.total}
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            <StatPill
              label='Ready'
              value={stats.ready}
              color='var(--neon-green)'
              active={filter === 'ready'}
              onClick={() => setFilter('ready')}
            />
            <StatPill
              label='Learning'
              value={stats.progress}
              color='var(--cool-blue)'
              active={filter === 'progress'}
              onClick={() => setFilter('progress')}
            />
            <StatPill
              label='Needs Review'
              value={stats.decay}
              color='var(--electric-red)'
              active={filter === 'decay'}
              onClick={() => setFilter('decay')}
            />
            <StatPill
              label='Not Started'
              value={stats.grey}
              active={filter === 'grey'}
              onClick={() => setFilter('grey')}
            />
          </div>

          {/* Search and View Toggle */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8'>
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search skills...'
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
              <p className='text-text-secondary'>No skills found</p>
              <p className='text-text-muted text-sm mt-1'>
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
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
  onClick,
  onRepair,
}: {
  skill: Skill;
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
          <p className='font-medium text-text-primary'>{skill.name}</p>
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
