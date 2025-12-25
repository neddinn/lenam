'use client';

import { useState } from 'react';
import { DrillCard } from '@/components/ui/DrillCard';
import { dummyQuestions } from '@/lib/dummyData';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [cardState, setCardState] = useState<
    'idle' | 'correct' | 'wrong' | 'flipping'
  >('idle');
  const heroQuestion = dummyQuestions[0];

  const handleAnswer = (answer: string) => {
    if (cardState === 'correct' || cardState === 'wrong') {
      onGetStarted();
      return;
    }
    const isCorrect = answer === heroQuestion.correctAnswer;
    setCardState(isCorrect ? 'correct' : 'wrong');
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left: Copy */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: '20px',
              marginBottom: '24px',
              border: '1px solid rgba(0, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--neon-green)',
              }}
            />
            <span
              style={{
                fontSize: '13px',
                color: 'var(--electric-teal)',
                fontWeight: 500,
              }}
            >
              Now with AI-powered explanations
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px',
              color: 'var(--text-primary)',
            }}
          >
            Master any skill through{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              deep focus drilling
            </span>
          </h1>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              maxWidth: '480px',
            }}
          >
            Stop passive learning. Lenam uses spaced repetition,
            confidence-based scoring, and AI-guided explanations to help you
            truly internalize technical concepts.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--electric-teal)',
                color: 'var(--bg-obsidian)',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#33ffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(0, 255, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--electric-teal)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Learning Free
            </button>
            <button
              onClick={() => {
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid var(--border-medium)',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-secondary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
              }}
            >
              See How It Works
            </button>
          </div>

          {/* Social Proof */}
          <div style={{ marginTop: '48px' }}>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}
            >
              Trusted by developers at
            </p>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                opacity: 0.6,
              }}
            >
              {['Google', 'Meta', 'Amazon', 'Microsoft'].map((company) => (
                <span
                  key={company}
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Demo Card */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            {/* Glow Effect Behind Card */}
            <div
              style={{
                position: 'absolute',
                inset: '-20%',
                background:
                  'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
            />

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Try it now — no signup required
              </span>
            </div>

            <DrillCard
              question={heroQuestion}
              onAnswer={handleAnswer}
              state={cardState}
              isLanding={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
