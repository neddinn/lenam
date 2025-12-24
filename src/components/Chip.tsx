'use client';

import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
}

export default function Chip({
  children,
  selected = false,
  onClick,
  removable = false,
  onRemove,
}: ChipProps) {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'chip-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {children}
      {removable && selected && (
        <span
          className="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          role="button"
          aria-label="Remove"
        >
          ×
        </span>
      )}
    </button>
  );
}
