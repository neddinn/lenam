'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const handleStartDrill = () => {
    if (topic.trim()) {
      router.push(`/drill?topic=${encodeURIComponent(topic)}&goal=interview`);
    } else {
      // Focus the input if no topic entered
      const input = document.querySelector(
        'input[type="text"]',
      ) as HTMLInputElement;
      input?.focus();
      input?.select();
    }
  };

  return (
    <div
      style={{
        padding: '40px 48px',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar: Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '80px',
          animation: 'fade-in 0.6s ease-out',
        }}
      >
        <div>
          <h1
            suppressHydrationWarning
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '4px',
            }}
          >
            {greeting}, Engineer.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Your mind is clear. Ready to flow?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Streak Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: '18px' }}>🔥</span>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                7 Days
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Streak
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: '18px' }}>⚡</span>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Lvl 5
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Systems Architect
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: The Anchor */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '80px',
          position: 'relative',
        }}
      >
        {/* The Focus Orb / Pulse */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            marginBottom: '48px',
            cursor: 'pointer',
          }}
          onClick={handleStartDrill}
          onMouseEnter={() => setIsHoveringOrb(true)}
          onMouseLeave={() => setIsHoveringOrb(false)}
        >
          {/* Core Orb */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 30% 30%, var(--electric-teal), #0088aa)',
              boxShadow: '0 0 60px var(--electric-teal-glow)',
              animation: 'breathe 4s ease-in-out infinite',
              transition: 'transform 0.3s ease',
              transform: isHoveringOrb ? 'scale(1.1)' : 'scale(1)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--bg-obsidian)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: isHoveringOrb ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              Start Drill
            </span>
          </div>

          {/* Outer Ring 1 */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              border: '1px dashed var(--electric-teal)',
              opacity: 0.3,
              animation: 'spin 20s linear infinite',
            }}
          />
          {/* Outer Ring 2 */}
          <div
            style={{
              position: 'absolute',
              inset: '-40px',
              borderRadius: '50%',
              border: '1px solid var(--border-subtle)',
              opacity: 0.2,
            }}
          />
        </div>

        {/* Focus Input */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            marginBottom: '64px',
          }}
        >
          <input
            type='text'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStartDrill()}
            placeholder='What do you want to master today?'
            autoFocus
            style={{
              width: '100%',
              padding: '24px 32px',
              fontSize: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-ui)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--electric-teal)';
              e.currentTarget.style.boxShadow = 'var(--glow-teal)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              opacity: topic ? 1 : 0.3,
              color: 'var(--electric-teal)',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'opacity 0.2s ease',
            }}
          >
            ENTER ↵
          </div>
        </div>

        {/* Recent Focus Chips */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          {[
            'React Hooks',
            'System Design',
            'TypeScript Generics',
            'AWS Lambda',
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                setTopic(item);
                router.push(
                  `/drill?topic=${encodeURIComponent(item)}&goal=interview`,
                );
              }}
              style={{
                padding: '8px 16px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--electric-teal)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Stats Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '32px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '13px',
              marginBottom: '4px',
            }}
          >
            Questions Answered
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            248
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '13px',
              marginBottom: '4px',
            }}
          >
            Mastery Score
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--neon-green)',
            }}
          >
            78%
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '13px',
              marginBottom: '4px',
            }}
          >
            Next Milestone
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--electric-teal)',
            }}
          >
            Senior Dev
          </div>
        </div>
      </div>
    </div>
  );
}
