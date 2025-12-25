'use client';

import { useState, useMemo, useCallback } from 'react';
import { Question } from '@/lib/types';

interface DrillCardProps {
  question: Question;
  onAnswer: (answer: string, confidence: number) => void;
  state: 'idle' | 'correct' | 'wrong' | 'flipping';
  isLanding?: boolean;
}

export function DrillCard({
  question,
  onAnswer,
  state,
  isLanding = false,
}: DrillCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(50);

  // Derive showFeedback from state prop instead of using useEffect
  const showFeedback = useMemo(() => {
    return state === 'correct' || state === 'wrong';
  }, [state]);

  // Show score popup only when correct (derived, not state-based)
  const showScorePopup = state === 'correct';

  const handleSubmit = useCallback(() => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer, confidence);
    }
  }, [selectedAnswer, confidence, onAnswer]);

  const getBorderStyle = () => {
    if (state === 'correct') {
      return {
        borderColor: 'var(--neon-green)',
        boxShadow: 'var(--glow-green)',
        animation: 'pulse-green 0.5s ease-out',
      };
    }
    if (state === 'wrong') {
      return {
        borderColor: 'var(--electric-red)',
        boxShadow: 'var(--glow-red)',
        animation: 'shake 0.5s ease-out',
      };
    }
    return {
      borderColor: 'var(--border-subtle)',
      boxShadow: 'var(--shadow-card)',
    };
  };

  const getCardTransform = () => {
    if (isLanding) {
      return 'perspective(1000px) rotateY(-5deg) rotateX(3deg)';
    }
    if (state === 'flipping') {
      return 'perspective(1000px) rotateY(90deg)';
    }
    return 'none';
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isLanding ? '500px' : '600px',
        perspective: '1000px',
      }}
    >
      {/* Score popup - now uses CSS animation that auto-fades */}
      {showScorePopup && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '20px',
            color: 'var(--neon-green)',
            fontSize: '24px',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            animation: 'pop-score 1s forwards',
            zIndex: 10,
            textShadow: '0 0 20px var(--neon-green)',
          }}
        >
          +1
        </div>
      )}

      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid',
          padding: isLanding ? '32px' : '40px',
          transform: getCardTransform(),
          transition:
            'transform var(--transition-smooth), border-color var(--transition-fast), box-shadow var(--transition-fast)',
          ...getBorderStyle(),
        }}
      >
        {/* Question */}
        <h3
          style={{
            fontSize: isLanding ? '18px' : '22px',
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '28px',
            color: 'var(--text-primary)',
          }}
        >
          {question.text}
        </h3>

        {/* Options */}
        {question.type === 'multiple_choice' && question.options && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && setSelectedAnswer(option)}
                  disabled={showFeedback}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: showCorrect
                      ? 'var(--neon-green)'
                      : showWrong
                        ? 'var(--electric-red)'
                        : isSelected
                          ? 'var(--electric-teal)'
                          : 'var(--border-subtle)',
                    background: showCorrect
                      ? 'rgba(0, 255, 0, 0.1)'
                      : showWrong
                        ? 'rgba(255, 0, 0, 0.1)'
                        : isSelected
                          ? 'rgba(0, 255, 255, 0.1)'
                          : 'var(--bg-elevated)',
                    color: showCorrect
                      ? 'var(--neon-green)'
                      : showWrong
                        ? 'var(--electric-red)'
                        : isSelected
                          ? 'var(--electric-teal)'
                          : 'var(--text-primary)',
                    cursor: showFeedback ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '15px',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-ui)',
                    boxShadow: showCorrect
                      ? 'var(--glow-green)'
                      : showWrong
                        ? 'var(--glow-red)'
                        : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      marginRight: '12px',
                      opacity: 0.6,
                    }}
                  >
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Confidence Slider - only show when selected and not submitted */}
        {selectedAnswer && !showFeedback && (
          <div
            style={{
              marginBottom: '24px',
              animation: 'slide-up 0.3s ease-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Hesitant</span>
              <span
                style={{
                  color:
                    confidence > 70 ? 'var(--gold)' : 'var(--text-secondary)',
                  fontWeight: confidence > 70 ? 600 : 400,
                }}
              >
                Confidence: {confidence}%
              </span>
              <span
                style={{
                  color: 'var(--gold)',
                  textShadow:
                    confidence > 70 ? '0 0 10px var(--gold-glow)' : 'none',
                }}
              >
                Confident
              </span>
            </div>
            <input
              type='range'
              min={0}
              max={100}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(to right, var(--text-muted) 0%, var(--gold) 100%)`,
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        {!showFeedback && (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: selectedAnswer
                ? 'linear-gradient(135deg, var(--electric-teal), #00b3b3)'
                : 'var(--bg-elevated)',
              color: selectedAnswer
                ? 'var(--bg-obsidian)'
                : 'var(--text-muted)',
              fontSize: '16px',
              fontWeight: 600,
              cursor: selectedAnswer ? 'pointer' : 'not-allowed',
              transition: 'all var(--transition-base)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Submit Answer
          </button>
        )}

        {/* Feedback CTA */}
        {showFeedback && (
          <div
            style={{
              animation: 'expand-drawer 0.4s ease-out forwards',
              overflow: 'hidden',
            }}
          >
            {state === 'correct' ? (
              <button
                onClick={() => onAnswer(selectedAnswer!, confidence)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background:
                    'linear-gradient(135deg, var(--neon-green), #00cc00)',
                  color: 'var(--bg-obsidian)',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  boxShadow: 'var(--glow-green)',
                }}
              >
                {isLanding ? '🚀 Start Drilling' : '→ Next Question'}
              </button>
            ) : (
              <button
                onClick={() => onAnswer(selectedAnswer!, confidence)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background:
                    'linear-gradient(135deg, var(--electric-teal), #00b3b3)',
                  color: 'var(--bg-obsidian)',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  animation: 'pulse-teal 2s infinite',
                }}
              >
                ✨ Teach Me This
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
