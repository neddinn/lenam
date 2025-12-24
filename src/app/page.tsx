'use client';

import { useState } from 'react';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { SetupScreen } from '@/components/screens/SetupScreen';
import { DrillScreen } from '@/components/screens/DrillScreen';
import { TeachMeScreen } from '@/components/screens/TeachMeScreen';
import { SummaryScreen } from '@/components/screens/SummaryScreen';
import { LibraryScreen } from '@/components/screens/LibraryScreen';
import { AppScreen, Question } from '@/lib/types';

interface DrillResult {
  question: Question;
  userAnswer: string;
  confidence: number;
  isCorrect: boolean;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [topic, setTopic] = useState('React Hooks');
  const [goal, setGoal] = useState<'interview' | 'build' | 'concept'>(
    'interview',
  );
  const [teachQuestion, setTeachQuestion] = useState<Question | null>(null);
  const [drillResults, setDrillResults] = useState<DrillResult[]>([]);

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

  const handleLibraryStartDrill = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setCurrentScreen('drill');
  };

  return (
    <>
      {/* Animated Background */}
      <div className='animated-mesh-bg' />
      <div className='mesh-overlay' />

      {/* Screen Router */}
      {currentScreen === 'landing' && (
        <LandingScreen
          onStartDrill={() => setCurrentScreen('setup')}
          onGoToLibrary={() => setCurrentScreen('library')}
        />
      )}

      {currentScreen === 'setup' && (
        <SetupScreen
          onStartDrill={handleStartDrill}
          onBack={() => setCurrentScreen('landing')}
        />
      )}

      {currentScreen === 'drill' && (
        <DrillScreen
          topic={topic}
          goal={goal}
          onComplete={handleDrillComplete}
          onTeachMe={handleTeachMe}
        />
      )}

      {currentScreen === 'teach' && teachQuestion && (
        <TeachMeScreen
          question={teachQuestion}
          onComplete={handleTeachComplete}
        />
      )}

      {currentScreen === 'summary' && (
        <SummaryScreen
          topic={topic}
          results={drillResults}
          previousScore={65}
          onContinue={handleSummaryContinue}
        />
      )}

      {currentScreen === 'library' && (
        <LibraryScreen
          onStartDrill={handleLibraryStartDrill}
          onBack={() => setCurrentScreen('landing')}
        />
      )}
    </>
  );
}
