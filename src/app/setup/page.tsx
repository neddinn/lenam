'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ToggleGroup from '@/components/ToggleGroup';
import Chip from '@/components/Chip';
import { topics, backgroundTags, Topic } from '@/lib/dummy-data';

type Goal = 'interview' | 'build' | 'concept';

export default function SetupPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [goal, setGoal] = useState<Goal>('interview');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  // Filter topics based on search
  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topics.slice(0, 4);
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleStartDrill = () => {
    if (!selectedTopic) return;
    setIsStarting(true);
    setTimeout(() => {
      router.push('/drill');
    }, 300);
  };

  const goalOptions = [
    { value: 'interview' as Goal, label: 'Interview' },
    { value: 'build' as Goal, label: 'Build' },
    { value: 'concept' as Goal, label: 'Concept' },
  ];

  return (
    <div className="page-transition" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ width: '100%', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="container flex-between">
          <Link
            href="/"
            className="row-2"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--duration-fast)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="body-small">Back</span>
          </Link>
          <span className="heading-4">FlashLearn</span>
          <div style={{ width: '60px' }} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-6)' }}>
        <div className="stack-10" style={{ width: '100%', maxWidth: 'var(--max-width-lg)' }}>
          {/* Topic Search */}
          <div className="stack-4 animate-fade-in-up">
            <label className="heading-3 text-center">
              What do you want to drill?
            </label>

            {selectedTopic ? (
              <div
                className="card flex-between"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTopic(null)}
              >
                <div className="stack-1">
                  <span className="heading-4">{selectedTopic.title}</span>
                  <span className="caption">{selectedTopic.domain}</span>
                </div>
                <div className="row-2" style={{ color: 'var(--status-success)' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="body-small" style={{ fontWeight: 500 }}>Change</span>
                </div>
              </div>
            ) : (
              <div className="stack-3">
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="input input-large"
                    style={{ paddingRight: 'var(--space-12)' }}
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <div style={{
                    position: 'absolute',
                    right: 'var(--space-4)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM17 17l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="row" style={{ flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {filteredTopics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      className="chip"
                      onClick={() => {
                        setSelectedTopic(topic);
                        setSearchQuery('');
                      }}
                    >
                      {topic.title}
                      <span style={{ opacity: 0.5, marginLeft: 'var(--space-1)' }}>·</span>
                      <span style={{ opacity: 0.5 }}>{topic.domain}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: 'var(--border-default)' }} />

          {/* Goal Selection */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <label className="body-base text-center" style={{ fontWeight: 500 }}>
              I'm preparing for...
            </label>
            <div className="flex-center">
              <ToggleGroup
                options={goalOptions}
                value={goal}
                onChange={setGoal}
              />
            </div>
          </div>

          {/* Background Tags */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label className="body-base text-center" style={{ fontWeight: 500 }}>
              My background <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
            </label>
            <div className="row" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-2)' }}>
              {backgroundTags.slice(0, 8).map((tag) => (
                <Chip
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => handleTagToggle(tag)}
                  removable
                  onRemove={() => handleTagToggle(tag)}
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: 'var(--border-default)' }} />

          {/* Actions */}
          <div className="stack-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <Button
              variant="primary"
              size="large"
              fullWidth
              disabled={!selectedTopic}
              isLoading={isStarting}
              onClick={handleStartDrill}
            >
              Start Drill (5 min)
            </Button>

            <div className="text-center">
              <Link
                href="/teach"
                className="body-small"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                or Generate Learning Page →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
