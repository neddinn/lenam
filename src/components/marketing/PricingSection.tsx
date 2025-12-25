'use client';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Lenam',
      features: [
        '50 questions per month',
        '3 topic areas',
        'Basic explanations',
        'Progress tracking',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For serious learners preparing for interviews',
      features: [
        'Unlimited questions',
        'All topic areas',
        'AI-powered explanations',
        'Code examples & patterns',
        'Knowledge Atlas',
        'Spaced repetition',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: '$29',
      period: 'per user/month',
      description: 'For engineering teams leveling up together',
      features: [
        'Everything in Pro',
        'Team dashboards',
        'Custom question banks',
        'Admin controls',
        'SSO integration',
        'Analytics & insights',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section
      id='pricing'
      style={{
        padding: '120px 24px',
        background: 'var(--bg-obsidian)',
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
            Simple, transparent pricing
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel
            anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: plan.popular
                  ? 'var(--bg-elevated)'
                  : 'var(--bg-card)',
                border: plan.popular
                  ? '2px solid var(--electric-teal)'
                  : '1px solid var(--border-subtle)',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseOut={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    background: 'var(--electric-teal)',
                    color: 'var(--bg-obsidian)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-muted)',
                    marginLeft: '4px',
                  }}
                >
                  /{plan.period}
                </span>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 32px 0',
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ color: 'var(--neon-green)' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.name)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  border: plan.popular
                    ? 'none'
                    : '1px solid var(--border-medium)',
                  background: plan.popular
                    ? 'var(--electric-teal)'
                    : 'transparent',
                  color: plan.popular
                    ? 'var(--bg-obsidian)'
                    : 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.background = '#33ffff';
                  } else {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                  }
                }}
                onMouseOut={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.background = 'var(--electric-teal)';
                  } else {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '48px',
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}
        >
          Have questions?{' '}
          <a
            href='#'
            style={{
              color: 'var(--electric-teal)',
              textDecoration: 'none',
            }}
          >
            Check our FAQ
          </a>{' '}
          or{' '}
          <a
            href='#'
            style={{
              color: 'var(--electric-teal)',
              textDecoration: 'none',
            }}
          >
            contact us
          </a>
        </p>
      </div>
    </section>
  );
}
