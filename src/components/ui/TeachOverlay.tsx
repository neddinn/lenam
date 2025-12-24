'use client';

import { useState, useEffect } from 'react';

type TeachTab = 'concept' | 'code' | 'speech';

interface TeachContent {
  concept: string;
  code?: string;
  codeLanguage?: string;
  bridgeNote?: string;
  bridgeContext?: string; // e.g., "Java"
}

interface TeachOverlayProps {
  question: string;
  correctAnswer: string;
  content: TeachContent;
  onClose: () => void;
  isOpen: boolean;
}

export function TeachOverlay({
  question,
  correctAnswer,
  content,
  onClose,
  isOpen,
}: TeachOverlayProps) {
  const [activeTab, setActiveTab] = useState<TeachTab>('concept');
  const [isAnimating, setIsAnimating] = useState(false);

  // Keyboard escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Tab switching animation
  const handleTabChange = (tab: TeachTab) => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 150);
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'concept' as TeachTab, icon: '🧠', label: 'Concept' },
    { id: 'code' as TeachTab, icon: '🛠️', label: 'Code' },
    { id: 'speech' as TeachTab, icon: '🎤', label: 'Speech' },
  ];

  return (
    <div
      className='fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center p-4 animate-fade-in'
      role='dialog'
      aria-modal='true'
      aria-labelledby='teach-title'
    >
      {/* Blurred backdrop showing question underneath */}
      <div
        className='absolute inset-0 bg-bg-obsidian/70 backdrop-blur-md'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Main overlay panel */}
      <div className='relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl glass-strong animate-scale-in'>
        {/* Header */}
        <div className='p-6 border-b border-white/10'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h2
                id='teach-title'
                className='text-xl font-semibold text-text-primary mb-2'
              >
                Understanding the Gap
              </h2>
              <p className='text-sm text-text-secondary line-clamp-2'>
                {question}
              </p>
            </div>
            <button
              onClick={onClose}
              className='btn btn-ghost p-2 rounded-lg'
              aria-label='Close teaching overlay'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M15 5L5 15M5 5l10 10' />
              </svg>
            </button>
          </div>

          {/* Delta Block - The Answer */}
          <div className='mt-4 p-4 rounded-xl bg-cool-blue/10 border border-cool-blue/30'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-cool-blue'>💡</span>
              <span className='text-sm font-medium text-cool-blue'>
                Correct Answer
              </span>
            </div>
            <p className='text-lg font-medium text-cool-blue'>
              {correctAnswer}
            </p>
          </div>
        </div>

        {/* Content area with scrolling */}
        <div className='p-6 overflow-y-auto max-h-[50vh]'>
          <div
            className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            {activeTab === 'concept' && (
              <div className='prose prose-invert max-w-none'>
                <p className='text-text-primary leading-relaxed whitespace-pre-wrap'>
                  {content.concept}
                </p>
              </div>
            )}

            {activeTab === 'code' && content.code && (
              <div className='code-block'>
                <div className='flex items-center justify-between mb-3 pb-3 border-b border-white/10'>
                  <span className='text-xs text-text-tertiary uppercase tracking-wider'>
                    {content.codeLanguage || 'Code'}
                  </span>
                  <button className='btn btn-ghost text-xs'>Copy</button>
                </div>
                <pre className='text-sm'>
                  <code>{content.code}</code>
                </pre>
              </div>
            )}

            {activeTab === 'speech' && (
              <div className='text-center py-8'>
                <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-cool-blue/20 flex items-center justify-center'>
                  <span className='text-2xl'>🎤</span>
                </div>
                <p className='text-text-secondary mb-4'>
                  Audio explanation coming soon
                </p>
                <button className='btn btn-guidance'>Generate Audio</button>
              </div>
            )}

            {/* Bridge Note - AI-driven contextual hint */}
            {content.bridgeNote && content.bridgeContext && (
              <div className='mt-6 p-4 rounded-xl bg-cool-blue/5 border border-cool-blue/20 relative'>
                <div className='absolute -top-3 left-4 px-2 py-0.5 bg-bg-elevated rounded-full'>
                  <span className='text-xs text-cool-blue font-medium'>
                    🔗 For {content.bridgeContext} developers
                  </span>
                </div>
                <p className='text-sm text-text-secondary leading-relaxed pt-2'>
                  {content.bridgeNote}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Steering Strip - Sticky bottom bar */}
        <div className='sticky bottom-0 p-4 border-t border-white/10 bg-bg-elevated/80 backdrop-blur-sm'>
          <div className='flex items-center justify-between gap-4'>
            {/* Tab buttons */}
            <div className='flex gap-1 p-1 rounded-xl bg-bg-surface'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-bg-elevated text-text-primary shadow-md'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className='hidden sm:inline'>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Got it button */}
            <button onClick={onClose} className='btn btn-primary'>
              Got it
              <span className='text-xs opacity-60 ml-1'>[Esc]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachOverlay;
