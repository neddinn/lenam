'use client';

import { useState } from 'react';

export type OrbState = 'grey' | 'progress' | 'ready' | 'decay';

interface SkillOrbProps {
  name: string;
  state: OrbState;
  score?: number;
  lastPracticed?: string;
  onClick?: () => void;
  onRepair?: () => void;
}

export function SkillOrb({
  name,
  state,
  score,
  lastPracticed,
  onClick,
  onRepair,
}: SkillOrbProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getOrbClasses = () => {
    const base =
      'relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300';

    switch (state) {
      case 'grey':
        return `${base} bg-bg-surface border-2 border-neutral-700 text-text-tertiary`;
      case 'progress':
        return `${base} bg-cool-blue/10 border-2 border-cool-blue text-cool-blue animate-orb-pulse`;
      case 'ready':
        return `${base} bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-transparent text-bg-obsidian`;
      case 'decay':
        return `${base} bg-bg-surface border-2 border-electric-red text-electric-red`;
      default:
        return base;
    }
  };

  const getGlowStyle = () => {
    switch (state) {
      case 'ready':
        return { boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' };
      case 'progress':
        return { boxShadow: '0 0 20px var(--cool-blue-glow)' };
      case 'decay':
        return { boxShadow: '0 0 15px var(--electric-red-glow)' };
      default:
        return {};
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'grey':
        return '○';
      case 'progress':
        return '◐';
      case 'ready':
        return '★';
      case 'decay':
        return '⚠';
      default:
        return '○';
    }
  };

  return (
    <div
      className='relative group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={state === 'decay' && onRepair ? onRepair : onClick}
        className={getOrbClasses()}
        style={{
          ...getGlowStyle(),
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={`${name} - ${state}`}
      >
        {/* Crack lines for decay state */}
        {state === 'decay' && (
          <svg
            className='absolute inset-0 w-full h-full pointer-events-none opacity-50'
            viewBox='0 0 80 80'
          >
            <path
              d='M20,15 L25,40 L18,65'
              stroke='var(--electric-red)'
              strokeWidth='2'
              fill='none'
            />
            <path
              d='M55,10 L50,45 L60,70'
              stroke='var(--electric-red)'
              strokeWidth='2'
              fill='none'
            />
          </svg>
        )}

        <div className='flex flex-col items-center'>
          <span className='text-lg'>{getIcon()}</span>
          {score !== undefined && state !== 'grey' && (
            <span className='text-xs font-mono font-bold'>{score}</span>
          )}
        </div>
      </button>

      {/* Name label */}
      <p className='mt-2 text-center text-xs text-text-secondary truncate max-w-[80px]'>
        {name}
      </p>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-bg-elevated rounded-lg shadow-lg border border-white/10 whitespace-nowrap animate-fade-in z-10'>
          <p className='text-sm font-medium text-text-primary'>{name}</p>
          {score !== undefined && (
            <p className='text-xs text-text-secondary'>Score: {score}%</p>
          )}
          {lastPracticed && (
            <p className='text-xs text-text-tertiary'>Last: {lastPracticed}</p>
          )}
          {state === 'decay' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRepair?.();
              }}
              className='mt-2 w-full btn btn-danger text-xs py-1'
            >
              🔧 Repair
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillOrb;
