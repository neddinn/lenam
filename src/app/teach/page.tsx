'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ToggleGroup from '@/components/ToggleGroup';
import OptionCard from '@/components/OptionCard';
import { sampleTeachMeContent } from '@/lib/dummy-data';

type Goal = 'interview' | 'build' | 'concept';
type Depth = 'skim' | 'solid';

export default function TeachMePage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>('interview');
  const [depth, setDepth] = useState<Depth>('solid');
  const [showBridgeNote, setShowBridgeNote] = useState(true);
  const [showSteering, setShowSteering] = useState(false);
  const [microQuizAnswer, setMicroQuizAnswer] = useState<number | null>(null);
  const [showMicroQuizResult, setShowMicroQuizResult] = useState(false);

  const content = sampleTeachMeContent;
  const microQuiz = content.microQuiz[0];

  const handleBackToDrill = () => {
    router.push('/drill');
  };

  const handleMicroQuizSubmit = () => {
    if (microQuizAnswer === null) return;
    setShowMicroQuizResult(true);
  };

  const goalOptions = [
    { value: 'interview' as Goal, label: 'Interview' },
    { value: 'build' as Goal, label: 'Build' },
    { value: 'concept' as Goal, label: 'Concept' },
  ];

  const depthOptions = [
    { value: 'skim' as Depth, label: 'Skim' },
    { value: 'solid' as Depth, label: 'Solid' },
  ];

  return (
    <div className="min-h-screen flex flex-col page-transition">
      {/* Header */}
      <header
        className="w-full py-4 px-6 border-b sticky top-0 bg-[var(--bg-primary)] z-10"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="container flex-between">
          <button
            type="button"
            onClick={handleBackToDrill}
            className="row-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="body-small">Back to Drill</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSteering(!showSteering)}
            className={`row-2 body-small transition-colors ${
              showSteering ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.5 2.5L3 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.5 6.5L13 10L9.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Adjust Focus</span>
          </button>
        </div>
      </header>

      {/* Steering Panel */}
      {showSteering && (
        <div
          className="border-b px-6 py-4 animate-fade-in-down"
          style={{
            borderColor: 'var(--border-default)',
            background: 'var(--bg-elevated)',
          }}
        >
          <div className="container max-w-2xl stack-4">
            <div className="flex-between flex-wrap gap-4">
              <div className="stack-2">
                <label className="caption font-medium">Goal</label>
                <ToggleGroup options={goalOptions} value={goal} onChange={setGoal} size="small" />
              </div>
              <div className="stack-2">
                <label className="caption font-medium">Depth</label>
                <ToggleGroup options={depthOptions} value={depth} onChange={setDepth} size="small" />
              </div>
              <div className="stack-2">
                <label className="caption font-medium">Bridge Note</label>
                <label className="row-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBridgeNote}
                    onChange={(e) => setShowBridgeNote(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      showBridgeNote ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-sunken)]'
                    }`}
                    style={{ border: '1px solid var(--border-default)' }}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        showBridgeNote ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="container max-w-2xl stack-10">
          {/* Bridge Note */}
          {showBridgeNote && (
            <div className="bridge-note animate-fade-in-up">
              <div className="stack-2">
                <span className="body-small font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  The gap we're closing...
                </span>
                <p className="body-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {content.bridgeNote}
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <h1 className="heading-2">{content.title}</h1>
            <div className="w-full h-px bg-[var(--border-default)]" />
          </div>

          {/* Content Sections */}
          <div className="stack-10">
            {content.sections.map((section, i) => (
              <div
                key={i}
                className="stack-4 animate-fade-in-up"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                <h2 className="heading-4">{section.heading}</h2>
                <p className="body-large leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.content}
                </p>
                {section.code && (
                  <div className="code-block">
                    <pre><code>{section.code}</code></pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Points */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <h2 className="heading-4">Key Points</h2>
            <ul className="stack-3">
              {content.keyPoints.map((point, i) => (
                <li key={i} className="row-3 body-base" style={{ color: 'var(--text-secondary)' }}>
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{
                      background: 'var(--accent-primary-subtle)',
                      color: 'var(--accent-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--border-default)]" />

          {/* Micro Quiz */}
          <div className="stack-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="stack-2">
              <span className="badge badge-neutral">Quick Check</span>
              <h2 className="heading-4">{microQuiz.prompt}</h2>
            </div>

            {microQuiz.choices && (
              <div className="stack-3">
                {microQuiz.choices.map((choice, index) => {
                  let optionState: 'default' | 'correct' | 'incorrect' = 'default';

                  if (showMicroQuizResult) {
                    if (index === microQuiz.correctIndex) {
                      optionState = 'correct';
                    } else if (index === microQuizAnswer) {
                      optionState = 'incorrect';
                    }
                  }

                  return (
                    <OptionCard
                      key={index}
                      optionLabel={String.fromCharCode(65 + index)}
                      selected={microQuizAnswer === index}
                      state={optionState}
                      disabled={showMicroQuizResult}
                      onClick={() => setMicroQuizAnswer(index)}
                    >
                      {choice}
                    </OptionCard>
                  );
                })}
              </div>
            )}

            {!showMicroQuizResult ? (
              <Button
                variant="primary"
                disabled={microQuizAnswer === null}
                onClick={handleMicroQuizSubmit}
              >
                Check Answer
              </Button>
            ) : (
              <div
                className="stack-4 p-4 rounded-xl animate-fade-in"
                style={{
                  background: microQuizAnswer === microQuiz.correctIndex
                    ? 'var(--status-success-bg)'
                    : 'var(--status-error-bg)',
                  border: `1px solid ${microQuizAnswer === microQuiz.correctIndex
                    ? 'var(--status-success-border)'
                    : 'var(--status-error-border)'}`,
                }}
              >
                <p className="body-base" style={{ color: 'var(--text-secondary)' }}>
                  {microQuiz.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--border-default)]" />

          {/* Back to Drill CTA */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleBackToDrill}
            >
              Back to Drill
            </Button>
          </div>

          {/* Sources & Verification */}
          <div className="stack-4 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <div className="flex-between">
              <span className="caption">
                Verified: {content.verifiedAt.toLocaleDateString()}
              </span>
              <span className="caption">
                Sources ({content.sources.length})
              </span>
            </div>
            <div className="stack-2">
              {content.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-small text-[var(--accent-primary)] hover:underline"
                >
                  {source.title} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
