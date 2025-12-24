'use client';

import { useState } from 'react';
import { MarketingPage } from '@/components/marketing/MarketingPage';
import { AuthScreen } from '@/components/screens/AuthScreen';
import { SetupScreen } from '@/components/screens/SetupScreen';
import { DrillScreen } from '@/components/screens/DrillScreen';
import { TeachMeScreen } from '@/components/screens/TeachMeScreen';
import { SummaryScreen } from '@/components/screens/SummaryScreen';
import { LibraryScreen } from '@/components/screens/LibraryScreen';
import { AppScreen, Question, DrillResult } from '@/lib/types';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('marketing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [topic, setTopic] = useState('React Hooks');
  const [goal, setGoal] = useState<'interview' | 'build' | 'concept'>(
    'interview',
  );
  const [teachQuestion, setTeachQuestion] = useState<Question | null>(null);
  const [drillResults, setDrillResults] = useState<DrillResult[]>([]);

  // Auth handlers
  const handleLogin = () => {
    setAuthMode('login');
    setCurrentScreen('login');
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setCurrentScreen('signup');
  };

  const handleAuthSubmit = (email: string, password: string) => {
    // In real app, would authenticate here
    console.log('Auth:', email);
    setCurrentScreen('setup');
  };

  // App flow handlers
  const handleStartDrill = (
    selectedTopic?: string,
    selectedGoal?: 'interview' | 'build' | 'concept',
  ) => {
    if (selectedTopic) setTopic(selectedTopic);
    if (selectedGoal) setGoal(selectedGoal);
    setCurrentScreen('drill');
  };

  const handleTeachMe = (question: Question) => {
    setTeachQuestion(question);
    setCurrentScreen('teach');
  };

  const handleTeachComplete = () => {
    setTeachQuestion(null);
    setCurrentScreen('drill');
  };

  const handleDrillComplete = (results: DrillResult[]) => {
    setDrillResults(results);
    setCurrentScreen('summary');
  };

  const handleSummaryContinue = (action: 'redrill' | 'explore' | 'library') => {
    switch (action) {
      case 'redrill':
        setCurrentScreen('drill');
        break;
      case 'explore':
        setCurrentScreen('setup');
        break;
      case 'library':
        setCurrentScreen('library');
        break;
    }
  };

  return (
    <>
      {/* Subtle Animated Background - only on marketing */}
      {currentScreen === 'marketing' && (
        <>
          <div className='animated-mesh-bg' />
          <div className='mesh-overlay' />
        </>
      )}

      {/* App Background for auth and app screens */}
      {currentScreen !== 'marketing' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-obsidian)',
            zIndex: 0,
          }}
        />
      )}

      {/* Marketing Landing */}
      {currentScreen === 'marketing' && (
        <MarketingPage
          onLogin={handleLogin}
          onSignup={handleSignup}
          onGetStarted={handleSignup}
        />
      )}

      {/* Auth Screens */}
      {(currentScreen === 'login' || currentScreen === 'signup') && (
        <AuthScreen
          mode={authMode}
          onSubmit={handleAuthSubmit}
          onSwitchMode={() =>
            setAuthMode(authMode === 'login' ? 'signup' : 'login')
          }
          onBack={() => setCurrentScreen('marketing')}
        />
      )}

      {/* Setup Screen */}
      {currentScreen === 'setup' && (
        <SetupScreen
          onStartDrill={handleStartDrill}
          onBack={() => setCurrentScreen('library')}
        />
      )}

      {/* Drill Screen */}
      {currentScreen === 'drill' && (
        <DrillScreen
          topic={topic}
          goal={goal}
          onComplete={handleDrillComplete}
          onTeachMe={handleTeachMe}
        />
      )}

      {/* Teach Me Screen */}
      {currentScreen === 'teach' && teachQuestion && (
        <TeachMeScreen
          question={teachQuestion}
          onComplete={handleTeachComplete}
        />
      )}

      {/* Summary Screen */}
      {currentScreen === 'summary' && (
        <SummaryScreen
          topic={topic}
          results={drillResults}
          previousScore={65}
          onContinue={handleSummaryContinue}
        />
      )}

      {/* Library Screen */}
      {currentScreen === 'library' && (
        <LibraryScreen
          onStartDrill={(selectedTopic) => {
            setTopic(selectedTopic);
            setCurrentScreen('drill');
          }}
          onBack={() => setCurrentScreen('setup')}
        />
      )}
    </>
  );
}
