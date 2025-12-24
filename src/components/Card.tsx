'use client';

import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  padding = 'medium',
  children,
  className = '',
  ...props
}: CardProps) {
  const variantClasses = {
    default: 'card',
    elevated: 'card card-elevated',
    interactive: 'card card-interactive cursor-pointer',
  };

  const paddingClasses = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  // Remove the default padding from card class when using custom padding
  const classes = [
    variantClasses[variant],
    padding !== 'medium' ? paddingClasses[padding] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
