'use client';

import { useState } from 'react';

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
  onLogoClick: () => void;
}

export function Navbar({ onLogin, onSignup, onLogoClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={onLogoClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background:
                'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '16px',
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

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className='desktop-nav'
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = 'var(--text-primary)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = 'var(--text-secondary)')
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={onLogin}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = 'var(--text-primary)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.color = 'var(--text-secondary)')
            }
          >
            Log in
          </button>
          <button
            onClick={onSignup}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--electric-teal)',
              color: 'var(--bg-obsidian)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#33ffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--electric-teal)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Free
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
            className='mobile-menu-toggle'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {mobileMenuOpen ? (
                <path d='M18 6L6 18M6 6l12 12' />
              ) : (
                <path d='M3 12h18M3 6h18M3 18h18' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-charcoal)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '16px',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
