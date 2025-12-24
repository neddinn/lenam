'use client';

import { ReactNode } from 'react';

interface OptionCardProps {
  children: ReactNode;
  selected?: boolean;
  state?: 'default' | 'correct' | 'incorrect' | 'revealed';
  disabled?: boolean;
  onClick?: () => void;
  optionLabel?: string;
}

export default function OptionCard({
  children,
  selected = false,
  state = 'default',
  disabled = false,
  onClick,
  optionLabel,
}: OptionCardProps) {
  const stateClasses = {
    default: selected ? 'option-card-selected' : '',
    correct: 'option-card-correct',
    incorrect: 'option-card-incorrect',
    revealed: 'option-card-correct',
  };

  return (
    <button
      type="button"
      className={`option-card w-full text-left flex items-start gap-3 ${stateClasses[state]}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {optionLabel && (
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{
            background:
              state === 'correct'
                ? 'var(--status-success)'
                : state === 'incorrect'
                  ? 'var(--status-error)'
                  : selected
                    ? 'var(--accent-primary)'
                    : 'var(--bg-sunken)',
            color:
              state === 'correct' || state === 'incorrect' || selected
                ? 'white'
                : 'var(--text-secondary)',
          }}
        >
          {optionLabel}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {state === 'correct' && (
        <span className="flex-shrink-0 text-[var(--status-success)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.667 5L7.5 14.167L3.333 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      {state === 'incorrect' && (
        <span className="flex-shrink-0 text-[var(--status-error)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
