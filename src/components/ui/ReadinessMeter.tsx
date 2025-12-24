'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';

interface ReadinessMeterProps {
  score: number; // 0-100
  provisional?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export function ReadinessMeter({
  score,
  provisional = false,
  size = 'md',
  showLabel = true,
  animated = true,
}: ReadinessMeterProps) {
  const displayScoreRef = useRef(animated ? 0 : score);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const previousScoreRef = useRef(animated ? 0 : score);

  // Size configurations
  const sizeConfig = useMemo(
    () => ({
      sm: { width: 48, strokeWidth: 4, fontSize: '0.75rem' },
      md: { width: 64, strokeWidth: 5, fontSize: '1rem' },
      lg: { width: 80, strokeWidth: 6, fontSize: '1.25rem' },
    }),
    [],
  );

  const { width, strokeWidth, fontSize } = sizeConfig[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Update display using refs and direct DOM manipulation for animation (no setState)
  const updateDisplay = useCallback(
    (currentScore: number) => {
      displayScoreRef.current = currentScore;

      // Update the score text element
      const scoreEl = containerRef.current?.querySelector('[data-score-text]');
      if (scoreEl) {
        scoreEl.textContent = String(currentScore);
      }

      // Update the progress circle
      const progressCircle = containerRef.current?.querySelector(
        '[data-progress-circle]',
      ) as SVGCircleElement | null;
      if (progressCircle) {
        const progress = (currentScore / 100) * circumference;
        const offset = circumference - progress;
        progressCircle.style.strokeDashoffset = String(offset);

        // Update color based on score
        let color = 'var(--neutral-500)';
        if (currentScore >= 80) color = 'var(--neon-green)';
        else if (currentScore >= 50) color = 'var(--cool-blue)';
        progressCircle.style.stroke = color;

        // Update glow
        if (currentScore >= 80) {
          progressCircle.style.filter =
            'drop-shadow(0 0 6px var(--neon-green))';
        } else {
          progressCircle.style.filter = 'none';
        }
      }
    },
    [circumference],
  );

  // Animate score counting up using requestAnimationFrame
  useEffect(() => {
    if (!animated) {
      updateDisplay(score);
      previousScoreRef.current = score;
      return;
    }

    const duration = 1000; // 1 second
    const startTime = Date.now();
    const startScore = previousScoreRef.current;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(
        startScore + (score - startScore) * eased,
      );

      updateDisplay(currentScore);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousScoreRef.current = score;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score, animated, updateDisplay]);

  // Initial score color calculation
  const initialScore = animated ? 0 : score;
  const initialProgress = (initialScore / 100) * circumference;
  const initialOffset = circumference - initialProgress;

  const getInitialStrokeColor = () => {
    if (initialScore >= 80) return 'var(--neon-green)';
    if (initialScore >= 50) return 'var(--cool-blue)';
    return 'var(--neutral-500)';
  };

  return (
    <div className='flex flex-col items-center gap-1' ref={containerRef}>
      <div className='relative' style={{ width, height: width }}>
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className='transform -rotate-90'
        >
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill='none'
            stroke='var(--bg-surface)'
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            data-progress-circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill='none'
            stroke={getInitialStrokeColor()}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={initialOffset}
            className='transition-colors duration-500'
          />
        </svg>

        {/* Score number */}
        <div
          className='absolute inset-0 flex items-center justify-center font-mono font-bold'
          style={{ fontSize }}
        >
          <span data-score-text style={{ color: getInitialStrokeColor() }}>
            {initialScore}
          </span>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className='text-center'>
          <span className='text-xs text-text-tertiary'>
            {provisional ? 'Provisional' : 'Readiness'}
          </span>
        </div>
      )}

      {/* Provisional indicator */}
      {provisional && (
        <span className='badge badge-neutral text-xs'>Not enough data</span>
      )}
    </div>
  );
}

export default ReadinessMeter;
