'use client';

import { useState } from 'react';
import { DrillCard } from '@/components/ui/DrillCard';
import { ReadinessRing } from '@/components/ui/ReadinessRing';
import { dummyQuestions } from '@/lib/dummyData';
import { Question } from '@/lib/types';

interface DrillScreenProps {
  topic: string;
  goal: 'interview' | 'build' | 'concept';
  onComplete: (results: DrillResult[]) => void;
  onTeachMe: (question: Question) => void;
}

interface DrillResult {
  question: Question;
  userAnswer: string;
  confidence: number;
  isCorrect: boolean;
}

export function DrillScreen({
  topic,
  goal,
  onComplete,
  onTeachMe,
}: DrillScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<
    'idle' | 'correct' | 'wrong' | 'flipping'
  >('idle');
  const [results, setResults] = useState<DrillResult[]>([]);
  const [score, setScore] = useState(0);
  const [exitAnimation, setExitAnimation] = useState<
    'none' | 'blast' | 'slide'
  >('none');

  const questions = dummyQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answer: string, confidence: number) => {
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (cardState === 'idle') {
      // First submission
      setCardState(isCorrect ? 'correct' : 'wrong');
      const newResult: DrillResult = {
        question: currentQuestion,
        userAnswer: answer,
        confidence,
        isCorrect,
      };
      setResults([...results, newResult]);

      if (isCorrect) {
        setScore((prev) => prev + Math.round(1 + confidence / 50));
      }
    } else {
      // After feedback, move to next or teach me
      if (!isCorrect || cardState === 'wrong') {
        onTeachMe(currentQuestion);
        return;
      }

      // Animate out and go to next
      if (isCorrect && confidence > 70) {
        setExitAnimation('blast');
      } else {
        setExitAnimation('slide');
      }

      setTimeout(() => {
        if (currentIndex + 1 >= totalQuestions) {
          onComplete(results);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setCardState('idle');
          setExitAnimation('none');
        }
      }, 400);
    }
  };

  const getExitStyle = () => {
    if (exitAnimation === 'blast') {
      return {
        animation: 'blast-off 0.4s ease-in forwards',
      };
    }
    if (exitAnimation === 'slide') {
      return {
        animation: 'slide-out-right 0.4s ease-in forwards',
      };
    }
    return {};
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1,
        background:
          cardState === 'wrong' ? 'rgba(255, 0, 0, 0.03)' : 'transparent',
        transition: 'background var(--transition-fast)',
      }}
    >
      {/* HUD - Top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background:
            'linear-gradient(to bottom, var(--bg-obsidian) 0%, transparent 100%)',
          zIndex: 10,
        }}
      >
        {/* Topic */}
        <div>
          <span
            style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            {topic}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--electric-teal)',
              marginLeft: '8px',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 255, 255, 0.1)',
            }}
          >
            {goal}
          </span>
        </div>

        {/* Readiness Ring */}
        <ReadinessRing score={Math.min(100, score * 5)} size={60} />
      </div>

      {/* Progress indicator */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {questions.map((_, index) => (
          <div
            key={index}
            style={{
              width: index <= currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background:
                index < currentIndex
                  ? results[index]?.isCorrect
                    ? 'var(--neon-green)'
                    : 'var(--electric-red)'
                  : index === currentIndex
                    ? 'var(--electric-teal)'
                    : 'var(--bg-elevated)',
              transition: 'all var(--transition-base)',
            }}
          />
        ))}
      </div>

      {/* Drill Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          ...getExitStyle(),
        }}
      >
        <DrillCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          state={cardState}
        />
      </div>

      {/* Shimmer message for low confidence correct */}
      {cardState === 'correct' &&
        results[results.length - 1]?.confidence < 50 && (
          <div
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--electric-teal)',
              color: 'var(--electric-teal)',
              fontSize: '14px',
              animation: 'slide-up 0.3s ease-out',
              boxShadow: 'var(--glow-teal)',
            }}
          >
            ✨ Correct, but you hesitated. We&apos;ll fortify this.
          </div>
        )}

      {/* Keyboard hint */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <span>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--bg-elevated)',
              fontFamily: 'var(--font-mono)',
              marginRight: '4px',
            }}
          >
            1-4
          </kbd>
          Select
        </span>
        <span>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--bg-elevated)',
              fontFamily: 'var(--font-mono)',
              marginRight: '4px',
            }}
          >
            Enter
          </kbd>
          Submit
        </span>
      </div>
    </div>
  );
}
