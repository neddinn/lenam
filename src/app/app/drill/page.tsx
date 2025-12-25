'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useApp } from '@/lib/context';
import { AppShell } from '@/components/layout/AppShell';

// Available topics with metadata
const TOPICS = [
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'Frontend',
    difficulty: 'Mid',
  },
  {
    id: 'react-performance',
    name: 'React Performance',
    category: 'Frontend',
    difficulty: 'Senior',
  },
  {
    id: 'typescript-advanced',
    name: 'TypeScript Advanced',
    category: 'Frontend',
    difficulty: 'Senior',
  },
  {
    id: 'javascript-fundamentals',
    name: 'JavaScript Fundamentals',
    category: 'Frontend',
    difficulty: 'Junior',
  },
  {
    id: 'system-design-basics',
    name: 'System Design Basics',
    category: 'System Design',
    difficulty: 'Mid',
  },
  {
    id: 'system-design-advanced',
    name: 'System Design Advanced',
    category: 'System Design',
    difficulty: 'Senior',
  },
  {
    id: 'sql-essentials',
    name: 'SQL Essentials',
    category: 'Backend',
    difficulty: 'Junior',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Backend',
    difficulty: 'Mid',
  },
  {
    id: 'nodejs-internals',
    name: 'Node.js Internals',
    category: 'Backend',
    difficulty: 'Senior',
  },
  {
    id: 'algorithms-basics',
    name: 'Algorithms Basics',
    category: 'DSA',
    difficulty: 'Junior',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    category: 'DSA',
    difficulty: 'Mid',
  },
  {
    id: 'aws-fundamentals',
    name: 'AWS Fundamentals',
    category: 'Cloud',
    difficulty: 'Mid',
  },
];

const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'System Design',
  'DSA',
  'Cloud',
];

type Goal = 'interview' | 'build' | 'concept';

export default function DrillSetupPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { startSession } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [goal, setGoal] = useState<Goal>('interview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isStarting, setIsStarting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Filter topics
  const filteredTopics = TOPICS.filter((topic) => {
    const matchesSearch = topic.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || topic.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartDrill = () => {
    if (!selectedTopic) return;

    setIsStarting(true);
    const topic = TOPICS.find((t) => t.id === selectedTopic);
    startSession(topic?.name || selectedTopic, goal);

    setTimeout(() => {
      router.push(
        `/app/drill/session?topic=${encodeURIComponent(topic?.name || selectedTopic)}&goal=${goal}`,
      );
    }, 300);
  };

  const goalOptions: { id: Goal; label: string; desc: string }[] = [
    { id: 'interview', label: 'Interview', desc: 'Algo & System Design focus' },
    { id: 'build', label: 'Build', desc: 'Syntax & Patterns focus' },
    { id: 'concept', label: 'Concept', desc: 'Deep understanding focus' },
  ];

  return (
    <AppShell>
      <div
        className={`p-6 lg:p-8 max-w-4xl mx-auto ${isStarting ? 'animate-implode' : ''}`}
      >
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-text-primary mb-2'>
            Start a Drill Session
          </h1>
          <p className='text-text-secondary'>
            Pick a topic and goal. We&apos;ll tailor the questions to your
            level.
          </p>
        </div>

        {/* Goal selector */}
        <div className='card p-6 mb-6'>
          <h2 className='text-sm font-medium text-text-secondary mb-4'>
            1. What&apos;s your goal?
          </h2>
          <div className='grid sm:grid-cols-3 gap-3'>
            {goalOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setGoal(option.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  goal === option.id
                    ? 'bg-cool-blue/10 border-cool-blue text-text-primary'
                    : 'bg-bg-surface border-transparent hover:bg-bg-hover text-text-secondary'
                }`}
              >
                <p className='font-medium'>{option.label}</p>
                <p className='text-xs text-text-muted mt-1'>{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Topic selector */}
        <div className='card p-6 mb-6'>
          <h2 className='text-sm font-medium text-text-secondary mb-4'>
            2. Choose a topic
          </h2>

          {/* Search */}
          <div className='relative mb-4'>
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

          {/* Category filter */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-cool-blue/20 text-cool-blue'
                    : 'bg-bg-surface text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Topics grid */}
          <div className='grid sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto'>
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-neon-green/10 border-neon-green text-text-primary'
                    : 'bg-bg-surface border-transparent hover:bg-bg-hover text-text-secondary'
                }`}
              >
                <p className='font-medium'>{topic.name}</p>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-xs text-text-muted'>
                    {topic.category}
                  </span>
                  <span className='text-xs text-text-muted'>•</span>
                  <span
                    className={`text-xs ${
                      topic.difficulty === 'Junior'
                        ? 'text-neon-green'
                        : topic.difficulty === 'Mid'
                          ? 'text-cool-blue'
                          : 'text-amber-400'
                    }`}
                  >
                    {topic.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <p className='text-center text-text-muted py-8'>
              No topics found. Try a different search.
            </p>
          )}
        </div>

        {/* User context */}
        {user?.backgroundTags && user.backgroundTags.length > 0 && (
          <div className='card p-6 mb-6'>
            <h2 className='text-sm font-medium text-text-secondary mb-3'>
              Your background
            </h2>
            <div className='flex flex-wrap gap-2'>
              {user.backgroundTags.map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1 rounded-full bg-cool-blue/10 text-cool-blue text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className='text-xs text-text-muted mt-3'>
              We&apos;ll use this to personalize explanations when you get
              stuck.
            </p>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={handleStartDrill}
          disabled={!selectedTopic}
          className={`btn btn-primary btn-xl w-full ${
            !selectedTopic ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={
            selectedTopic
              ? { boxShadow: '0 0 30px var(--neon-green-glow)' }
              : undefined
          }
        >
          {selectedTopic ? (
            <>
              Start Drill
              <span className='ml-2'>→</span>
            </>
          ) : (
            'Select a topic to continue'
          )}
        </button>
      </div>
    </AppShell>
  );
}
