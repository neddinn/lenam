'use client';

export function FeaturesSection() {
  const features = [
    {
      icon: '🎯',
      title: 'Confidence-Based Learning',
      description:
        'Rate your confidence before seeing the answer. Our algorithm prioritizes concepts you know but hesitate on — the real interview killers.',
      color: 'var(--electric-teal)',
    },
    {
      icon: '🧠',
      title: 'AI-Powered Explanations',
      description:
        'Wrong answer? Get instant, personalized explanations that connect to concepts you already know. No more generic documentation.',
      color: 'var(--neon-green)',
    },
    {
      icon: '📊',
      title: 'Spaced Repetition Engine',
      description:
        "Questions resurface at scientifically-optimal intervals. Skills decay over time — we'll remind you before they're forgotten.",
      color: 'var(--gold)',
    },
    {
      icon: '🗺️',
      title: 'Knowledge Atlas',
      description:
        'Visualize your entire skill landscape. See which areas are mastered, which are decaying, and where the gaps are.',
      color: 'var(--electric-teal)',
    },
    {
      icon: '⚡',
      title: 'Flow State Mode',
      description:
        'No clutter, no distractions. Just you and the question. Keyboard shortcuts for everything — feel like a pro.',
      color: 'var(--neon-green)',
    },
    {
      icon: '🎮',
      title: 'Gamified Progress',
      description:
        'Streaks, badges, and readiness scores that actually mean something. Track your journey from beginner to interview-ready.',
      color: 'var(--gold)',
    },
  ];

  return (
    <section
      id='features'
      style={{
        padding: '120px 24px',
        background: 'var(--bg-charcoal)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--text-primary)',
            }}
          >
            Learning that actually sticks
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Built on cognitive science principles, designed for how developers
            actually learn.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              style={{
                padding: '32px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = feature.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 0, 0, 0.3)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  marginBottom: '16px',
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
