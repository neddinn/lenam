'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pulse?: boolean;
  glow?: 'green' | 'red' | 'teal';
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    background: linear-gradient(135deg, var(--electric-teal), #00b3b3);
    color: var(--bg-obsidian);
    border: none;
  `,
  secondary: `
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-medium);
  `,
  ghost: `
    background: transparent;
    color: var(--text-secondary);
    border: none;
  `,
  success: `
    background: linear-gradient(135deg, var(--neon-green), #00cc00);
    color: var(--bg-obsidian);
    border: none;
  `,
  danger: `
    background: linear-gradient(135deg, var(--electric-red), #cc0000);
    color: white;
    border: none;
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'padding: 8px 16px; font-size: 13px;',
  md: 'padding: 12px 24px; font-size: 15px;',
  lg: 'padding: 16px 32px; font-size: 17px;',
};

export function Button({
  variant = 'primary',
  size = 'md',
  pulse = false,
  glow,
  children,
  style,
  ...props
}: ButtonProps) {
  const glowStyle = glow
    ? {
        green: 'animation: pulse-green 2s infinite;',
        red: 'animation: pulse-red 2s infinite;',
        teal: 'animation: pulse-teal 2s infinite;',
      }[glow]
    : '';

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all var(--transition-base)',
        fontFamily: 'var(--font-ui)',
        ...Object.fromEntries(
          (variantStyles[variant] + sizeStyles[size] + glowStyle)
            .split(';')
            .filter((s) => s.trim())
            .map((s) => {
              const [key, value] = s.split(':').map((x) => x.trim());
              const camelKey = key.replace(/-([a-z])/g, (g) =>
                g[1].toUpperCase(),
              );
              return [camelKey, value];
            }),
        ),
        ...style,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.filter = 'brightness(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
