'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  onComplete?: () => void;
}

export function AnimatedCounter({
  value,
  duration = 1500,
  suffix = '',
  prefix = '',
  className = '',
  onComplete,
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  const updateDisplay = useCallback(
    (displayValue: number, animating: boolean) => {
      if (spanRef.current) {
        spanRef.current.textContent = `${prefix}${displayValue}${suffix}`;
        if (animating) {
          spanRef.current.classList.add('animate-pulse');
        } else {
          spanRef.current.classList.remove('animate-pulse');
        }
      }
    },
    [prefix, suffix],
  );

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    const completeFn = onComplete; // Capture in closure

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo for satisfying "gas station pump" feel
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startValue + (value - startValue) * eased);

      updateDisplay(current, progress < 1);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        completeFn?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, updateDisplay, onComplete]);

  return (
    <span
      ref={spanRef}
      className={`font-mono font-bold tabular-nums ${className}`}
    >
      {prefix}0{suffix}
    </span>
  );
}

export default AnimatedCounter;
