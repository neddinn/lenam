'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface GoalToggleOption {
  id: string;
  label: string;
  placeholder: string;
}

interface SetupInputProps {
  onStart: (topic: string, goal: string) => void;
}

const GOAL_OPTIONS: GoalToggleOption[] = [
  {
    id: 'interview',
    label: 'Interview',
    placeholder: 'Algo & System Design...',
  },
  { id: 'build', label: 'Build', placeholder: 'Syntax & Patterns...' },
  { id: 'concept', label: 'Concept', placeholder: 'Deep understanding...' },
];

// Topic-based colors for contextual background
const TOPIC_COLORS: Record<string, string> = {
  react: '#61dafb',
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  rust: '#dea584',
  go: '#00add8',
  java: '#ed8b00',
  node: '#68a063',
  sql: '#336791',
  aws: '#ff9900',
  docker: '#2496ed',
  kubernetes: '#326ce5',
};

// Derive background color from topic using useMemo instead of useEffect
function useTopicColor(topic: string): string | null {
  return useMemo(() => {
    const lowerTopic = topic.toLowerCase();
    for (const [key, color] of Object.entries(TOPIC_COLORS)) {
      if (lowerTopic.includes(key)) {
        return color;
      }
    }
    return null;
  }, [topic]);
}

export function SetupInput({ onStart }: SetupInputProps) {
  const [topic, setTopic] = useState('');
  const [activeGoal, setActiveGoal] = useState('interview');
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive background color from topic
  const bgColor = useTopicColor(topic);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const currentGoal = GOAL_OPTIONS.find((g) => g.id === activeGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart(topic.trim(), activeGoal);
    }
  };

  return (
    <>
      {/* Contextual background glow */}
      {bgColor && (
        <div
          className='fixed inset-0 pointer-events-none transition-opacity duration-500'
          style={{
            background: `radial-gradient(ellipse at center, ${bgColor}15 0%, transparent 70%)`,
          }}
        />
      )}

      <div className='w-full max-w-xl mx-auto animate-slide-up'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Goal Toggle Pills */}
          <div className='flex justify-center'>
            <div className='pill-toggle'>
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => setActiveGoal(option.id)}
                  className={`pill-toggle-option ${activeGoal === option.id ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Search Input */}
          <div className='relative'>
            <input
              ref={inputRef}
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                currentGoal?.placeholder || 'What are we mastering today?'
              }
              className='input input-lg text-center text-xl font-medium placeholder:text-text-muted'
              style={{
                background: 'var(--bg-elevated)',
                borderColor: bgColor
                  ? `${bgColor}50`
                  : 'rgba(255, 255, 255, 0.08)',
              }}
            />

            {/* Topic hint indicator */}
            {bgColor && (
              <div
                className='absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse'
                style={{ backgroundColor: bgColor }}
              />
            )}
          </div>

          {/* Start Button */}
          <button
            type='submit'
            disabled={!topic.trim()}
            className={`btn btn-primary btn-xl w-full ${
              !topic.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={
              bgColor
                ? {
                    background: bgColor,
                    color: '#000',
                  }
                : undefined
            }
          >
            Start Drill
            <span className='ml-2'>→</span>
          </button>

          {/* Keyboard hint */}
          <p className='text-center text-xs text-text-muted'>
            Press{' '}
            <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
              Enter
            </kbd>{' '}
            to start
          </p>
        </form>
      </div>
    </>
  );
}

export default SetupInput;
