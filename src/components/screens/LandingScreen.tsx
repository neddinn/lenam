'use client';

import { useState } from 'react';
import { DrillCard } from '@/components/ui/DrillCard';
import { dummyQuestions } from '@/lib/dummyData';

interface LandingScreenProps {
  onStartDrill: () => void;
  onGoToLibrary: () => void;
}

export function LandingScreen({
  onStartDrill,
  onGoToLibrary,
}: LandingScreenProps) {
  const [cardState, setCardState] = useState<
    'idle' | 'correct' | 'wrong' | 'flipping'
  >('idle');
  const heroQuestion = dummyQuestions[0];

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === heroQuestion.correctAnswer;
    setCardState(isCorrect ? 'correct' : 'wrong');
  };

  const handleContinue = () => {
    onStartDrill();
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
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          animation: 'slide-down 0.8s ease-out',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            marginBottom: '16px',
            background:
              'linear-gradient(135deg, var(--text-primary), var(--electric-teal))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Lenam
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}
        >
          Master your knowledge through{' '}
          <span style={{ color: 'var(--electric-teal)' }}>deep focus</span>{' '}
          drilling
        </p>
      </div>

      {/* Live Micro-Drill Card */}
      <div
        style={{
          animation: 'slide-up 0.6s ease-out 0.2s backwards',
          marginBottom: '48px',
        }}
      >
        <DrillCard
          question={heroQuestion}
          onAnswer={(answer) => {
            if (cardState === 'correct' || cardState === 'wrong') {
              handleContinue();
            } else {
              handleAnswer(answer);
            }
          }}
          state={cardState}
          isLanding={true}
        />
      </div>

      {/* Secondary CTAs */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          animation: 'fade-in 0.6s ease-out 0.4s backwards',
        }}
      >
        <button
          onClick={onStartDrill}
          style={{
            padding: '12px 28px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-medium)',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all var(--transition-base)',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--electric-teal)';
            e.currentTarget.style.color = 'var(--electric-teal)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-medium)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          Choose Topic
        </button>
        <button
          onClick={onGoToLibrary}
          style={{
            padding: '12px 28px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--bg-elevated)',
            color: 'var(--text-secondary)',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all var(--transition-base)',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--bg-card)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          My Library
        </button>
      </div>

      {/* Footer hint */}
      <p
        style={{
          position: 'fixed',
          bottom: '24px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          animation: 'fade-in 1s ease-out 0.6s backwards',
        }}
      >
        Press{' '}
        <kbd
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            background: 'var(--bg-elevated)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
          }}
        >
          Enter
        </kbd>{' '}
        to submit
      </p>
    </div>
  );
}
