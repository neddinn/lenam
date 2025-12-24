'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function LandingPage() {
  return (
    <div className="page-transition" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ width: '100%', padding: 'var(--space-4) var(--space-6)' }}>
        <div className="container flex-between">
          <Link href="/" className="heading-4" style={{ letterSpacing: '-0.03em', textDecoration: 'none', color: 'var(--text-primary)' }}>
            FlashLearn
          </Link>
          <nav className="row-4">
            <Link href="/library" className="btn btn-ghost body-small">
              Your Library
            </Link>
            <Link href="/setup" className="btn btn-secondary body-small">
              Log in
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-16) var(--space-6)' }}>
        <div className="stack-8 text-center" style={{ maxWidth: 'var(--max-width-lg)' }}>
          {/* Tagline */}
          <div className="stack-4 animate-fade-in-up">
            <h1 className="heading-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              Prove readiness.
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>Not just preparation.</span>
            </h1>
            <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '32rem', margin: '0 auto' }}>
              Targeted drilling with instant gap remediation.
              Know when you're actually ready for your interview.
            </p>
          </div>

          {/* CTA */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <Link href="/setup" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="large"
                className="btn-hero"
                rightIcon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Start free drill
              </Button>
            </Link>
            <p className="caption">
              No signup required for your first session
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="container animate-fade-in-up"
          style={{ marginTop: 'var(--space-20)', animationDelay: '200ms' }}
        >
          <div className="row text-center" style={{ justifyContent: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
            <div className="stack-1">
              <span className="heading-3" style={{ color: 'var(--accent-primary)' }}>8,400+</span>
              <span className="caption">developers trained</span>
            </div>
            <div className="stack-1">
              <span className="heading-3" style={{ color: 'var(--accent-primary)' }}>12 min</span>
              <span className="caption">average session</span>
            </div>
            <div className="stack-1">
              <span className="heading-3" style={{ color: 'var(--accent-primary)' }}>24%</span>
              <span className="caption">reach Ready in one session</span>
            </div>
          </div>
        </div>
      </main>

      {/* How it works */}
      <section style={{ padding: 'var(--space-20) var(--space-6)', background: 'var(--bg-elevated)' }}>
        <div className="container">
          <h2 className="heading-2 text-center" style={{ marginBottom: 'var(--space-12)' }}>The readiness loop</h2>

          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {[
              {
                step: '01',
                title: 'Drill',
                description: 'Answer targeted questions. Track your confidence on each.',
              },
              {
                step: '02',
                title: 'Identify gaps',
                description: 'See exactly what you missed. No guessing.',
              },
              {
                step: '03',
                title: 'Learn',
                description: 'Get focused remediation on your specific gaps.',
              },
              {
                step: '04',
                title: 'Prove it',
                description: 'Re-drill and watch your readiness score climb.',
              },
            ].map((item) => (
              <div key={item.step} className="stack-3">
                <span
                  className="body-small"
                  style={{ color: 'var(--accent-primary)', fontWeight: 600 }}
                >
                  {item.step}
                </span>
                <h3 className="heading-4">{item.title}</h3>
                <p className="body-base" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics preview */}
      <section style={{ padding: 'var(--space-20) var(--space-6)' }}>
        <div className="container text-center">
          <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>Popular topics</h2>
          <p className="body-base" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-12)' }}>
            Interview prep for modern software development
          </p>

          <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {[
              'React Rendering',
              'TypeScript Generics',
              'System Design',
              'HTTP Caching',
              'Database Indexing',
              'OAuth Flows',
              'Load Balancing',
              'REST vs GraphQL',
              'Concurrency',
              'Testing Strategies',
            ].map((topic) => (
              <span key={topic} className="chip">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section style={{ padding: 'var(--space-20) var(--space-6)', background: 'var(--bg-sunken)' }}>
        <div className="container text-center" style={{ maxWidth: 'var(--max-width-4xl)' }}>
          <h2 className="heading-2" style={{ marginBottom: 'var(--space-8)' }}>Simple pricing</h2>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 'var(--space-8)' }}>
            {/* Free tier */}
            <div className="card stack-4" style={{ textAlign: 'left' }}>
              <div>
                <span className="body-small" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  FREE
                </span>
                <h3 className="heading-3" style={{ marginTop: 'var(--space-1)' }}>Try it out</h3>
              </div>
              <ul className="stack-2 body-base" style={{ color: 'var(--text-secondary)', listStyle: 'none', padding: 0 }}>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  1 drill session per day
                </li>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  3 Teach Me pages per week
                </li>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  1 saved preset
                </li>
              </ul>
            </div>

            {/* Pro tier */}
            <div
              className="card stack-4"
              style={{
                textAlign: 'left',
                borderColor: 'var(--accent-primary)',
                background: 'var(--accent-primary-subtle)',
              }}
            >
              <div>
                <span className="body-small" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                  PRO
                </span>
                <h3 className="heading-3" style={{ marginTop: 'var(--space-1)' }}>
                  $19<span className="body-base" style={{ color: 'var(--text-secondary)' }}>/mo</span>
                </h3>
              </div>
              <ul className="stack-2 body-base" style={{ color: 'var(--text-secondary)', listStyle: 'none', padding: 0 }}>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  Unlimited drills
                </li>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  Unlimited Teach Me
                </li>
                <li className="row-2">
                  <span style={{ color: 'var(--status-success)' }}>✓</span>
                  Unlimited saved presets
                </li>
              </ul>
              <Button variant="primary" fullWidth>
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--space-8) var(--space-6)', borderTop: '1px solid var(--border-default)' }}>
        <div className="container flex-between">
          <span className="body-small" style={{ color: 'var(--text-muted)' }}>
            © 2025 FlashLearn
          </span>
          <div className="row-4">
            <Link href="#" className="body-small" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="#" className="body-small" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
