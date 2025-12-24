'use client';

import { useEffect, useState } from 'react';

interface ReadinessRingProps {
  score: number;
  size?: number;
  animate?: boolean;
}

export function ReadinessRing({
  score,
  size = 80,
  animate = true,
}: ReadinessRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const startTime = performance.now();
      const duration = 1000;
      const startScore = 0;
      let animationId: number;

      const animateScore = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(startScore + (score - startScore) * eased));

        if (progress < 1) {
          animationId = requestAnimationFrame(animateScore);
        }
      };

      animationId = requestAnimationFrame(animateScore);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [score, animate]);

  const getColor = () => {
    if (displayScore >= 80) return 'var(--neon-green)';
    if (displayScore >= 50) return 'var(--electric-teal)';
    return 'var(--text-muted)';
  };

  const getGlow = () => {
    if (displayScore >= 80) return 'var(--glow-green)';
    if (displayScore >= 50) return 'var(--glow-teal)';
    return 'none';
  };

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: 'rotate(-90deg)',
          filter: displayScore >= 50 ? `drop-shadow(${getGlow()})` : 'none',
        }}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='var(--bg-elevated)'
          strokeWidth='4'
        />
        {/* Progress ring - use CSS transition for smooth animation */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={getColor()}
          strokeWidth='4'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: animate
              ? 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          fontSize: size / 3.5,
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: getColor(),
        }}
      >
        {displayScore}
      </div>
    </div>
  );
}
