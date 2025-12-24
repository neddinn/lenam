'use client';

import { useState, useEffect } from 'react';
import { DrillCard } from '@/components/drill/DrillCard';
import { RemediationView } from '@/components/drill/RemediationView';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pause, SkipForward, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock Data
const MOCK_QUESTIONS = [
  {
    question:
      'In React, which Hook would you use to synchronize a component with an external system (like a browser API)?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctIndex: 1,
  },
  {
    question: 'What is the primary purpose of the useCallback hook?',
    options: [
      'To memoize expensive calculations',
      'To memoize callback functions between renders',
      'To manage complex state logic',
      'To share state across components',
    ],
    correctIndex: 1,
  },
  {
    question:
      'Which lifecycle method does useEffect with an empty dependency array replace?',
    options: [
      'componentWillMount',
      'componentDidMount',
      'componentWillUpdate',
      'componentDidUpdate',
    ],
    correctIndex: 1,
  },
];

export default function DrillPage() {
  const [readiness, setReadiness] = useState(62);
  const [view, setView] = useState<'drill' | 'remediation'>('drill');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = MOCK_QUESTIONS[questionIndex % MOCK_QUESTIONS.length];

  const handleComplete = (isCorrect: boolean) => {
    setQuestionsAnswered((prev) => prev + 1);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setReadiness((prev) => Math.min(100, prev + 3));
    } else {
      setReadiness((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setView('drill');
  };

  // Determine readiness color
  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-500';
  };

  const getReadinessStrokeColor = (score: number) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 50) return 'stroke-amber-500';
    return 'stroke-red-400';
  };

  return (
    <div className='min-h-screen bg-[#FAFAF9] flex flex-col relative'>
      {/* Clean, Focused Header */}
      <header className='px-6 py-4 flex items-center justify-between sticky top-0 z-20 bg-[#FAFAF9]/90 backdrop-blur-sm border-b border-neutral-100/50'>
        <div className='flex items-center gap-6'>
          {/* Exit */}
          <Link
            href='/'
            className='w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-all'
          >
            <X size={18} />
          </Link>

          {/* Session Info */}
          <div className='hidden sm:block'>
            <h1 className='text-sm font-semibold text-neutral-900'>
              React Core Concepts
            </h1>
            <div className='flex items-center gap-3 text-xs text-neutral-400'>
              <span>Interview Prep</span>
              <span className='w-1 h-1 rounded-full bg-neutral-300' />
              <span>Solid Depth</span>
            </div>
          </div>
        </div>

        {/* Center: Timer & Progress */}
        <div className='flex items-center gap-6'>
          <div className='text-center'>
            <div className='text-xs text-neutral-400 uppercase tracking-wider font-medium'>
              Time
            </div>
            <div className='text-lg font-mono font-semibold text-neutral-900 tabular-nums'>
              {formatTime(elapsedTime)}
            </div>
          </div>

          <div className='h-8 w-px bg-neutral-200' />

          <div className='text-center'>
            <div className='text-xs text-neutral-400 uppercase tracking-wider font-medium'>
              Question
            </div>
            <div className='text-lg font-semibold text-neutral-900 tabular-nums'>
              {questionsAnswered + 1}{' '}
              <span className='text-neutral-300'>/</span>{' '}
              <span className='text-neutral-400'>12</span>
            </div>
          </div>
        </div>

        {/* Right: Readiness Score */}
        <div className='flex items-center gap-4'>
          <div className='text-right hidden sm:block'>
            <div className='text-xs text-neutral-400 uppercase tracking-wider font-medium'>
              Readiness
            </div>
            <div
              className={cn(
                'text-2xl font-bold tabular-nums',
                getReadinessColor(readiness),
              )}
            >
              {readiness}%
            </div>
          </div>

          {/* Circular Progress */}
          <div className='w-14 h-14 relative'>
            <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
              <circle
                className='stroke-neutral-100'
                cx='18'
                cy='18'
                r='15.5'
                fill='none'
                strokeWidth='3'
              />
              <circle
                className={cn(
                  'transition-all duration-700 ease-out',
                  getReadinessStrokeColor(readiness),
                )}
                cx='18'
                cy='18'
                r='15.5'
                fill='none'
                strokeWidth='3'
                strokeLinecap='round'
                strokeDasharray={`${readiness * 0.975} 100`}
              />
            </svg>
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center text-sm font-bold sm:hidden',
                getReadinessColor(readiness),
              )}
            >
              {readiness}
            </div>
          </div>
        </div>
      </header>

      {/* Main Stage */}
      <main className='flex-1 flex flex-col items-center justify-center p-6 pb-24'>
        <AnimatePresence mode='wait'>
          {view === 'drill' ? (
            <motion.div
              key={`drill-${questionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='w-full'
            >
              <DrillCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctIndex={currentQuestion.correctIndex}
                onComplete={handleComplete}
                onTeachMe={() => setView('remediation')}
              />
            </motion.div>
          ) : (
            <motion.div
              key='remediation'
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='w-full h-full flex items-center justify-center'
            >
              <RemediationView
                onClose={() => {
                  handleNext();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Bar - Controls & Hints */}
      <div className='fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-neutral-100 px-6 py-4'>
        <div className='max-w-2xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-4 text-neutral-400'>
            <button className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-600 transition-all text-sm font-medium'>
              <Pause size={16} />
              <span className='hidden sm:inline'>Pause</span>
            </button>
            <button className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-600 transition-all text-sm font-medium'>
              <SkipForward size={16} />
              <span className='hidden sm:inline'>Skip</span>
            </button>
          </div>

          <div className='text-xs text-neutral-400 flex items-center gap-4'>
            <span className='hidden md:flex items-center gap-1.5'>
              <kbd className='px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px]'>
                1-4
              </kbd>
              select
            </span>
            <span className='hidden md:flex items-center gap-1.5'>
              <kbd className='px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px]'>
                ⏎
              </kbd>
              confirm
            </span>
            <button className='flex items-center gap-1.5 text-neutral-500 hover:text-neutral-700 transition-colors'>
              <HelpCircle size={14} />
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
