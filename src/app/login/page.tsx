'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    login(email);
    router.push('/app');
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    login('demo@lenam.dev');
    router.push('/app');
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between px-6 py-6'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-2xl'>⚡</span>
          <span className='text-xl font-bold text-text-primary'>Lenam</span>
        </Link>
      </header>

      {/* Main content */}
      <main className='flex-1 flex items-center justify-center px-6 py-12'>
        <div className='w-full max-w-md'>
          <div className='card p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-2xl font-bold text-text-primary mb-2'>
                Welcome back
              </h1>
              <p className='text-text-secondary'>
                Sign in to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-text-secondary mb-2'
                >
                  Email address
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@example.com'
                  className='input'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-text-secondary mb-2'
                >
                  Password
                </label>
                <input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='input'
                  defaultValue='demo123'
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`btn btn-primary w-full btn-lg ${isLoading ? 'opacity-50' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className='relative my-8'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/10' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-bg-elevated text-text-muted'>Or</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className='btn btn-secondary w-full'
            >
              <span className='mr-2'>⚡</span>
              Try Demo Account
            </button>

            <p className='text-center text-sm text-text-muted mt-6'>
              Don&apos;t have an account?{' '}
              <button
                onClick={handleDemoLogin}
                className='text-cool-blue hover:underline'
              >
                Start free
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='px-6 py-6 text-center'>
        <p className='text-xs text-text-muted'>
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </footer>
    </div>
  );
}
