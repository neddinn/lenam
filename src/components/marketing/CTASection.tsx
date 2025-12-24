'use client';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section
      style={{
        padding: '120px 24px',
        background: 'var(--bg-obsidian)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            marginBottom: '20px',
            color: 'var(--text-primary)',
          }}
        >
          Ready to master your craft?
        </h2>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Join 50,000+ developers who&apos;ve transformed their learning. Start
          free, no credit card required.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onGetStarted}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--electric-teal)',
              color: 'var(--bg-obsidian)',
              fontSize: '17px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#33ffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 12px 32px rgba(0, 255, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--electric-teal)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Learning Free →
          </button>
        </div>

        <p
          style={{
            marginTop: '24px',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}
        >
          ✓ Free forever plan available &nbsp;&nbsp; ✓ No credit card required
          &nbsp;&nbsp; ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
}
