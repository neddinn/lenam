'use client';

interface StreakCounterProps {
  count: number;
  isAnimating?: boolean;
}

export function StreakCounter({
  count,
  isAnimating = false,
}: StreakCounterProps) {
  if (count === 0) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        bg-neon-green/10 border border-neon-green/30
        ${isAnimating ? 'animate-scale-in' : ''}
      `}
      style={{
        boxShadow: isAnimating ? 'var(--shadow-glow-green)' : 'none',
      }}
    >
      <span className='text-lg'>🔥</span>
      <span className='font-mono font-bold text-neon-green'>+{count}</span>
      <span className='text-sm text-neon-green/80'>streak</span>
    </div>
  );
}

export default StreakCounter;
