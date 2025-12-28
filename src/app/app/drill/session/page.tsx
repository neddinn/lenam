'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, useApp } from '@/lib/context';
import {
  DrillCard,
  ReadinessMeter,
  TeachOverlay,
  ToastContainer,
  useToast,
} from '@/components';
import { DEMO_QUESTIONS, TEACH_CONTENT } from '@/lib/dummyData';

function DrillSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'General';
  const goal = searchParams.get('goal') || 'interview';

  const { isAuthenticated } = useAuth();
  const { endSession } = useApp();
  const { toasts, addToast, dismissToast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [readinessScore, setReadinessScore] = useState(45);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showTeach, setShowTeach] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const currentQuestion =
    DEMO_QUESTIONS[currentQuestionIndex % DEMO_QUESTIONS.length];
  const teachContent = TEACH_CONTENT[currentQuestion.id];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showTeach) {
        router.push('/app/drill');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, showTeach]);

  const handleAnswer = useCallback(
    (isCorrect: boolean, confidence: number) => {
      setTotalAnswered((prev) => prev + 1);

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        const isHighConfidence = confidence >= 70;
        const scoreIncrease = isHighConfidence ? 8 : 4;
        setReadinessScore((prev) => Math.min(100, prev + scoreIncrease));

        if (!isHighConfidence) {
          addToast(
            "Right answer, but you hesitated. We'll verify this later.",
            'info',
          );
        }
      } else {
        setReadinessScore((prev) => Math.max(0, prev - 5));
      }
    },
    [addToast],
  );

  const handleTeachRequest = useCallback(() => {
    setShowTeach(true);
  }, []);

  const handleNext = useCallback(() => {
    if (totalAnswered >= 4) {
      setSessionComplete(true);
      const finalScore = readinessScore;
      const finalCorrect = correctCount + 1;
      const finalTotal = totalAnswered + 1;

      endSession(finalScore, finalCorrect, finalTotal);

      setTimeout(() => {
        router.push(
          `/app/drill/summary?score=${finalScore}&correct=${finalCorrect}&total=${finalTotal}&topic=${encodeURIComponent(topic)}`,
        );
      }, 500);
      return;
    }

    setCardKey((prev) => prev + 1);
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 100);
  }, [totalAnswered, readinessScore, correctCount, topic, router, endSession]);

  const handleCloseTeach = useCallback(() => {
    setShowTeach(false);
    setTimeout(() => {
      handleNext();
    }, 300);
  }, [handleNext]);

  if (!isAuthenticated) return null;

  if (sessionComplete) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-bg-obsidian'>
        <div className='animate-scale-in text-center'>
          <div className='text-6xl mb-4'>✨</div>
          <p className='text-xl text-text-primary'>Session Complete!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-bg-obsidian'>
      {/* HUD */}
      <header className='flex items-center justify-between px-6 py-4 bg-bg-charcoal/50 border-b border-white/5'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => router.push('/app/drill')}
            className='btn btn-ghost p-2'
            aria-label='Back to setup'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M15 10H5M5 10l5-5M5 10l5 5' />
            </svg>
          </button>
          <div>
            <p className='text-sm text-text-tertiary'>
              {goal.charAt(0).toUpperCase() + goal.slice(1)} Mode
            </p>
            <p className='font-semibold text-text-primary'>{topic}</p>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <div className='text-center'>
            <p className='text-xs text-text-tertiary'>Progress</p>
            <p className='font-mono text-sm text-text-secondary'>
              {totalAnswered + 1} / 5
            </p>
          </div>

          <ReadinessMeter
            score={readinessScore}
            provisional={totalAnswered < 3}
            size='md'
            showLabel={false}
          />
        </div>
      </header>

      {/* Main drill area */}
      <main className='flex-1 flex items-center justify-center px-6 py-8'>
        <div key={cardKey} className='animate-card-enter'>
          <DrillCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            onTeachRequest={handleTeachRequest}
            onNext={handleNext}
          />
        </div>
      </main>

      {/* Keyboard hints */}
      <footer className='px-6 py-4 bg-bg-charcoal/30'>
        <div className='flex items-center justify-center gap-6 text-xs text-text-muted'>
          <span>
            <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
              1-4
            </kbd>{' '}
            Select
          </span>
          <span>
            <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
              Space
            </kbd>{' '}
            Submit
          </span>
          <span>
            <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
              T
            </kbd>{' '}
            Teach Me
          </span>
          <span>
            <kbd className='px-1.5 py-0.5 rounded bg-bg-surface font-mono'>
              Esc
            </kbd>{' '}
            Exit
          </span>
        </div>
      </footer>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {teachContent && (
        <TeachOverlay
          question={currentQuestion.question}
          correctAnswer={currentQuestion.options[currentQuestion.correctIndex]}
          content={teachContent}
          isOpen={showTeach}
          onClose={handleCloseTeach}
        />
      )}
    </div>
  );
}

export default function DrillSessionPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-bg-obsidian'>
          <div className='animate-pulse text-text-secondary'>
            Loading session...
          </div>
        </div>
      }
    >
      <DrillSessionContent />
    </Suspense>
  );
}
