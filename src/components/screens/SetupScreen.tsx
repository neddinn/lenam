'use client';

import { useState } from 'react';
import { topicSuggestions } from '@/lib/dummyData';

interface SetupScreenProps {
  onStartDrill: (
    topic: string,
    goal: 'interview' | 'build' | 'concept',
  ) => void;
}

const goalModes = [
  {
    id: 'interview' as const,
    icon: '🎤',
    label: 'Interview',
    placeholder: 'Ace the algorithms...',
  },
  {
    id: 'build' as const,
    icon: '🛠️',
    label: 'Build',
    placeholder: 'Master the syntax...',
  },
  {
    id: 'concept' as const,
    icon: '🧠',
    label: 'Concept',
    placeholder: 'Grasp the fundamentals...',
  },
];

export function SetupScreen({ onStartDrill }: SetupScreenProps) {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState<'interview' | 'build' | 'concept'>(
    'interview',
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const currentGoal = goalModes.find((g) => g.id === goal)!;

  const handleStartDrill = () => {
    if (topic.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        onStartDrill(topic, goal);
      }, 600);
    }
  };

  // Get contextual background hint based on topic
  const getTopicAmbience = () => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes('python')) {
      return 'linear-gradient(135deg, rgba(55, 118, 171, 0.1) 0%, transparent 60%)';
    }
    if (lowerTopic.includes('aws') || lowerTopic.includes('cloud')) {
      return 'linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, transparent 60%)';
    }
    if (lowerTopic.includes('react')) {
      return 'linear-gradient(135deg, rgba(97, 218, 251, 0.1) 0%, transparent 60%)';
    }
    if (lowerTopic.includes('node')) {
      return 'linear-gradient(135deg, rgba(104, 160, 99, 0.1) 0%, transparent 60%)';
    }
    return 'transparent';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        background: getTopicAmbience(),
        transition: 'background var(--transition-smooth)',
      }}
    >
      {/* Page Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          Start a New Drill
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Choose your topic and learning mode
        </p>
      </div>

      {/* Main content container */}
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          animation: isAnimating
            ? 'blast-off 0.6s ease-in forwards'
            : 'slide-up 0.6s ease-out',
          opacity: isAnimating ? 0 : 1,
        }}
      >
        {/* Goal Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '4px',
              padding: '4px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {goalModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setGoal(mode.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background:
                    goal === mode.id
                      ? 'linear-gradient(135deg, var(--electric-teal), #00b3b3)'
                      : 'transparent',
                  color:
                    goal === mode.id
                      ? 'var(--bg-obsidian)'
                      : 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: goal === mode.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  fontFamily: 'var(--font-ui)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div style={{ marginBottom: '32px' }}>
          <input
            type='text'
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setShowSuggestions(e.target.value.length === 0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleStartDrill();
            }}
            placeholder={`What are we mastering today, Engineer?`}
            autoFocus
            style={{
              width: '100%',
              padding: '20px 24px',
              fontSize: '18px',
              fontWeight: 500,
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--border-subtle)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
              transition: 'all var(--transition-base)',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--electric-teal)';
              e.currentTarget.style.boxShadow = 'var(--glow-teal)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <p
            style={{
              fontSize: '13px',
              color: 'var(--electric-teal)',
              marginTop: '12px',
              textAlign: 'center',
              fontStyle: 'italic',
              transition: 'opacity var(--transition-base)',
              opacity: topic ? 1 : 0.5,
            }}
          >
            {currentGoal.placeholder}
          </p>
        </div>

        {/* Topic suggestions */}
        {showSuggestions && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '40px',
              animation: 'fade-in 0.4s ease-out',
            }}
          >
            {topicSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setTopic(suggestion.name);
                  setShowSuggestions(false);
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  fontFamily: 'var(--font-ui)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--electric-teal)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Start button */}
        <button
          onClick={handleStartDrill}
          disabled={!topic.trim()}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: topic.trim()
              ? 'linear-gradient(135deg, var(--electric-teal), #00b3b3)'
              : 'var(--bg-elevated)',
            color: topic.trim() ? 'var(--bg-obsidian)' : 'var(--text-muted)',
            fontSize: '17px',
            fontWeight: 600,
            cursor: topic.trim() ? 'pointer' : 'not-allowed',
            transition: 'all var(--transition-base)',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseOver={(e) => {
            if (topic.trim()) {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = 'var(--glow-teal)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          🚀 Start Drill
        </button>
      </div>
    </div>
  );
}
