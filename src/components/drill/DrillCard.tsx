'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ConfidenceSelector } from './ConfidenceSelector';
import { AlertCircle, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export type DrillCardState =
  | 'idle'
  | 'selected'
  | 'confidence_check'
  | 'submitted_correct'
  | 'submitted_wrong';

interface DrillCardProps {
  question: string;
  options: string[];
  correctIndex: number; // 0-indexed
  onComplete: (isCorrect: boolean) => void;
  onTeachMe?: () => void;
}

export function DrillCard({
  question,
  options,
  correctIndex,
  onComplete,
  onTeachMe,
}: DrillCardProps) {
  const [state, setState] = useState<DrillCardState>('idle');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<'low' | 'high' | null>(null);

  const handleOptionSelect = useCallback(
    (idx: number) => {
      if (state !== 'idle' && state !== 'selected') return;
      setSelectedIdx(idx);
      setState('confidence_check'); // Fast forward to confidence check immediately on click for better flow?
      // Design brief: "Confidence selector required *before* submit".
      // Let's make it a two step: click option -> reveal confidence -> click confidence -> submit.
    },
    [state],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state === 'idle' || state === 'selected') {
        const num = parseInt(e.key);
        if (!isNaN(num) && num > 0 && num <= options.length) {
          handleOptionSelect(num - 1);
        }
      }
      if (e.key === 'Enter' && state === 'selected' && selectedIdx !== null) {
        setState('confidence_check');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, options.length, selectedIdx, handleOptionSelect]);

  const handleSubmit = (conf: 'low' | 'high') => {
    setConfidence(conf);
    if (selectedIdx === correctIndex) {
      setState('submitted_correct');
      onComplete(true);
    } else {
      setState('submitted_wrong');
      // onComplete(false); // Don't auto-advance on wrong, let them read or click teach me
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto perspective-1000'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'bg-white rounded-2xl shadow-paper border border-neutral-100 overflow-hidden relative transition-all duration-500',
          state === 'submitted_wrong' ? 'border-red-100 shadow-red-100/50' : '',
          state === 'submitted_correct'
            ? 'border-green-100 shadow-green-100/50'
            : '',
        )}
      >
        {/* Progress / Status Bar at top of card */}
        <div className='h-1 w-full bg-neutral-50 flex'>
          {state === 'submitted_correct' && (
            <motion.div
              layoutId='status'
              className='h-full bg-green-500 w-full'
            />
          )}
          {state === 'submitted_wrong' && (
            <motion.div
              layoutId='status'
              className='h-full bg-red-500 w-full'
            />
          )}
        </div>

        <div className='p-8 md:p-10 space-y-8'>
          {/* Question */}
          <h2 className='text-2xl md:text-3xl font-medium text-foreground leading-tight'>
            {question}
          </h2>

          {/* Options */}
          <div className='space-y-3'>
            {options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = correctIndex === idx;
              const showResult =
                state === 'submitted_correct' || state === 'submitted_wrong';

              let variantClass =
                'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'; // Default

              if (isSelected && !showResult) {
                variantClass =
                  'border-neutral-900 ring-1 ring-neutral-900 bg-neutral-50';
              }

              if (showResult) {
                if (isSelected && isCorrect)
                  variantClass = 'border-green-500 bg-green-50 text-green-900';
                if (isSelected && !isCorrect)
                  variantClass = 'border-red-500 bg-red-50 text-red-900';
                if (!isSelected && isCorrect && state === 'submitted_wrong')
                  variantClass =
                    'border-green-200 bg-green-50 text-green-800 border-dashed'; // Show correct answer if wrong
                if (!isSelected && !isCorrect)
                  variantClass = 'opacity-50 border-neutral-100';
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={showResult}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border text-lg transition-all duration-200 flex items-center justify-between group',
                    variantClass,
                  )}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className='flex items-center gap-4'>
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium text-neutral-400 transition-colors',
                        isSelected
                          ? 'border-neutral-900 text-neutral-900'
                          : 'border-neutral-200 group-hover:border-neutral-300',
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </span>

                  {/* Result Icons */}
                  {showResult && isSelected && isCorrect && (
                    <CheckCircle2 className='text-green-600' size={20} />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <AlertCircle className='text-red-500' size={20} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Confidence Check Reveal */}
          <AnimatePresence>
            {state === 'confidence_check' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='overflow-hidden'
              >
                <div className='pt-4 border-t border-neutral-100'>
                  <p className='text-sm text-neutral-400 mb-3 text-center'>
                    How confident are you?
                  </p>
                  <ConfidenceSelector onSelect={handleSubmit} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post-Submit Actions */}
          <AnimatePresence>
            {(state === 'submitted_correct' || state === 'submitted_wrong') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='pt-6 border-t border-neutral-100 flex items-center justify-between'
              >
                <div className='text-sm font-medium'>
                  {state === 'submitted_correct' ? (
                    <span className='text-green-600 flex items-center gap-2'>
                      <SparkleIcon /> Nicely done.
                    </span>
                  ) : (
                    <span className='text-red-600'>Not quite.</span>
                  )}
                </div>

                <div className='flex gap-3'>
                  {state === 'submitted_wrong' && (
                    <Button
                      onClick={onTeachMe}
                      variant='secondary'
                      className='gap-2 text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200'
                    >
                      <BookOpen size={16} /> Teach Me
                    </Button>
                  )}
                  <Button
                    onClick={() => window.location.reload()}
                    variant={
                      state === 'submitted_correct' ? 'primary' : 'ghost'
                    }
                  >
                    Next <ArrowRight size={16} className='ml-2' />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const SparkleIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='animate-pulse'
  >
    <path
      d='M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z'
      fill='currentColor'
    />
  </svg>
);
