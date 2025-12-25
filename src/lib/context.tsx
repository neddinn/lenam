'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  backgroundTags: string[];
  level: 'junior' | 'mid' | 'senior';
  createdAt: string;
}

export interface Preset {
  id: string;
  topicId: string;
  topicName: string;
  goal: 'interview' | 'build' | 'concept';
  readinessScore: number;
  lastAttempted?: string;
  questionsAttempted: number;
  correctAnswers: number;
}

export interface DrillSession {
  id: string;
  presetId: string;
  topic: string;
  goal: string;
  questionsAnswered: number;
  correctAnswers: number;
  readinessScore: number;
  startedAt: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;

  // Onboarding
  hasCompletedOnboarding: boolean;

  // Session
  currentSession: DrillSession | null;

  // Presets (saved topics)
  presets: Preset[];

  // UI State
  isSidebarOpen: boolean;
  soundEnabled: boolean;
}

interface AppContextValue extends AppState {
  // Auth actions
  login: (email: string) => void;
  logout: () => void;

  // Onboarding
  completeOnboarding: (
    tags: string[],
    level: 'junior' | 'mid' | 'senior',
  ) => void;

  // Session
  startSession: (topic: string, goal: string) => void;
  endSession: (score: number, correct: number, total: number) => void;

  // Presets
  savePreset: (preset: Omit<Preset, 'id'>) => void;
  updatePresetScore: (presetId: string, score: number) => void;

  // UI
  toggleSidebar: () => void;
  toggleSound: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// Default demo user
const DEMO_USER: User = {
  id: 'demo-user-1',
  email: 'demo@lenam.dev',
  name: 'Demo User',
  backgroundTags: ['react', 'typescript', 'node'],
  level: 'mid',
  createdAt: '2024-01-01',
};

// Default presets
const DEFAULT_PRESETS: Preset[] = [
  {
    id: '1',
    topicId: 'react-hooks',
    topicName: 'React Hooks',
    goal: 'interview',
    readinessScore: 78,
    lastAttempted: '2024-01-20',
    questionsAttempted: 25,
    correctAnswers: 20,
  },
  {
    id: '2',
    topicId: 'system-design',
    topicName: 'System Design Basics',
    goal: 'interview',
    readinessScore: 65,
    lastAttempted: '2024-01-19',
    questionsAttempted: 15,
    correctAnswers: 10,
  },
  {
    id: '3',
    topicId: 'typescript',
    topicName: 'TypeScript Advanced',
    goal: 'build',
    readinessScore: 88,
    lastAttempted: '2024-01-18',
    questionsAttempted: 30,
    correctAnswers: 27,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    user: null,
    hasCompletedOnboarding: false,
    currentSession: null,
    presets: [],
    isSidebarOpen: true,
    soundEnabled: false,
  });

  const login = useCallback((email: string) => {
    // Simulate login - in real app, this would call API
    const user = { ...DEMO_USER, email };
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      user,
      hasCompletedOnboarding: true, // Demo user has completed onboarding
      presets: DEFAULT_PRESETS,
    }));
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      user: null,
      currentSession: null,
      presets: [],
    }));
  }, []);

  const completeOnboarding = useCallback(
    (tags: string[], level: 'junior' | 'mid' | 'senior') => {
      setState((prev) => ({
        ...prev,
        hasCompletedOnboarding: true,
        user: prev.user ? { ...prev.user, backgroundTags: tags, level } : null,
      }));
    },
    [],
  );

  const startSession = useCallback((topic: string, goal: string) => {
    const session: DrillSession = {
      id: Date.now().toString(),
      presetId: topic.toLowerCase().replace(/\s/g, '-'),
      topic,
      goal,
      questionsAnswered: 0,
      correctAnswers: 0,
      readinessScore: 0,
      startedAt: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, currentSession: session }));
  }, []);

  const endSession = useCallback(
    (score: number, correct: number, total: number) => {
      setState((prev) => {
        if (!prev.currentSession) return prev;

        // Update or create preset
        const existingPresetIndex = prev.presets.findIndex(
          (p) => p.topicId === prev.currentSession!.presetId,
        );

        const newPresets = [...prev.presets];
        if (existingPresetIndex >= 0) {
          newPresets[existingPresetIndex] = {
            ...newPresets[existingPresetIndex],
            readinessScore: score,
            lastAttempted: new Date().toISOString().split('T')[0],
            questionsAttempted:
              newPresets[existingPresetIndex].questionsAttempted + total,
            correctAnswers:
              newPresets[existingPresetIndex].correctAnswers + correct,
          };
        } else {
          newPresets.push({
            id: prev.currentSession.presetId,
            topicId: prev.currentSession.presetId,
            topicName: prev.currentSession.topic,
            goal: prev.currentSession.goal as 'interview' | 'build' | 'concept',
            readinessScore: score,
            lastAttempted: new Date().toISOString().split('T')[0],
            questionsAttempted: total,
            correctAnswers: correct,
          });
        }

        return {
          ...prev,
          currentSession: null,
          presets: newPresets,
        };
      });
    },
    [],
  );

  const savePreset = useCallback((preset: Omit<Preset, 'id'>) => {
    setState((prev) => ({
      ...prev,
      presets: [...prev.presets, { ...preset, id: Date.now().toString() }],
    }));
  }, []);

  const updatePresetScore = useCallback((presetId: string, score: number) => {
    setState((prev) => ({
      ...prev,
      presets: prev.presets.map((p) =>
        p.id === presetId ? { ...p, readinessScore: score } : p,
      ),
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const value: AppContextValue = {
    ...state,
    login,
    logout,
    completeOnboarding,
    startSession,
    endSession,
    savePreset,
    updatePresetScore,
    toggleSidebar,
    toggleSound,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Convenience hooks
export function useAuth() {
  const { isAuthenticated, user, login, logout } = useApp();
  return { isAuthenticated, user, login, logout };
}

export function usePresets() {
  const { presets, savePreset, updatePresetScore } = useApp();
  return { presets, savePreset, updatePresetScore };
}
