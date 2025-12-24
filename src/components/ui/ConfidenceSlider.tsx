'use client';

import { useState, useCallback } from 'react';

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function ConfidenceSlider({
  value,
  onChange,
  disabled = false,
}: ConfidenceSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getLabel = useCallback((val: number) => {
    if (val < 30) return 'Unsure';
    if (val < 50) return 'Guessing';
    if (val < 70) return 'Likely';
    if (val < 90) return 'Confident';
    return 'Certain';
  }, []);

  const getColor = useCallback((val: number) => {
    if (val < 30) return 'var(--neutral-500)';
    if (val < 50) return 'var(--neutral-400)';
    if (val < 70) return 'var(--cool-blue-dim)';
    if (val < 90) return '#fbbf24'; // Gold
    return '#f59e0b'; // Bright gold
  }, []);

  const gradient = `linear-gradient(90deg,
    var(--neutral-600) 0%,
    var(--neutral-500) 25%,
    var(--cool-blue-dim) 50%,
    #fbbf24 75%,
    #f59e0b 100%
  )`;

  return (
    <div
      className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm text-text-secondary'>Confidence</span>
        <span
          className='text-sm font-medium px-2 py-0.5 rounded-full transition-colors duration-200'
          style={{
            backgroundColor: `${getColor(value)}20`,
            color: getColor(value),
          }}
        >
          {getLabel(value)}
        </span>
      </div>

      <div className='relative'>
        <input
          type='range'
          min='0'
          max='100'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          disabled={disabled}
          className='w-full h-2 rounded-full appearance-none cursor-pointer'
          style={{
            background: gradient,
          }}
        />

        {/* Custom thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg pointer-events-none transition-transform duration-150 ${
            isDragging ? 'scale-125' : 'scale-100'
          }`}
          style={{
            left: `calc(${value}% - 12px)`,
            boxShadow: isDragging
              ? `0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 4px ${getColor(value)}40`
              : '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>

      <div className='flex justify-between text-xs text-text-muted mt-2'>
        <span>🤔 Unsure</span>
        <span>💎 Certain</span>
      </div>
    </div>
  );
}

export default ConfidenceSlider;
