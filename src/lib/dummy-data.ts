// Dummy data for FlashLearn UI development

export interface Topic {
  id: string;
  slug: string;
  title: string;
  domain: string;
}

export interface Preset {
  id: string;
  topic: Topic;
  goal: 'interview' | 'build' | 'concept';
  depth: 'skim' | 'solid';
  tags: string[];
  level: 'junior' | 'mid' | 'senior';
  readinessScore: number;
  lastAttempted: Date | null;
  attemptCount: number;
}

export interface QuizItem {
  id: string;
  type: 'mcq' | 'short';
  prompt: string;
  choices?: string[];
  correctIndex?: number;
  explanation: string;
  sources: Source[];
}

export interface Source {
  title: string;
  url: string;
}

export interface DrillSession {
  id: string;
  preset: Preset;
  startedAt: Date;
  questionsAnswered: number;
  correctCount: number;
  highConfidenceWrongCount: number;
  currentQuestionIndex: number;
  readinessStart: number;
  readinessCurrent: number;
}

export interface TeachMeContent {
  bridgeNote: string;
  title: string;
  sections: {
    heading: string;
    content: string;
    code?: string;
  }[];
  keyPoints: string[];
  microQuiz: QuizItem[];
  sources: Source[];
  verifiedAt: Date;
}

// Sample topics
export const topics: Topic[] = [
  {
    id: '1',
    slug: 'react-rendering',
    title: 'React Rendering',
    domain: 'Frontend',
  },
  {
    id: '2',
    slug: 'http-caching',
    title: 'HTTP Caching',
    domain: 'Web Performance',
  },
  {
    id: '3',
    slug: 'load-balancing',
    title: 'Load Balancing',
    domain: 'System Design',
  },
  {
    id: '4',
    slug: 'typescript-generics',
    title: 'TypeScript Generics',
    domain: 'TypeScript',
  },
  {
    id: '5',
    slug: 'database-indexing',
    title: 'Database Indexing',
    domain: 'Databases',
  },
  {
    id: '6',
    slug: 'oauth-flows',
    title: 'OAuth 2.0 Flows',
    domain: 'Authentication',
  },
];

// Sample background tags
export const backgroundTags: string[] = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'AWS',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'GraphQL',
];

// Sample quiz items for React Rendering topic
export const sampleQuizItems: QuizItem[] = [
  {
    id: 'q1',
    type: 'mcq',
    prompt:
      'What happens when setState is called inside a useEffect cleanup function?',
    choices: [
      'The state update is ignored',
      'The component schedules a render but React logs a warning',
      'React throws an unmount error',
      'The effect runs again immediately',
    ],
    correctIndex: 1,
    explanation:
      'When setState is called during cleanup, React permits the call but logs a warning because the component is unmounting. The state update may not have any visible effect since the component is being removed from the DOM.',
    sources: [
      {
        title: 'React Docs: useEffect Cleanup',
        url: 'https://react.dev/reference/react/useEffect#cleanup',
      },
      {
        title: 'React GitHub: State Updates During Unmount',
        url: 'https://github.com/facebook/react/issues/22847',
      },
    ],
  },
  {
    id: 'q2',
    type: 'mcq',
    prompt: 'Which statement about React.memo is correct?',
    choices: [
      'It prevents all re-renders of the wrapped component',
      'It performs a deep comparison of props by default',
      'It skips re-renders when props have not changed (shallow comparison)',
      'It automatically memoizes all child components',
    ],
    correctIndex: 2,
    explanation:
      'React.memo performs a shallow comparison of the current and previous props. If the props are the same (by reference for objects), React skips rendering the component and reuses the last rendered result.',
    sources: [
      {
        title: 'React Docs: memo',
        url: 'https://react.dev/reference/react/memo',
      },
    ],
  },
  {
    id: 'q3',
    type: 'mcq',
    prompt: 'When does React batch state updates?',
    choices: [
      'Only inside event handlers',
      'Only inside useEffect callbacks',
      'In all asynchronous callbacks in React 18+',
      'Never — each setState causes an immediate render',
    ],
    correctIndex: 2,
    explanation:
      'Starting with React 18, automatic batching applies to all updates, including those inside promises, setTimeout, native event handlers, and any other context. This improves performance by reducing unnecessary re-renders.',
    sources: [
      {
        title: 'React 18: Automatic Batching',
        url: 'https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching',
      },
    ],
  },
  {
    id: 'q4',
    type: 'mcq',
    prompt:
      'What is the purpose of the dependency array in useEffect?',
    choices: [
      'To specify which state variables the effect can modify',
      'To determine when the effect should re-run',
      'To prevent memory leaks',
      "To optimize the component's initial render",
    ],
    correctIndex: 1,
    explanation:
      'The dependency array tells React when to re-run the effect. If any value in the array changes between renders, React will re-run the effect. An empty array means the effect only runs once on mount.',
    sources: [
      {
        title: 'React Docs: Synchronizing with Effects',
        url: 'https://react.dev/learn/synchronizing-with-effects',
      },
    ],
  },
  {
    id: 'q5',
    type: 'mcq',
    prompt: 'What triggers a re-render in React?',
    choices: [
      'Only state changes',
      'State changes, prop changes, or parent re-renders',
      'Only when forceUpdate is called',
      "Whenever the browser's event loop is idle",
    ],
    correctIndex: 1,
    explanation:
      'A component re-renders when: 1) Its state changes, 2) Its props change, 3) Its parent component re-renders, or 4) The context it subscribes to changes. React then reconciles the virtual DOM to update the actual DOM efficiently.',
    sources: [
      {
        title: 'React Docs: Render and Commit',
        url: 'https://react.dev/learn/render-and-commit',
      },
    ],
  },
];

// Sample Teach Me content
export const sampleTeachMeContent: TeachMeContent = {
  bridgeNote:
    'You answered that setState in cleanup would be ignored. Actually, React permits the call but warns because the component is unmounting. Understanding cleanup timing is crucial for avoiding memory leaks.',
  title: 'Understanding Effect Cleanup',
  sections: [
    {
      heading: 'When Cleanup Runs',
      content:
        'When a component unmounts, React calls the cleanup function returned by useEffect. This is your opportunity to cancel subscriptions, clear timers, and prevent memory leaks. The cleanup function runs before the component is removed from the DOM.',
    },
    {
      heading: 'Example: Timer Cleanup',
      content:
        'A common pattern is cleaning up intervals or timeouts to prevent them from running after the component unmounts.',
      code: `function Example() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);
}`,
    },
    {
      heading: 'setState During Cleanup',
      content:
        'Calling setState during cleanup is technically allowed, but React will log a warning because the component is unmounting. The state update won\'t have any visible effect since the component is being removed. To fix this, either track the mounted state or cancel async operations in cleanup.',
      code: `function Example() {
  useEffect(() => {
    let isMounted = true;

    fetchData().then(data => {
      if (isMounted) {
        setState(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
}`,
    },
  ],
  keyPoints: [
    'Cleanup runs before the effect re-runs (if dependencies change)',
    'Cleanup runs when the component unmounts',
    'setState during cleanup logs a warning but doesn\'t throw',
    'Use flags or AbortController to prevent stale updates',
  ],
  microQuiz: [
    {
      id: 'mq1',
      type: 'mcq',
      prompt: 'When does the cleanup function from useEffect run?',
      choices: [
        'Only when the component mounts',
        'Before every re-render and on unmount',
        'Only on unmount',
        'After every render',
      ],
      correctIndex: 1,
      explanation:
        'The cleanup function runs before each effect re-execution (when dependencies change) and when the component unmounts.',
      sources: [],
    },
  ],
  sources: [
    {
      title: 'React Docs: useEffect',
      url: 'https://react.dev/reference/react/useEffect',
    },
    {
      title: 'Overreacted: A Complete Guide to useEffect',
      url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
    },
    {
      title: 'React GitHub: Cleanup Behavior',
      url: 'https://github.com/facebook/react/issues/14369',
    },
  ],
  verifiedAt: new Date('2025-12-20'),
};

// Sample presets for library
export const samplePresets: Preset[] = [
  {
    id: 'p1',
    topic: topics[0],
    goal: 'interview',
    depth: 'solid',
    tags: ['React', 'TypeScript'],
    level: 'mid',
    readinessScore: 78,
    lastAttempted: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    attemptCount: 24,
  },
  {
    id: 'p2',
    topic: topics[1],
    goal: 'build',
    depth: 'skim',
    tags: ['Node.js'],
    level: 'mid',
    readinessScore: 42,
    lastAttempted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    attemptCount: 8,
  },
  {
    id: 'p3',
    topic: topics[2],
    goal: 'interview',
    depth: 'solid',
    tags: ['AWS', 'Docker'],
    level: 'senior',
    readinessScore: 91,
    lastAttempted: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    attemptCount: 36,
  },
];

// Create a sample drill session
export function createSampleDrillSession(preset: Preset): DrillSession {
  return {
    id: `ds-${Date.now()}`,
    preset,
    startedAt: new Date(),
    questionsAnswered: 0,
    correctCount: 0,
    highConfidenceWrongCount: 0,
    currentQuestionIndex: 0,
    readinessStart: preset.readinessScore,
    readinessCurrent: preset.readinessScore,
  };
}

// Utility: format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

// Get readiness status
export function getReadinessStatus(score: number): {
  label: string;
  color: 'success' | 'warning' | 'neutral';
} {
  if (score >= 80) {
    return { label: 'Ready', color: 'success' };
  } else if (score >= 40) {
    return { label: 'Warming up', color: 'warning' };
  } else {
    return { label: 'Just started', color: 'neutral' };
  }
}
