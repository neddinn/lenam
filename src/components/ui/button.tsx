'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<
  HTMLMotionProps<'button'>,
  'ref' | 'children'
> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary:
        'bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 active:bg-neutral-950',
      secondary:
        'bg-white text-neutral-900 border border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 active:bg-neutral-100',
      ghost:
        'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className='mr-2'>
            <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
          </div>
        ) : null}
        {children}
      </motion.button>
    );
  },
);
Button.displayName = 'Button';
