'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-100 py-3'
            : 'bg-transparent py-5',
        )}
      >
        <div className='max-w-6xl mx-auto px-6 flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-2.5'>
            <div
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-neutral-900 shadow-lg shadow-neutral-900/10'
                  : 'bg-neutral-900 shadow-xl shadow-neutral-900/20',
              )}
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                className='text-white'
              >
                <path
                  d='M13 2L3 14H12L11 22L21 10H12L13 2Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <span className='font-semibold text-neutral-900 tracking-tight text-lg'>
              FlashLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-1'>
            {['Method', 'Pricing', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className='px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100/50 transition-colors'
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className='hidden md:flex items-center gap-3'>
            <Link
              href='/login'
              className='px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors'
            >
              Sign in
            </Link>
            <Link href='/signup'>
              <Button
                variant='primary'
                size='sm'
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'shadow-md' : 'shadow-lg shadow-neutral-900/20',
                )}
              >
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 -mr-2 hover:bg-neutral-100 rounded-lg transition-colors'
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='fixed inset-x-0 top-[72px] z-40 bg-white border-b border-neutral-100 shadow-lg md:hidden'
        >
          <nav className='flex flex-col p-4 gap-1'>
            {['Method', 'Pricing', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className='px-4 py-3 text-base font-medium text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className='h-px bg-neutral-100 my-2' />
            <Link
              href='/login'
              className='px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link href='/signup' onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant='primary' className='w-full mt-2'>
                Get Started Free
              </Button>
            </Link>
          </nav>
        </motion.div>
      )}
    </>
  );
}
