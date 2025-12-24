'use client';

import { useEffect, useState } from 'react';

interface ReadinessMeterProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  animate?: boolean;
  provisional?: boolean;
}

export default function ReadinessMeter({
  score,
  size = 'medium',
  showLabel = true,
  animate = true,
  provisional = false,
}: ReadinessMeterProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    // Animate the score counting up
    const duration = 800;
    const startTime = performance.now();
    const startScore = displayScore;

    const animateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(startScore + (score - startScore) * eased);

      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [score, animate]);

  const sizes = {
    small: { width: 40, height: 40, strokeWidth: 3, fontSize: 'text-xs' },
    medium: { width: 56, height: 56, strokeWidth: 4, fontSize: 'text-sm' },
    large: { width: 120, height: 120, strokeWidth: 8, fontSize: 'text-2xl' },
  };

  const { width, height, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = () => {
    if (score >= 80) return 'var(--status-success)';
    if (score >= 40) return 'var(--status-warning)';
    return 'var(--text-muted)';
  };

  return (
    <div
      className="readiness-meter"
      style={{ width, height }}
      title={provisional ? 'Provisional (< 8 attempts)' : `Readiness: ${score}%`}
    >
      <svg width={width} height={height}>
        {/* Background circle */}
        <circle
          className="readiness-meter-circle"
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className="readiness-meter-progress"
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={getColor()}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            opacity: provisional ? 0.6 : 1,
          }}
        />
      </svg>
      {showLabel && (
        <div
          className={`readiness-meter-text ${fontSize}`}
          style={{ color: getColor() }}
        >
          {displayScore}
        </div>
      )}
    </div>
  );
}
