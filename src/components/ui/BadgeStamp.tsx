'use client';

import { useRef, useEffect } from 'react';

interface BadgeStampProps {
  title: string;
  icon?: string;
  show: boolean;
}

export function BadgeStamp({ title, icon = '🏆', show }: BadgeStampProps) {
  const hasShownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track if we've shown the animation (to only play once per mount)
  useEffect(() => {
    if (show && !hasShownRef.current) {
      hasShownRef.current = true;
      // Add animation class if container exists
      if (containerRef.current) {
        containerRef.current.classList.add('animate-stamp');
      }
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className='fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none'>
      <div
        ref={containerRef}
        className='relative flex flex-col items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl'
        style={{
          boxShadow:
            '0 0 60px rgba(251, 191, 36, 0.5), inset 0 -4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Metallic shine effect */}
        <div
          className='absolute inset-0 rounded-full opacity-30'
          style={{
            background:
              'linear-gradient(135deg, white 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Icon */}
        <span className='text-5xl mb-2 drop-shadow-lg'>{icon}</span>

        {/* Title */}
        <span className='text-lg font-bold text-bg-obsidian text-center px-4 drop-shadow'>
          {title}
        </span>
      </div>
    </div>
  );
}

export default BadgeStamp;
