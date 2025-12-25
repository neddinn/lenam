'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context';

// Feature data
const FEATURES = [
  {
    icon: '🎯',
    title: 'Adaptive Drilling',
    description:
      'Questions adapt to your knowledge gaps in real-time. No wasted time on what you already know.',
  },
  {
    icon: '📚',
    title: 'Instant Teaching',
    description:
      'Wrong answer? The "Teach Me" mode generates personalized explanations tailored to your background.',
  },
  {
    icon: '📊',
    title: 'Readiness Score',
    description:
      "Know exactly when you're interview-ready with confidence scores, not vague percentages.",
  },
  {
    icon: '🔄',
    title: 'Closed Loop Learning',
    description:
      'Drill → Teach → Verify → Re-drill. The loop that turns gaps into strengths.',
  },
];

// Topics preview
const FEATURED_TOPICS = [
  'React Hooks',
  'System Design',
  'TypeScript',
  'Algorithms',
  'REST APIs',
  'SQL',
  'Node.js',
  'AWS Basics',
];

// Testimonials (placeholder)
const TESTIMONIALS = [
  {
    quote:
      'Went from anxious to confident in 2 weeks. Landed my dream role at a FAANG.',
    author: 'Sarah K.',
    role: 'Senior Frontend Engineer',
  },
  {
    quote:
      'The Teach Me feature is magic. It explains things in ways that actually stick.',
    author: 'James M.',
    role: 'Full Stack Developer',
  },
  {
    quote:
      'Finally, interview prep that respects my time. 15 minutes a day got me ready.',
    author: 'Priya S.',
    role: 'Backend Engineer',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app');
    }
  }, [isAuthenticated, router]);

  // Track mouse for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDemoLogin = () => {
    login('demo@lenam.dev');
    router.push('/app');
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated mesh gradient background */}
      <div
        className='fixed inset-0 transition-all duration-1000 ease-out pointer-events-none'
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
              rgba(0, 255, 136, 0.06) 0%,
              transparent 50%
            ),
            radial-gradient(
              600px circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%,
              rgba(0, 184, 255, 0.04) 0%,
              transparent 50%
            ),
            var(--bg-obsidian)
          `,
        }}
      />

      {/* Header */}
      <header className='relative z-10 flex items-center justify-between px-6 lg:px-12 py-6'>
        <div className='flex items-center gap-3'>
          <span className='text-2xl'>⚡</span>
          <span className='text-xl font-bold text-text-primary'>Lenam</span>
        </div>
        <nav className='flex items-center gap-4'>
          <Link
            href='/pricing'
            className='btn btn-ghost text-sm hidden sm:inline-flex'
          >
            Pricing
          </Link>
          <Link href='/login' className='btn btn-ghost text-sm'>
            Sign In
          </Link>
          <button onClick={handleDemoLogin} className='btn btn-primary text-sm'>
            Try Free
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className='relative z-10 px-6 lg:px-12 pt-16 pb-24 max-w-6xl mx-auto'>
        <div className='text-center'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-elevated border border-white/10 mb-8 animate-fade-in'>
            <span className='w-2 h-2 rounded-full bg-neon-green animate-pulse' />
            <span className='text-sm text-text-secondary'>
              Trusted by 2,000+ developers preparing for interviews
            </span>
          </div>

          {/* Main headline */}
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 text-balance leading-tight animate-slide-up'>
            Interview-Ready
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cool-blue'>
              in Minutes, Not Months
            </span>
          </h1>

          <p
            className='text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 animate-slide-up text-balance'
            style={{ animationDelay: '100ms' }}
          >
            Stop memorizing. Start mastering. Adaptive drilling that targets
            your gaps, teaches what you miss, and proves when you&apos;re ready.
          </p>

          {/* CTA buttons */}
          <div
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up'
            style={{ animationDelay: '200ms' }}
          >
            <button
              onClick={handleDemoLogin}
              className='btn btn-primary btn-xl w-full sm:w-auto'
              style={{ boxShadow: '0 0 40px var(--neon-green-glow)' }}
            >
              Start Free Drill
              <span className='ml-2'>→</span>
            </button>
            <Link
              href='#how-it-works'
              className='btn btn-secondary btn-lg w-full sm:w-auto'
            >
              See How It Works
            </Link>
          </div>

          {/* Demo preview */}
          <div
            className='relative max-w-3xl mx-auto animate-slide-up'
            style={{ animationDelay: '300ms' }}
          >
            <div className='card-floating p-1 overflow-hidden'>
              <div className='bg-bg-charcoal rounded-xl p-6'>
                {/* Mock drill UI */}
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-sm text-text-tertiary'>
                    React Hooks • Interview Mode
                  </span>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-neon-green font-mono'>
                      87
                    </span>
                    <span className='text-xs text-text-muted'>Readiness</span>
                  </div>
                </div>
                <p className='text-lg text-text-primary mb-4'>
                  What hook should you use to perform side effects after render?
                </p>
                <div className='grid grid-cols-2 gap-2'>
                  {['useState', 'useRef', 'useEffect ✓', 'useMemo'].map(
                    (opt, i) => (
                      <div
                        key={opt}
                        className={`p-3 rounded-lg text-sm ${
                          i === 2
                            ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green'
                            : 'bg-bg-surface text-text-secondary'
                        }`}
                      >
                        {opt}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className='absolute inset-0 -z-10 blur-3xl opacity-30'>
              <div className='absolute inset-0 bg-gradient-to-r from-neon-green to-cool-blue rounded-3xl' />
            </div>
          </div>
        </div>
      </section>

      {/* Topics band */}
      <section className='relative z-10 py-12 border-y border-white/5 bg-bg-charcoal/50'>
        <div className='max-w-6xl mx-auto px-6'>
          <p className='text-center text-sm text-text-muted mb-6'>
            Popular topics
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            {FEATURED_TOPICS.map((topic) => (
              <span
                key={topic}
                className='px-4 py-2 rounded-full bg-bg-surface border border-white/10 text-sm text-text-secondary'
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id='how-it-works' className='relative z-10 py-24 px-6 lg:px-12'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-text-primary mb-4'>
              The Learning Loop That Works
            </h2>
            <p className='text-text-secondary max-w-xl mx-auto'>
              Four steps that turn uncertainty into interview confidence.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                step: '1',
                title: 'Drill',
                desc: 'Answer questions under pressure',
                icon: '⚡',
              },
              {
                step: '2',
                title: 'Learn',
                desc: 'Get taught what you missed',
                icon: '📚',
              },
              {
                step: '3',
                title: 'Verify',
                desc: 'Prove you understood it',
                icon: '✓',
              },
              {
                step: '4',
                title: 'Repeat',
                desc: 'Watch your score climb',
                icon: '📈',
              },
            ].map((item, i) => (
              <div key={item.step} className='relative'>
                <div className='card p-6 h-full hover:bg-bg-surface transition-colors'>
                  <div className='text-4xl mb-4'>{item.icon}</div>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='w-6 h-6 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold flex items-center justify-center'>
                      {item.step}
                    </span>
                    <h3 className='text-lg font-semibold text-text-primary'>
                      {item.title}
                    </h3>
                  </div>
                  <p className='text-sm text-text-secondary'>{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className='hidden lg:block absolute top-1/2 -right-3 text-text-muted'>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='relative z-10 py-24 px-6 lg:px-12 bg-bg-charcoal/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-text-primary mb-4'>
              Built for Developers Who Value Time
            </h2>
            <p className='text-text-secondary max-w-xl mx-auto'>
              No fluff. No passive videos. Just focused practice that moves the
              needle.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className='card p-8 hover:bg-bg-surface transition-colors'
              >
                <span className='text-4xl mb-4 block'>{feature.icon}</span>
                <h3 className='text-xl font-semibold text-text-primary mb-2'>
                  {feature.title}
                </h3>
                <p className='text-text-secondary'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='relative z-10 py-24 px-6 lg:px-12'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-text-primary mb-4'>
              Developers Love Lenam
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className='card p-6'>
                <p className='text-text-primary mb-6 italic'>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-cool-blue to-neon-green' />
                  <div>
                    <p className='text-sm font-medium text-text-primary'>
                      {testimonial.author}
                    </p>
                    <p className='text-xs text-text-muted'>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className='relative z-10 py-24 px-6 lg:px-12 bg-bg-charcoal/30'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-text-primary mb-4'>
            Simple, Transparent Pricing
          </h2>
          <p className='text-text-secondary mb-12'>
            Start free. Upgrade when you&apos;re ready to commit.
          </p>

          <div className='grid md:grid-cols-2 gap-8 max-w-2xl mx-auto'>
            {/* Free tier */}
            <div className='card p-8 text-left'>
              <h3 className='text-lg font-semibold text-text-primary mb-2'>
                Free
              </h3>
              <p className='text-3xl font-bold text-text-primary mb-1'>$0</p>
              <p className='text-sm text-text-muted mb-6'>
                Perfect to get started
              </p>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> 1 drill session per
                  day
                </li>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> 3 Teach Me pages
                  per week
                </li>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> 3 saved presets
                </li>
              </ul>
              <button
                onClick={handleDemoLogin}
                className='btn btn-secondary w-full'
              >
                Start Free
              </button>
            </div>

            {/* Pro tier */}
            <div className='card p-8 text-left border-2 border-neon-green/30 relative'>
              <div className='absolute -top-3 left-6 px-3 py-1 bg-neon-green text-bg-obsidian text-xs font-bold rounded-full'>
                POPULAR
              </div>
              <h3 className='text-lg font-semibold text-text-primary mb-2'>
                Pro
              </h3>
              <p className='text-3xl font-bold text-text-primary mb-1'>
                $39
                <span className='text-lg font-normal text-text-muted'>/mo</span>
              </p>
              <p className='text-sm text-text-muted mb-6'>For serious prep</p>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> Unlimited drill
                  sessions
                </li>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> Unlimited Teach Me
                  pages
                </li>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> Unlimited saved
                  presets
                </li>
                <li className='flex items-center gap-2 text-sm text-text-secondary'>
                  <span className='text-neon-green'>✓</span> Progress analytics
                </li>
              </ul>
              <button
                onClick={handleDemoLogin}
                className='btn btn-primary w-full'
              >
                Start Pro Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='relative z-10 py-24 px-6 lg:px-12'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-text-primary mb-6'>
            Your Interview Is Coming.
            <br />
            <span className='text-neon-green'>Are You Ready?</span>
          </h2>
          <p className='text-text-secondary mb-8'>
            Join thousands of developers who stopped hoping and started knowing.
          </p>
          <button
            onClick={handleDemoLogin}
            className='btn btn-primary btn-xl'
            style={{ boxShadow: '0 0 40px var(--neon-green-glow)' }}
          >
            Start Your First Drill — Free
            <span className='ml-2'>→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative z-10 py-12 px-6 lg:px-12 border-t border-white/5'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-2'>
            <span className='text-xl'>⚡</span>
            <span className='font-bold text-text-primary'>Lenam</span>
          </div>
          <div className='flex items-center gap-6 text-sm text-text-muted'>
            <Link
              href='/pricing'
              className='hover:text-text-primary transition-colors'
            >
              Pricing
            </Link>
            <Link
              href='/privacy'
              className='hover:text-text-primary transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='hover:text-text-primary transition-colors'
            >
              Terms
            </Link>
          </div>
          <p className='text-sm text-text-muted'>
            © 2024 Lenam. Ship with confidence.
          </p>
        </div>
      </footer>
    </div>
  );
}
