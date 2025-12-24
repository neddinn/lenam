'use client';

export function GridBackground() {
  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden select-none'>
      {/* Subtle Dot Grid */}
      <div
        className='absolute inset-0 opacity-[0.4]'
        style={{
          backgroundImage: 'radial-gradient(#a3a3a3 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* Gradient Mesh for warmth */}
      <div className='absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl mix-blend-multiply filter' />
      <div className='absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply filter' />
    </div>
  );
}
