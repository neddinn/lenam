'use client';

import { useState, useEffect, useCallback } from 'react';

export type DrillCardState =
  | 'idle'
  | 'armed'
  | 'submitted_correct_high_conf'
  | 'submitted_correct_low_conf'
  | 'submitted_wrong'
  | 'locked_for_teach'
  | 'transition_out';

export interface DrillQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topic: string;
}

interface DrillCardProps {
  question: DrillQuestion;
  onAnswer: (isCorrect: boolean, confidence: number) => void;
  onTeachRequest: () => void;
  onNext?: () => void;
  isLanding?: boolean;
}

export function DrillCard({
  question,
  onAnswer,
  onTeachRequest,
  onNext,
  isLanding = false,
}: DrillCardProps) {
  const [state, setState] = useState<DrillCardState>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [showTeachDrawer, setShowTeachDrawer] = useState(false);
  const [exitAnimation, setExitAnimation] = useState<string | null>(null);

  // Define handleSubmit first to avoid hoisting issues
  const handleSubmit = useCallback(() => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === question.correctIndex;
    const isHighConfidence = confidence >= 70;

    if (isCorrect) {
      if (isHighConfidence) {
        setState('submitted_correct_high_conf');
        setExitAnimation('animate-card-exit-up');
      } else {
        setState('submitted_correct_low_conf');
        setExitAnimation('animate-card-exit-side');
      }
      setTimeout(() => {
        onAnswer(true, confidence);
        onNext?.();
      }, 600);
    } else {
      setState('submitted_wrong');
      setShowTeachDrawer(true);
      onAnswer(false, confidence);
    }
  }, [selectedOption, question.correctIndex, confidence, onAnswer, onNext]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Teach with T (works when wrong answer is submitted)
      if (e.key.toLowerCase() === 't' && state === 'submitted_wrong') {
        onTeachRequest();
        return;
      }

      // All other shortcuts only work in idle/armed states
      if (state !== 'idle' && state !== 'armed') return;

      // Option selection (1-4)
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < question.options.length) {
          setSelectedOption(optionIndex);
          setState('armed');
        }
      }

      // Submit with Space
      if (e.key === ' ' && state === 'armed' && selectedOption !== null) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    state,
    selectedOption,
    question.options.length,
    handleSubmit,
    onTeachRequest,
  ]);

  const getCardClasses = () => {
    let classes =
      'card-floating w-full max-w-2xl p-8 transition-all duration-300';

    if (exitAnimation) {
      classes += ` ${exitAnimation}`;
    }

    if (state === 'submitted_wrong') {
      classes += ' border-electric-red animate-shake';
      classes = classes.replace('card-floating', 'card');
    }

    if (
      state === 'submitted_correct_high_conf' ||
      state === 'submitted_correct_low_conf'
    ) {
      classes += ' glow-success';
    }

    return classes;
  };

  const getBackgroundOverlay = () => {
    if (state === 'submitted_wrong') {
      return (
        <div className='fixed inset-0 bg-electric-red/5 pointer-events-none transition-opacity duration-300' />
      );
    }
    if (
      state === 'submitted_correct_high_conf' ||
      state === 'submitted_correct_low_conf'
    ) {
      return (
        <div className='fixed inset-0 bg-neon-green/5 pointer-events-none transition-opacity duration-300' />
      );
    }
    return null;
  };

  return (
    <>
      {getBackgroundOverlay()}

      <div
        className={getCardClasses()}
        style={
          isLanding
            ? { transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' }
            : undefined
        }
      >
        {/* Question */}
        <div className='mb-8'>
          <p className='text-lg md:text-xl font-medium text-text-primary text-balance leading-relaxed'>
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className='space-y-3 mb-8'>
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === question.correctIndex;
            const showResult =
              state === 'submitted_wrong' ||
              state === 'submitted_correct_high_conf' ||
              state === 'submitted_correct_low_conf';

            let optionClasses =
              'w-full p-4 text-left rounded-xl border transition-all duration-200 flex items-center gap-4';

            if (showResult) {
              if (isCorrect) {
                optionClasses += ' bg-neon-green/10 border-neon-green/50';
              } else if (isSelected && !isCorrect) {
                optionClasses += ' bg-electric-red/10 border-electric-red/50';
              } else {
                optionClasses +=
                  ' bg-bg-surface/50 border-transparent opacity-50';
              }
            } else if (isSelected) {
              optionClasses += ' bg-cool-blue/10 border-cool-blue';
            } else {
              optionClasses +=
                ' bg-bg-surface border-transparent hover:bg-bg-hover hover:border-white/10';
            }

            return (
              <button
                key={index}
                className={optionClasses}
                onClick={() => {
                  if (state === 'idle' || state === 'armed') {
                    setSelectedOption(index);
                    setState('armed');
                  }
                }}
                disabled={state !== 'idle' && state !== 'armed'}
              >
                <span className='flex-shrink-0 w-8 h-8 rounded-lg bg-bg-charcoal flex items-center justify-center text-sm font-mono text-text-secondary'>
                  {index + 1}
                </span>
                <span className='text-text-primary'>{option}</span>
                {showResult && isCorrect && (
                  <span className='ml-auto text-neon-green'>✓</span>
                )}
                {showResult && isSelected && !isCorrect && (
                  <span className='ml-auto text-electric-red'>✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confidence Slider - Only show when armed */}
        {(state === 'idle' || state === 'armed') && selectedOption !== null && (
          <div className='mb-6 animate-slide-up'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm text-text-secondary'>Confidence</span>
              <span className='text-sm font-mono text-text-tertiary'>
                {confidence < 40
                  ? 'Unsure'
                  : confidence < 70
                    ? 'Likely'
                    : 'Certain'}
              </span>
            </div>
            <input
              type='range'
              min='0'
              max='100'
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className='slider w-full'
            />
            <div className='flex justify-between text-xs text-text-muted mt-1'>
              <span>Unsure</span>
              <span>Certain</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {(state === 'idle' || state === 'armed') && (
          <button
            className={`btn btn-primary w-full btn-lg ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={selectedOption === null}
          >
            Submit Answer
            <span className='text-xs opacity-60 ml-2'>[Space]</span>
          </button>
        )}

        {/* Teach Me Drawer - Opens on wrong answer */}
        {showTeachDrawer && state === 'submitted_wrong' && (
          <div className='mt-6 pt-6 border-t border-white/10 animate-slide-up'>
            <button
              className='btn btn-danger w-full btn-lg animate-glow-pulse'
              onClick={onTeachRequest}
              style={{
                boxShadow: '0 0 30px rgba(255, 59, 92, 0.3)',
              }}
            >
              <span className='text-lg'>📚</span>
              Teach Me
              <span className='text-xs opacity-60 ml-2'>[T]</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default DrillCard;
