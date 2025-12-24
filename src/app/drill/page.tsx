'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  DrillCard,
  ReadinessMeter,
  TeachOverlay,
  ToastContainer,
  useToast,
} from '@/components';
import { DEMO_QUESTIONS, TEACH_CONTENT } from '@/lib/dummyData';

function DrillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'General';
  const goal = searchParams.get('goal') || 'interview';

  const { toasts, addToast, dismissToast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [readinessScore, setReadinessScore] = useState(45);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showTeach, setShowTeach] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [cardKey, setCardKey] = useState(0); // For forcing card remount

  const currentQuestion =
    DEMO_QUESTIONS[currentQuestionIndex % DEMO_QUESTIONS.length];
  const teachContent = TEACH_CONTENT[currentQuestion.id];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/setup');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleAnswer = useCallback(
    (isCorrect: boolean, confidence: number) => {
      setTotalAnswered((prev) => prev + 1);

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);

        // Update readiness score
        const isHighConfidence = confidence >= 70;
        const scoreIncrease = isHighConfidence ? 8 : 4;
        setReadinessScore((prev) => Math.min(100, prev + scoreIncrease));

        // Show toast for low confidence correct
        if (!isHighConfidence) {
          addToast(
            "Right answer, but you hesitated. We'll verify this later.",
            'info',
          );
        }
      } else {
        // Decrease score slightly on wrong
        setReadinessScore((prev) => Math.max(0, prev - 5));
      }
    },
    [addToast],
  );

  const handleTeachRequest = useCallback(() => {
    setShowTeach(true);
  }, []);

  const handleNext = useCallback(() => {
    // Check if session is complete (e.g., after 5 questions)
    if (totalAnswered >= 4) {
      setSessionComplete(true);
      setTimeout(() => {
        router.push(
          `/summary?score=${readinessScore}&correct=${correctCount + 1}&total=${totalAnswered + 1}&topic=${encodeURIComponent(topic)}`,
        );
      }, 500);
      return;
    }

    // Move to next question with animation
    setCardKey((prev) => prev + 1);
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 100);
  }, [totalAnswered, readinessScore, correctCount, topic, router]);

  const handleCloseTeach = useCallback(() => {
    setShowTeach(false);
    // After closing teach, move to next question
    setTimeout(() => {
      handleNext();
    }, 300);
  }, [handleNext]);

  if (sessionComplete) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-scale-in text-center'>
          <div className='text-6xl mb-4'>✨</div>
          <p className='text-xl text-text-primary'>Session Complete!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      {/* HUD - Heads Up Display */}
      <header className='flex items-center justify-between px-6 py-4'>
        {/* Topic */}
        <div className='flex items-center gap-3'>
          <Link
            href='/setup'
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
          </Link>
          <div>
            <p className='text-sm text-text-tertiary'>Topic</p>
            <p className='font-semibold text-text-primary'>{topic}</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className='flex items-center gap-4'>
          <div className='text-center'>
            <p className='text-xs text-text-tertiary'>Progress</p>
            <p className='font-mono text-sm text-text-secondary'>
              {totalAnswered + 1} / 5
            </p>
          </div>

          {/* Readiness Meter */}
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

      {/* Footer with keyboard hints */}
      <footer className='px-6 py-4'>
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

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Teach Overlay */}
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

export default function DrillPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-pulse text-text-secondary'>Loading...</div>
        </div>
      }
    >
      <DrillContent />
    </Suspense>
  );
}
