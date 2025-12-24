'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Brain,
  Target,
  Clock,
  CheckCircle,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { cn } from '@/lib/utils';

// Feature data
const FEATURES = [
  {
    icon: Target,
    title: 'Gap-Focused Learning',
    description:
      'Every question you miss becomes a targeted lesson. No wasted time on what you already know.',
  },
  {
    icon: Brain,
    title: 'Adaptive Difficulty',
    description:
      'The system learns your weak spots and adjusts in real-time to maximize retention.',
  },
  {
    icon: Clock,
    title: '5-Minute Sessions',
    description:
      'Designed for busy professionals. Meaningful progress in the time it takes to drink coffee.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'I went from nervous to confident in two weeks. The gap-focused approach actually works.',
    author: 'Sarah Chen',
    role: 'Senior Engineer at Stripe',
    avatar: 'SC',
  },
  {
    quote:
      'Finally, something that respects my time. I can actually measure my interview readiness now.',
    author: 'Marcus Johnson',
    role: 'Staff Engineer at Figma',
    avatar: 'MJ',
  },
  {
    quote:
      "The 'Teach Me' feature is brilliant. It's like having a tutor who knows exactly where I'm stuck.",
    author: 'Priya Sharma',
    role: 'Tech Lead at Notion',
    avatar: 'PS',
  },
];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const hasStartedTyping = query.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasStartedTyping) {
        router.push('/drill');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStartedTyping, router]);

  return (
    <main className='min-h-screen bg-[#FAFAF9] selection:bg-amber-100'>
      <SiteHeader />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className='min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32 relative'
      >
        {/* Subtle background pattern */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div
            className='absolute inset-0 opacity-[0.015]'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className='max-w-4xl mx-auto text-center relative z-10'>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium mb-8'
          >
            <Zap size={14} className='fill-amber-500 text-amber-500' />
            Interview prep, reimagined
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-6'
          >
            Master anything.
            <br />
            <span className='text-neutral-400'>In minutes, not months.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed'
          >
            FlashLearn finds your knowledge gaps and fills them with precision.
            <br className='hidden md:block' />
            Stop studying. Start drilling.
          </motion.p>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-16'
          >
            <Link href='/drill'>
              <Button
                variant='primary'
                size='lg'
                className='h-14 px-8 text-lg font-medium shadow-xl shadow-neutral-900/10 hover:shadow-neutral-900/20 hover:scale-[1.02] transition-all'
              >
                Start Free Drill
                <ArrowRight size={18} className='ml-2' />
              </Button>
            </Link>
            <button className='flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors font-medium'>
              <div className='w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center'>
                <Play
                  size={16}
                  className='fill-neutral-900 text-neutral-900 ml-0.5'
                />
              </div>
              Watch demo
            </button>
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='flex flex-col items-center gap-4'
          >
            <div className='flex items-center -space-x-2'>
              {[
                'bg-blue-500',
                'bg-green-500',
                'bg-purple-500',
                'bg-orange-500',
                'bg-pink-500',
              ].map((color, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 border-white',
                    color,
                  )}
                />
              ))}
              <div className='w-8 h-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600'>
                +2k
              </div>
            </div>
            <p className='text-sm text-neutral-500'>
              Trusted by engineers at{' '}
              <span className='font-medium text-neutral-700'>Google</span>,{' '}
              <span className='font-medium text-neutral-700'>Meta</span>,{' '}
              <span className='font-medium text-neutral-700'>Stripe</span>, and
              more
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
        >
          <div className='flex flex-col items-center gap-2 text-neutral-400'>
            <span className='text-xs font-medium uppercase tracking-wider'>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className='w-5 h-8 rounded-full border-2 border-neutral-300 flex items-start justify-center p-1'
            >
              <div className='w-1 h-2 rounded-full bg-neutral-400' />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <section className='py-32 px-6 bg-white border-y border-neutral-100'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-semibold text-neutral-900 mb-4'>
              The FlashLearn Method
            </h2>
            <p className='text-xl text-neutral-500 max-w-2xl mx-auto'>
              A closed-loop system that guarantees improvement
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-8'>
            {[
              {
                step: '01',
                title: 'Drill',
                desc: 'Answer rapid-fire questions in your topic',
              },
              {
                step: '02',
                title: 'Discover',
                desc: 'AI identifies your specific knowledge gaps',
              },
              {
                step: '03',
                title: 'Learn',
                desc: 'Get targeted explanations for what you missed',
              },
              {
                step: '04',
                title: 'Verify',
                desc: 'Re-drill to cement your understanding',
              },
            ].map((item, i) => (
              <div key={i} className='relative'>
                <div className='text-6xl font-bold text-neutral-100 mb-4'>
                  {item.step}
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 mb-2'>
                  {item.title}
                </h3>
                <p className='text-neutral-500'>{item.desc}</p>
                {i < 3 && (
                  <ChevronRight
                    className='hidden md:block absolute top-8 -right-4 text-neutral-200'
                    size={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-32 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-3 gap-12'>
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='group'
              >
                <div className='w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors'>
                  <feature.icon size={24} />
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-neutral-500 leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className='py-24 px-6 bg-neutral-900 text-white relative overflow-hidden'>
        <div className='absolute inset-0 opacity-30'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className='max-w-6xl mx-auto relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-semibold mb-4'>
              See it in action
            </h2>
            <p className='text-xl text-neutral-400 max-w-2xl mx-auto'>
              Experience the drill-learn-verify loop that makes FlashLearn
              different
            </p>
          </div>

          {/* Mock Product Screenshot */}
          <div className='relative mx-auto max-w-4xl'>
            <div className='bg-neutral-800 rounded-2xl p-4 shadow-2xl'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-3 h-3 rounded-full bg-red-500' />
                <div className='w-3 h-3 rounded-full bg-yellow-500' />
                <div className='w-3 h-3 rounded-full bg-green-500' />
                <span className='flex-1 text-center text-sm text-neutral-500'>
                  FlashLearn — Drill Mode
                </span>
              </div>
              <div className='bg-[#FAFAF9] rounded-lg p-8 min-h-[400px] flex items-center justify-center'>
                <div className='bg-white rounded-xl shadow-lg p-8 max-w-xl w-full'>
                  <div className='text-xl font-medium text-neutral-900 mb-6'>
                    In React, which Hook synchronizes with external systems?
                  </div>
                  <div className='space-y-3'>
                    {['useState', 'useEffect', 'useContext', 'useReducer'].map(
                      (opt, i) => (
                        <div
                          key={i}
                          className={cn(
                            'p-4 rounded-lg border text-left transition-all',
                            i === 1
                              ? 'border-neutral-900 bg-neutral-50'
                              : 'border-neutral-200',
                          )}
                        >
                          <span className='font-medium'>
                            {String.fromCharCode(65 + i)}.
                          </span>{' '}
                          {opt}
                        </div>
                      ),
                    )}
                  </div>
                  <div className='mt-6 pt-4 border-t border-neutral-100'>
                    <div className='text-sm text-neutral-500 text-center'>
                      How confident are you?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-32 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-semibold text-neutral-900 mb-4'>
              Engineers love it
            </h2>
            <p className='text-xl text-neutral-500'>
              Join thousands who&apos;ve transformed their interview prep
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg hover:border-neutral-200 transition-all'
              >
                <p className='text-lg text-neutral-700 mb-6 leading-relaxed'>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-sm font-semibold text-neutral-600'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className='font-semibold text-neutral-900'>
                      {testimonial.author}
                    </div>
                    <div className='text-sm text-neutral-500'>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className='py-32 px-6 bg-neutral-50 border-y border-neutral-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-semibold text-neutral-900 mb-4'>
            Simple, transparent pricing
          </h2>
          <p className='text-xl text-neutral-500 mb-12'>
            Start free. Upgrade when you&apos;re ready to commit.
          </p>

          <div className='grid md:grid-cols-2 gap-8 max-w-3xl mx-auto'>
            {/* Free Tier */}
            <div className='bg-white rounded-2xl p-8 border border-neutral-200 text-left'>
              <div className='text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                Free
              </div>
              <div className='text-4xl font-bold text-neutral-900 mb-4'>
                $0
                <span className='text-lg font-normal text-neutral-400'>
                  /mo
                </span>
              </div>
              <ul className='space-y-3 mb-8'>
                {[
                  '1 drill session per day',
                  '3 "Teach Me" lessons per week',
                  'Basic progress tracking',
                ].map((item, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-3 text-neutral-600'
                  >
                    <CheckCircle size={18} className='text-green-500' />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant='secondary' className='w-full'>
                Get Started
              </Button>
            </div>

            {/* Pro Tier */}
            <div className='bg-neutral-900 text-white rounded-2xl p-8 text-left relative overflow-hidden'>
              <div className='absolute top-0 right-0 bg-amber-500 text-neutral-900 text-xs font-bold px-3 py-1 rounded-bl-lg'>
                POPULAR
              </div>
              <div className='text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
                Pro
              </div>
              <div className='text-4xl font-bold mb-4'>
                $19
                <span className='text-lg font-normal text-neutral-500'>
                  /mo
                </span>
              </div>
              <ul className='space-y-3 mb-8'>
                {[
                  'Unlimited drills',
                  'Unlimited "Teach Me" lessons',
                  'Advanced analytics',
                  'Priority support',
                ].map((item, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-3 text-neutral-300'
                  >
                    <CheckCircle size={18} className='text-amber-500' />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant='primary'
                className='w-full bg-white text-neutral-900 hover:bg-neutral-100'
              >
                Start 7-Day Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='py-32 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl md:text-6xl font-semibold text-neutral-900 mb-6'>
            Ready to close your gaps?
          </h2>
          <p className='text-xl text-neutral-500 mb-12 max-w-2xl mx-auto'>
            Join thousands of engineers who&apos;ve transformed their interview
            prep with FlashLearn.
          </p>
          <Link href='/drill'>
            <Button
              variant='primary'
              size='lg'
              className='h-16 px-12 text-xl font-medium shadow-2xl shadow-neutral-900/20 hover:shadow-neutral-900/30 hover:scale-[1.02] transition-all'
            >
              Start Your First Drill
              <ArrowRight size={20} className='ml-3' />
            </Button>
          </Link>
          <p className='text-sm text-neutral-400 mt-6'>
            No credit card required. Free forever tier available.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-16 px-6 border-t border-neutral-100'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-5 gap-12 mb-12'>
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center'>
                  <svg
                    width='16'
                    height='16'
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
                <span className='font-semibold text-neutral-900 text-lg'>
                  FlashLearn
                </span>
              </div>
              <p className='text-neutral-500 text-sm max-w-xs'>
                The fastest path from knowledge gap to interview ready. Built
                for engineers who value their time.
              </p>
            </div>

            <div>
              <h4 className='font-semibold text-neutral-900 mb-4'>Product</h4>
              <ul className='space-y-2 text-sm text-neutral-500'>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Method
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-neutral-900 mb-4'>Company</h4>
              <ul className='space-y-2 text-sm text-neutral-500'>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-neutral-900 mb-4'>Legal</h4>
              <ul className='space-y-2 text-sm text-neutral-500'>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-neutral-900 transition-colors'
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-100 text-sm text-neutral-400'>
            <p>© 2024 FlashLearn. All rights reserved.</p>
            <div className='flex items-center gap-6 mt-4 md:mt-0'>
              <Link
                href='#'
                className='hover:text-neutral-900 transition-colors'
              >
                Twitter
              </Link>
              <Link
                href='#'
                className='hover:text-neutral-900 transition-colors'
              >
                LinkedIn
              </Link>
              <Link
                href='#'
                className='hover:text-neutral-900 transition-colors'
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
