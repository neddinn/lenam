'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: 'default' | 'success' | 'warning';
  showLabel?: boolean;
  size?: 'small' | 'medium';
}

export default function ProgressBar({
  value,
  max,
  variant = 'default',
  showLabel = false,
  size = 'medium',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const variantClass = {
    default: '',
    success: 'progress-bar-success',
    warning: 'progress-bar-warning',
  };

  const heightClass = {
    small: 'h-1',
    medium: 'h-1.5',
  };

  return (
    <div className="w-full">
      <div
        className={`progress-bar ${variantClass[variant]}`}
        style={{ height: size === 'small' ? '3px' : '5px' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="caption">{value} / {max}</span>
          <span className="caption">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}
