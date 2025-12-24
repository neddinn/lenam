'use client';

import { SkillNode } from '@/lib/types';

interface SkillOrbProps {
  node: SkillNode;
  onClick: (node: SkillNode) => void;
  isActive?: boolean;
}

export function SkillOrb({ node, onClick, isActive = false }: SkillOrbProps) {
  const getStatusColor = () => {
    switch (node.status) {
      case 'mastered':
        return 'var(--neon-green)';
      case 'active':
        return 'var(--electric-teal)';
      case 'decaying':
        return 'var(--electric-red)';
      case 'unexplored':
      default:
        return 'var(--text-muted)';
    }
  };

  const getStatusGlow = () => {
    switch (node.status) {
      case 'mastered':
        return '0 0 20px var(--neon-green-glow), 0 0 40px var(--neon-green-glow)';
      case 'active':
        return '0 0 15px var(--electric-teal-glow)';
      case 'decaying':
        return '0 0 20px var(--electric-red-glow)';
      default:
        return 'none';
    }
  };

  const getAnimation = () => {
    if (isActive) return 'orb-pulse 2s ease-in-out infinite';
    if (node.status === 'decaying') return 'flicker 1.5s ease-in-out infinite';
    if (node.status === 'mastered') return 'none';
    return 'none';
  };

  const getOpacity = () => {
    if (node.status === 'unexplored') return 0.4;
    if (node.status === 'decaying') return 0.8;
    return 1;
  };

  return (
    <button
      onClick={() => onClick(node)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform var(--transition-base)',
        opacity: getOpacity(),
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Orb */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${getStatusColor()}, transparent 70%), var(--bg-elevated)`,
          border: `2px solid ${getStatusColor()}`,
          boxShadow: getStatusGlow(),
          animation: getAnimation(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Score inside orb */}
        {node.status !== 'unexplored' && (
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: getStatusColor(),
            }}
          >
            {node.readinessScore}
          </span>
        )}
        {node.status === 'unexplored' && (
          <span
            style={{
              fontSize: '24px',
              opacity: 0.5,
            }}
          >
            ?
          </span>
        )}

        {/* Decay indicator */}
        {node.status === 'decaying' && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--electric-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              boxShadow: 'var(--glow-red)',
            }}
          >
            ⚠
          </div>
        )}

        {/* Mastery badge */}
        {node.readinessScore >= 80 && node.status === 'mastered' && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'var(--bg-obsidian)',
            }}
          >
            ✓
          </div>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color:
            isActive || node.status === 'mastered'
              ? 'var(--text-primary)'
              : 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '100px',
        }}
      >
        {node.name}
      </span>
    </button>
  );
}
