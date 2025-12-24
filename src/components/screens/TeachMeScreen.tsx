'use client';

import { useState } from 'react';
import { Question } from '@/lib/types';

interface TeachMeScreenProps {
  question: Question;
  userContext?: string;
  onComplete: () => void;
}

type ContentMode = 'concept' | 'code' | 'interview';

export function TeachMeScreen({
  question,
  userContext = 'Go Lang Dev',
  onComplete,
}: TeachMeScreenProps) {
  const [mode, setMode] = useState<ContentMode>('concept');
  const [microQuizAnswered, setMicroQuizAnswered] = useState<number[]>([]);

  const getContent = () => {
    switch (mode) {
      case 'concept':
        return question.conceptExplanation || question.explanation;
      case 'code':
        return question.codeExample || 'No code example available.';
      case 'interview':
        return question.interviewTip || 'No interview tip available.';
    }
  };

  const handleMicroQuiz = (index: number) => {
    if (!microQuizAnswered.includes(index)) {
      setMicroQuizAnswered([...microQuizAnswered, index]);
    }
  };

  // Mini quiz items inline
  const microQuizItems = [
    {
      question: 'The dependency array controls when the effect runs.',
      answer: true,
    },
    {
      question: 'useEffect runs before the component renders.',
      answer: false,
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fade-in 0.3s ease-out',
      }}
    >
      {/* Frosted overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        onClick={onComplete}
      />

      {/* Content panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '85vh',
          overflow: 'auto',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-elevated)',
          animation: 'slide-up 0.4s ease-out',
        }}
      >
        {/* Bridge Note - if user has context */}
        {question.bridgeNote && (
          <div
            style={{
              position: 'sticky',
              top: 0,
              padding: '16px 24px',
              background:
                'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.05))',
              borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: '20px' }}>💡</span>
            <div>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--electric-teal)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                As a {userContext}:
              </span>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {question.bridgeNote}
              </p>
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{ padding: '32px' }}>
          {/* Original question reference */}
          <div
            style={{
              padding: '16px 20px',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--electric-red)',
              marginBottom: '24px',
              opacity: 0.8,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--electric-red)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              YOUR GAP
            </span>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {question.text}
            </p>
          </div>

          {/* Gap Block - highlighted explanation */}
          <div
            style={{
              padding: '20px 24px',
              background:
                'linear-gradient(135deg, rgba(0, 255, 255, 0.08), rgba(0, 255, 255, 0.02))',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--electric-teal)',
              marginBottom: '24px',
              boxShadow: 'var(--glow-teal)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--electric-teal)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              ✨ KEY INSIGHT
            </span>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              {question.explanation}
            </p>
          </div>

          {/* Content area */}
          <div
            style={{
              marginBottom: '24px',
              animation: 'fade-in 0.3s ease-out',
            }}
          >
            {mode === 'code' ? (
              <pre
                style={{
                  padding: '20px',
                  background: '#0d1117',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'auto',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-mono)',
                  color: '#e6edf3',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {getContent()}
              </pre>
            ) : (
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {getContent()}
              </p>
            )}
          </div>

          {/* Micro quizzes */}
          {mode === 'concept' && (
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                QUICK CHECK
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {microQuizItems.map((item, index) => {
                  const isAnswered = microQuizAnswered.includes(index);
                  return (
                    <div
                      key={index}
                      style={{
                        padding: '16px',
                        background: 'var(--bg-elevated)',
                        borderRadius: 'var(--radius-md)',
                        border: isAnswered
                          ? `1px solid ${item.answer ? 'var(--neon-green)' : 'var(--electric-red)'}`
                          : '1px solid var(--border-subtle)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-primary)',
                          marginBottom: '12px',
                        }}
                      >
                        {item.question}
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleMicroQuiz(index)}
                          disabled={isAnswered}
                          style={{
                            padding: '8px 20px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background:
                              isAnswered && item.answer
                                ? 'var(--neon-green)'
                                : 'var(--bg-card)',
                            color:
                              isAnswered && item.answer
                                ? 'var(--bg-obsidian)'
                                : 'var(--text-secondary)',
                            fontSize: '13px',
                            cursor: isAnswered ? 'default' : 'pointer',
                            fontFamily: 'var(--font-ui)',
                          }}
                        >
                          True
                        </button>
                        <button
                          onClick={() => handleMicroQuiz(index)}
                          disabled={isAnswered}
                          style={{
                            padding: '8px 20px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background:
                              isAnswered && !item.answer
                                ? 'var(--neon-green)'
                                : 'var(--bg-card)',
                            color:
                              isAnswered && !item.answer
                                ? 'var(--bg-obsidian)'
                                : 'var(--text-secondary)',
                            fontSize: '13px',
                            cursor: isAnswered ? 'default' : 'pointer',
                            fontFamily: 'var(--font-ui)',
                          }}
                        >
                          False
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Steering Strip - sticky bottom */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            padding: '16px 24px',
            background:
              'linear-gradient(to top, var(--bg-card), var(--bg-card) 80%, transparent)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Mode controls */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {[
              { id: 'concept' as const, icon: '🧠', label: 'Concept' },
              { id: 'code' as const, icon: '🛠️', label: 'Code' },
              { id: 'interview' as const, icon: '🎤', label: 'Interview' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background:
                    mode === m.id
                      ? 'linear-gradient(135deg, #2a2a3a, #3a3a4a)'
                      : 'transparent',
                  color:
                    mode === m.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: mode === m.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'var(--font-ui)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Got it button */}
          <button
            onClick={onComplete}
            style={{
              padding: '12px 32px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background:
                'linear-gradient(135deg, var(--neon-green), var(--neon-green-dim))',
              color: 'var(--bg-obsidian)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              boxShadow: 'var(--glow-green)',
            }}
          >
            ✓ Got it
          </button>
        </div>
      </div>
    </div>
  );
}
