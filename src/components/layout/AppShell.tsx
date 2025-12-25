'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  currentScreen: string;
  userName?: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function AppShell({
  children,
  currentScreen,
  userName = 'Engineer',
  onNavigate,
  onLogout,
}: AppShellProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: '⚡' },
    { id: 'library', label: 'Knowledge Atlas', icon: '🗺️' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-obsidian)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          background: 'var(--bg-charcoal)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={() => onNavigate('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background:
                  'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--bg-obsidian)',
              }}
            >
              L
            </div>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Lenam
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  color: isActive
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--bg-obsidian)',
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}
              >
                {userName}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                Pro Plan
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--electric-red)';
              e.currentTarget.style.color = 'var(--electric-red)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: '240px',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  );
}
