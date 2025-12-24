'use client';

import { ReactNode } from 'react';

interface ToggleOption<T> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
}

interface ToggleGroupProps<T> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'small' | 'medium';
}

export default function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  size = 'medium',
}: ToggleGroupProps<T>) {
  const sizeClasses = {
    small: 'py-2 px-3 text-xs',
    medium: 'py-3 px-5 text-sm',
  };

  return (
    <div className="toggle-group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`toggle-item ${sizeClasses[size]} ${
            value === option.value ? 'toggle-item-selected' : ''
          }`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.icon && <span className="mr-1.5">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
}
