'use client';

import { useState, useEffect, useMemo } from 'react';
import { Question } from '@/lib/types';

interface SummaryScreenProps {
  topic: string;
  results: {
    question: Question;
    userAnswer: string;
    confidence: number;
    isCorrect: boolean;
  }[];
  previousScore: number;
  onContinue: (action: 'redrill' | 'explore' | 'library') => void;
}

export function SummaryScreen({
  topic,
  results,
  previousScore,
  onContinue,
}: SummaryScreenProps) {
  const [displayScore, setDisplayScore] = useState(previousScore);
  const [showBadge, setShowBadge] = useState(false);

  const correctCount = results.filter((r) => r.isCorrect).length;
  const newScore = Math.min(
    100,
    previousScore + correctCount * 5 + (results.length > 0 ? 10 : 0),
  );
  const isReady = newScore >= 80;

  useEffect(() => {
    // Animate score counting using requestAnimationFrame callback
    const startTime = performance.now();
    const duration = 1500;
    let animationId: number;

    const animateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(
        Math.round(previousScore + (newScore - previousScore) * eased),
      );

      if (progress < 1) {
        animationId = requestAnimationFrame(animateScore);
      } else if (isReady) {
        setShowBadge(true);
      }
    };

    const timer = setTimeout(() => {
      animationId = requestAnimationFrame(animateScore);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [previousScore, newScore, isReady]);

  // Determine recommendation
  const recommendation = useMemo(() => {
    const highConfidenceMisses = results.filter(
      (r) => !r.isCorrect && r.confidence > 70,
    ).length;
    const lowConfidenceCorrects = results.filter(
      (r) => r.isCorrect && r.confidence < 40,
    ).length;

    if (highConfidenceMisses > 0) {
      return {
        text: `Re-drill ${highConfidenceMisses} high-confidence ${highConfidenceMisses === 1 ? 'miss' : 'misses'}`,
        action: 'redrill' as const,
      };
    }
    if (lowConfidenceCorrects > 0) {
      return {
        text: `Fortify ${lowConfidenceCorrects} uncertain ${lowConfidenceCorrects === 1 ? 'answer' : 'answers'}`,
        action: 'redrill' as const,
      };
    }
    if (isReady) {
      return {
        text: 'Lock in this readiness and explore new topics',
        action: 'library' as const,
      };
    }
    return {
      text: 'Explore Advanced Patterns',
      action: 'explore' as const,
    };
  }, [results, isReady]);

  // Static data for chart (no ref needed)
  const chartData = [45, 52, 55, 60, 68, 72, previousScore, newScore];

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
      {/* Content */}
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
        }}
      >
        {/* Topic */}
        <div
          style={{
            animation: 'slide-down 0.6s ease-out',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            Session Complete
          </span>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '8px',
            }}
          >
            {topic}
          </h2>
        </div>

        {/* Main Score Display */}
        <div
          style={{
            animation: 'slide-up 0.6s ease-out 0.2s backwards',
            marginBottom: '48px',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
              color:
                displayScore >= 80
                  ? 'var(--neon-green)'
                  : displayScore >= 50
                    ? 'var(--electric-teal)'
                    : 'var(--text-secondary)',
              textShadow:
                displayScore >= 80 ? '0 0 40px var(--neon-green-glow)' : 'none',
              transition: 'color 0.3s, text-shadow 0.3s',
            }}
          >
            {displayScore}
          </div>
          <span
            style={{
              fontSize: '18px',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            Readiness Score
          </span>

          {/* Achievement Badge */}
          {showBadge && (
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '50%',
                transform: 'translateX(120px)',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #2a2a2a, #3a3a3a)',
                border: '2px solid var(--neon-green)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--glow-green)',
                animation: 'stamp 0.5s ease-out forwards',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '20px' }}>🏆</span>
              <div style={{ textAlign: 'left' }}>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'var(--neon-green)',
                    fontWeight: 700,
                    display: 'block',
                  }}
                >
                  MASTERED
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  {topic}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px',
            animation: 'fade-in 0.6s ease-out 0.4s backwards',
          }}
        >
          <div
            style={{
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--neon-green)',
              }}
            >
              {correctCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              Correct
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color:
                  results.length - correctCount > 0
                    ? 'var(--electric-red)'
                    : 'var(--text-muted)',
              }}
            >
              {results.length - correctCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              To Review
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--electric-teal)',
              }}
            >
              +{newScore - previousScore}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              Score Lift
            </div>
          </div>
        </div>

        {/* Session Graph - uses CSS animations only, no ref access */}
        <div
          style={{
            padding: '24px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '40px',
            animation: 'fade-in 0.6s ease-out 0.5s backwards',
          }}
        >
          <div
            style={{
              height: '100px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '0 20px',
            }}
          >
            {chartData.map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background:
                    i === 7
                      ? 'linear-gradient(to top, var(--neon-green), var(--electric-teal))'
                      : 'var(--bg-elevated)',
                  borderRadius: '4px 4px 0 0',
                  animation: `slide-up 0.5s ease-out ${i * 0.1}s backwards`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: '12px',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            Your readiness trend (last 8 sessions)
          </div>
        </div>

        {/* AI Recommendation */}
        <button
          onClick={() => onContinue(recommendation.action)}
          style={{
            width: '100%',
            padding: '18px 32px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background:
              'linear-gradient(135deg, var(--electric-teal), #00b3b3)',
            color: 'var(--bg-obsidian)',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-ui)',
            animation:
              'pulse-teal 3s infinite, slide-up 0.6s ease-out 0.6s backwards',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span>✨</span>
          {recommendation.text}
        </button>

        {/* Secondary actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '20px',
            animation: 'fade-in 0.6s ease-out 0.7s backwards',
          }}
        >
          <button
            onClick={() => onContinue('library')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            📚 View Library
          </button>
          <button
            onClick={() => onContinue('redrill')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            🔄 Drill Again
          </button>
        </div>
      </div>
    </div>
  );
}
