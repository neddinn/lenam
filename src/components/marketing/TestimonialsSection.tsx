'use client';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I failed 3 interviews before using Lenam. The confidence scoring showed me I 'knew' things I actually didn't. Passed my Google interview 2 months later.",
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
    },
    {
      quote:
        "The spaced repetition is a game changer. I used to cram before interviews — now I maintain 'interview readiness' year-round with just 15 min/day.",
      name: 'Marcus Johnson',
      role: 'Staff Engineer',
      company: 'Stripe',
    },
    {
      quote:
        "Our team's technical interview pass rate went from 23% to 67% after 3 months. The ROI is insane when you do the math on recruiting costs.",
      name: 'Priya Patel',
      role: 'Engineering Manager',
      company: 'Airbnb',
    },
  ];

  return (
    <section
      id='testimonials'
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
            Developers love Lenam
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
            }}
          >
            Join thousands of engineers who&apos;ve leveled up their skills.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              style={{
                padding: '32px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: 'var(--gold)',
                      fontSize: '16px',
                      marginRight: '2px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, var(--electric-teal), var(--neon-green))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--bg-obsidian)',
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '2px',
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '64px',
            marginTop: '80px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '50K+', label: 'Developers' },
            { value: '2M+', label: 'Questions Answered' },
            { value: '89%', label: 'Interview Pass Rate' },
            { value: '4.9', label: 'App Store Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--electric-teal)',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
