'use client';

import { useState, useMemo } from 'react';
import { SkillOrb } from '@/components/ui/SkillOrb';
import { dummySkillNodes } from '@/lib/dummyData';
import { SkillNode } from '@/lib/types';

interface LibraryScreenProps {
  onStartDrill: (topic: string) => void;
}

// Helper to calculate days ago from a date - pure function
function getDaysAgo(date: Date, now: Date): number {
  return Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function LibraryScreen({ onStartDrill }: LibraryScreenProps) {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [showRapidRefresh, setShowRapidRefresh] = useState(false);

  // Capture current time once during render to avoid impure function calls
  const currentTime = useMemo(() => new Date(), []);

  const masteredCount = dummySkillNodes.filter(
    (n) => n.status === 'mastered',
  ).length;
  const decayingCount = dummySkillNodes.filter(
    (n) => n.status === 'decaying',
  ).length;
  const totalScore = Math.round(
    dummySkillNodes.reduce((acc, n) => acc + n.readinessScore, 0) /
      dummySkillNodes.length,
  );

  const handleOrbClick = (node: SkillNode) => {
    setSelectedNode(node);
    if (node.status === 'decaying') {
      setShowRapidRefresh(true);
    }
  };

  const handleStartDrill = () => {
    if (selectedNode) {
      onStartDrill(selectedNode.name);
    }
  };

  // Compute days ago for hovered node
  const hoveredDaysAgo = useMemo(() => {
    if (!hoveredNode) return 0;
    return getDaysAgo(hoveredNode.lastPracticed, currentTime);
  }, [hoveredNode, currentTime]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 24px 24px',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'slide-down 0.6s ease-out',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '8px',
            background:
              'linear-gradient(135deg, var(--text-primary), var(--electric-teal))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Knowledge Atlas
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
          }}
        >
          Your constellation of mastery
        </p>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '48px',
          animation: 'fade-in 0.6s ease-out 0.2s backwards',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--electric-teal)',
            }}
          >
            {totalScore}%
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            Avg. Readiness
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--neon-green)',
            }}
          >
            {masteredCount}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            Mastered
          </div>
        </div>
        {decayingCount > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--electric-red)',
              }}
            >
              {decayingCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              Decaying
            </div>
          </div>
        )}
      </div>

      {/* Skill Orbs Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          maxWidth: '800px',
          margin: '0 auto',
          animation: 'fade-in 0.6s ease-out 0.3s backwards',
        }}
      >
        {dummySkillNodes.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <SkillOrb
              node={node}
              onClick={handleOrbClick}
              isActive={selectedNode?.id === node.id}
            />
          </div>
        ))}
      </div>

      {/* Connection lines - simplified SVG overlay */}
      <svg
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.15,
          zIndex: 0,
        }}
      >
        {/* Create some subtle connection lines between related topics */}
        <defs>
          <linearGradient id='lineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              stopColor='var(--electric-teal)'
              stopOpacity='0'
            />
            <stop
              offset='50%'
              stopColor='var(--electric-teal)'
              stopOpacity='0.5'
            />
            <stop
              offset='100%'
              stopColor='var(--electric-teal)'
              stopOpacity='0'
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Hover tooltip */}
      {hoveredNode && hoveredNode.status !== 'unexplored' && (
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 24px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${
              hoveredNode.status === 'decaying'
                ? 'var(--electric-red)'
                : hoveredNode.status === 'mastered'
                  ? 'var(--neon-green)'
                  : 'var(--electric-teal)'
            }`,
            boxShadow: 'var(--shadow-elevated)',
            animation: 'slide-up 0.2s ease-out',
            zIndex: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            {hoveredNode.name}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}
          >
            <span>
              Readiness:{' '}
              <strong
                style={{
                  color:
                    hoveredNode.readinessScore >= 80
                      ? 'var(--neon-green)'
                      : 'var(--text-primary)',
                }}
              >
                {hoveredNode.readinessScore}%
              </strong>
            </span>
            <span>
              Practiced: <strong>{hoveredDaysAgo}d ago</strong>
            </span>
          </div>
          {hoveredNode.status === 'decaying' && (
            <div
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: 'rgba(255, 0, 0, 0.1)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--electric-red)',
                fontSize: '12px',
              }}
            >
              ⚠️ Knowledge decaying – practice needed!
            </div>
          )}
        </div>
      )}

      {/* Selected node details / CTA */}
      {selectedNode && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 28px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-elevated)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            animation: 'slide-up 0.3s ease-out',
            zIndex: 30,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {selectedNode.name}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              {selectedNode.questionsAnswered} / {selectedNode.totalQuestions}{' '}
              questions
            </div>
          </div>
          <button
            onClick={handleStartDrill}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background:
                selectedNode.status === 'decaying'
                  ? 'linear-gradient(135deg, var(--electric-red), #cc0000)'
                  : selectedNode.status === 'unexplored'
                    ? 'linear-gradient(135deg, var(--electric-teal), #00b3b3)'
                    : 'linear-gradient(135deg, var(--neon-green), #00cc00)',
              color:
                selectedNode.status === 'decaying'
                  ? 'white'
                  : 'var(--bg-obsidian)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {selectedNode.status === 'decaying'
              ? '🔥 Restore Mastery'
              : selectedNode.status === 'unexplored'
                ? '🚀 Start Learning'
                : '⚡ Continue Drilling'}
          </button>
        </div>
      )}

      {/* Rapid Refresh Mini-Drill (for decaying skills) */}
      {showRapidRefresh && selectedNode?.status === 'decaying' && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--electric-red)',
            padding: '24px',
            animation: 'slide-up 0.3s ease-out',
            zIndex: 40,
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              ⚡ Rapid Refresh: {selectedNode.name}
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
              }}
            >
              Answer 3 quick questions to restore your mastery
            </p>
            <div
              style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
            >
              <button
                onClick={() => {
                  setShowRapidRefresh(false);
                  onStartDrill(selectedNode.name);
                }}
                style={{
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background:
                    'linear-gradient(135deg, var(--neon-green), #00cc00)',
                  color: 'var(--bg-obsidian)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                🔥 Start Refresh
              </button>
              <button
                onClick={() => setShowRapidRefresh(false)}
                style={{
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
