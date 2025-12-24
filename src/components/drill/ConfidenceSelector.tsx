'use client'; // This component needs interactivity

export function ConfidenceSelector({
  onSelect,
}: {
  onSelect: (value: 'low' | 'high') => void;
}) {
  return (
    <div className='flex gap-2'>
      <button
        onClick={() => onSelect('low')}
        className='flex-1 px-4 py-3 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800 text-sm font-medium hover:bg-yellow-100 transition-colors focus:ring-2 focus:ring-yellow-500/20 outline-none'
      >
        Not Sure
      </button>
      <button
        onClick={() => onSelect('high')}
        className='flex-1 px-4 py-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium hover:bg-emerald-100 transition-colors focus:ring-2 focus:ring-emerald-500/20 outline-none'
      >
        Confident
      </button>
    </div>
  );
}
