'use client';

import { useState } from 'react';

interface AuthScreenProps {
  mode: 'login' | 'signup';
  onSubmit: (email: string, password: string, name?: string) => void;
  onSwitchMode: () => void;
  onBack: () => void;
}

export function AuthScreen({
  mode,
  onSubmit,
  onSwitchMode,
  onBack,
}: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, mode === 'signup' ? name : undefined);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          borderRadius: '20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--bg-obsidian)',
              marginBottom: '16px',
            }}
          >
            L
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {mode === 'login'
              ? 'Enter your credentials to continue'
              : 'Start mastering your skills today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Name
              </label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}
            >
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type='submit'
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--electric-teal)',
              color: 'var(--bg-obsidian)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '24px 0',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--border-subtle)',
            }}
          />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--border-subtle)',
            }}
          />
        </div>

        {/* OAuth Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type='button'
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            Continue with GitHub
          </button>
          <button
            type='button'
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            Continue with Google
          </button>
        </div>

        {/* Switch Mode */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}
        >
          {mode === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            onClick={onSwitchMode}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--electric-teal)',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
