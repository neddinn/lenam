'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-tooltip)] flex flex-col gap-2'>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto dismiss after 4 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDismiss, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return 'ℹ';
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-neon-green/30 bg-neon-green/10';
      case 'warning':
        return 'border-amber-400/30 bg-amber-400/10';
      case 'error':
        return 'border-electric-red/30 bg-electric-red/10';
      default:
        return 'border-cool-blue/30 bg-cool-blue/10';
    }
  };

  const getIconColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-neon-green';
      case 'warning':
        return 'text-amber-400';
      case 'error':
        return 'text-electric-red';
      default:
        return 'text-cool-blue';
    }
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-sm
        ${getStyles()}
        ${isExiting ? 'animate-slide-down opacity-0' : 'animate-slide-up'}
        transition-all duration-300
      `}
      role='alert'
    >
      <span className={`text-lg ${getIconColor()}`}>{getIcon()}</span>
      <span className='text-sm text-text-primary'>{toast.message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onDismiss, 300);
        }}
        className='text-text-tertiary hover:text-text-primary transition-colors'
        aria-label='Dismiss'
      >
        ×
      </button>
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, dismissToast };
}

export default ToastContainer;
