'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ReadinessMeter from '@/components/ReadinessMeter';
import ProgressBar from '@/components/ProgressBar';
import OptionCard from '@/components/OptionCard';
import { sampleQuizItems, QuizItem } from '@/lib/dummy-data';

type ConfidenceLevel = 'not-sure' | 'confident';

interface AnswerState {
  selectedIndex: number | null;
  submitted: boolean;
  wasCorrect: boolean | null;
  confidenceLevel: ConfidenceLevel;
}

export default function DrillPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [readinessScore, setReadinessScore] = useState(45);
  const [showSources, setShowSources] = useState(false);

  const currentQuestion: QuizItem = sampleQuizItems[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || {
    selectedIndex: null,
    submitted: false,
    wasCorrect: null,
    confidenceLevel: 'not-sure' as ConfidenceLevel,
  };

  const totalQuestions = sampleQuizItems.length;
  const answeredCount = Object.values(answers).filter((a) => a.submitted).length;
  const correctCount = Object.values(answers).filter((a) => a.wasCorrect).length;

  const handleSelectOption = useCallback((index: number) => {
    if (currentAnswer.submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        selectedIndex: index,
      },
    }));
  }, [currentAnswer, currentQuestion.id]);

  const handleConfidenceChange = useCallback((level: ConfidenceLevel) => {
    if (currentAnswer.submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        confidenceLevel: level,
      },
    }));
  }, [currentAnswer, currentQuestion.id]);

  const handleSubmit = useCallback(() => {
    if (currentAnswer.selectedIndex === null) return;

    const isCorrect = currentAnswer.selectedIndex === currentQuestion.correctIndex;
    const wasHighConfidenceWrong =
      !isCorrect && currentAnswer.confidenceLevel === 'confident';

    // Update answer state
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        submitted: true,
        wasCorrect: isCorrect,
      },
    }));

    // Update readiness score
    let delta = 0;
    if (isCorrect) {
      delta = currentAnswer.confidenceLevel === 'confident' ? 8 : 4;
    } else {
      delta = wasHighConfidenceWrong ? -6 : -2;
    }
    setReadinessScore((prev) => Math.max(0, Math.min(100, prev + delta)));
  }, [currentAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowSources(false);
    } else {
      router.push('/summary');
    }
  }, [currentQuestionIndex, totalQuestions, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Number keys for option selection
      if (['1', '2', '3', '4'].includes(e.key) && !currentAnswer.submitted) {
        const index = parseInt(e.key) - 1;
        if (currentQuestion.choices && index < currentQuestion.choices.length) {
          handleSelectOption(index);
        }
      }

      // Enter to submit
      if (e.key === 'Enter' && currentAnswer.selectedIndex !== null && !currentAnswer.submitted) {
        handleSubmit();
      }

      // Space to continue after submission
      if (e.key === ' ' && currentAnswer.submitted) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAnswer, currentQuestion, handleSelectOption, handleSubmit, handleNext]);

  return (
    <div className="page-transition" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}>
        <div className="container flex-between">
          <div className="stack-2">
            <ProgressBar
              value={answeredCount}
              max={totalQuestions}
              showLabel
            />
          </div>

          <div className="row-4">
            <Link
              href="/summary"
              className="body-small"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              End session
            </Link>
            <ReadinessMeter score={readinessScore} size="medium" animate />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-10) var(--space-6)' }}>
        <div className="stack-8" style={{ width: '100%', maxWidth: 'var(--max-width-2xl)' }}>
          {/* Question */}
          <div className="stack-4 animate-fade-in-up">
            <span className="caption" style={{ textAlign: 'center' }}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <h1 className="heading-3 text-center">{currentQuestion.prompt}</h1>
          </div>

          {/* Options */}
          <div className="stack-3 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            {currentQuestion.choices?.map((choice, index) => {
              let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';

              if (currentAnswer.submitted) {
                if (index === currentQuestion.correctIndex) {
                  state = 'correct';
                } else if (index === currentAnswer.selectedIndex) {
                  state = 'incorrect';
                }
              } else if (index === currentAnswer.selectedIndex) {
                state = 'selected';
              }

              return (
                <OptionCard
                  key={index}
                  optionLabel={String.fromCharCode(65 + index)}
                  selected={index === currentAnswer.selectedIndex}
                  state={state}
                  disabled={currentAnswer.submitted}
                  onClick={() => handleSelectOption(index)}
                >
                  {choice}
                </OptionCard>
              );
            })}
          </div>

          {/* Confidence Toggle or Feedback */}
          {!currentAnswer.submitted ? (
            <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {/* Confidence Toggle */}
              <div className="flex-center">
                <div className="toggle-group">
                  <button
                    type="button"
                    className={`toggle-item ${currentAnswer.confidenceLevel === 'not-sure' ? 'toggle-item-selected' : ''}`}
                    onClick={() => handleConfidenceChange('not-sure')}
                  >
                    Not sure
                  </button>
                  <button
                    type="button"
                    className={`toggle-item ${currentAnswer.confidenceLevel === 'confident' ? 'toggle-item-selected' : ''}`}
                    onClick={() => handleConfidenceChange('confident')}
                  >
                    Confident
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex-center">
                <Button
                  variant="primary"
                  size="large"
                  disabled={currentAnswer.selectedIndex === null}
                  onClick={handleSubmit}
                  style={{ minWidth: '200px' }}
                >
                  Submit
                </Button>
              </div>

              <p className="caption text-center">
                Press 1-4 to select, Enter to submit
              </p>
            </div>
          ) : (
            <div className="stack-6 animate-fade-in-up">
              {/* Feedback */}
              <div
                className="card"
                style={{
                  background: currentAnswer.wasCorrect ? 'var(--status-success-bg)' : 'var(--status-error-bg)',
                  borderColor: currentAnswer.wasCorrect ? 'var(--status-success-border)' : 'var(--status-error-border)',
                }}
              >
                <div className="stack-4">
                  <div className="row-3">
                    <span
                      style={{
                        color: currentAnswer.wasCorrect ? 'var(--status-success)' : 'var(--status-error)',
                        fontSize: 'var(--text-xl)',
                      }}
                    >
                      {currentAnswer.wasCorrect ? '✓' : '✗'}
                    </span>
                    <span className="heading-4" style={{ color: currentAnswer.wasCorrect ? 'var(--status-success)' : 'var(--status-error)' }}>
                      {currentAnswer.wasCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="body-base" style={{ color: 'var(--text-secondary)' }}>
                    {currentQuestion.explanation}
                  </p>

                  {/* Sources toggle */}
                  {currentQuestion.sources.length > 0 && (
                    <div className="stack-2">
                      <button
                        type="button"
                        className="row-2 body-small"
                        style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={() => setShowSources(!showSources)}
                      >
                        {showSources ? '▼' : '▶'} Sources ({currentQuestion.sources.length})
                      </button>
                      {showSources && (
                        <div className="stack-1" style={{ paddingLeft: 'var(--space-4)' }}>
                          {currentQuestion.sources.map((source, i) => (
                            <a
                              key={i}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="body-small"
                              style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
                            >
                              {source.title} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="row-4" style={{ justifyContent: 'center' }}>
                {!currentAnswer.wasCorrect && (
                  <Link href="/teach" style={{ textDecoration: 'none' }}>
                    <Button variant="secondary">
                      Teach me this
                    </Button>
                  </Link>
                )}
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleNext}
                  rightIcon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                >
                  {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Summary'}
                </Button>
              </div>

              <p className="caption text-center">
                Press Space to continue
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
