'use client';

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'Blog', 'Community', 'API'],
    Company: ['About', 'Careers', 'Press', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
  };

  return (
    <footer
      style={{
        background: 'var(--bg-charcoal)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '64px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background:
                    'linear-gradient(135deg, var(--electric-teal), var(--neon-green))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--bg-obsidian)',
                }}
              >
                L
              </div>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                Lenam
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '200px',
              }}
            >
              Deep focus learning for developers who want to master their craft.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {category}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {links.map((link) => (
                  <li key={link} style={{ marginBottom: '10px' }}>
                    <a
                      href='#'
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = 'var(--text-secondary)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = 'var(--text-muted)')
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            © {new Date().getFullYear()} Lenam. All rights reserved.
          </p>

          {/* Social Links */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            {['Twitter', 'GitHub', 'Discord'].map((social) => (
              <a
                key={social}
                href='#'
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = 'var(--electric-teal)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = 'var(--text-muted)')
                }
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
