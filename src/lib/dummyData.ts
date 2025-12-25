import { Question, SkillNode, UserProgress } from './types';

// Dummy Questions for React Hooks drill
export const dummyQuestions: Question[] = [
  {
    id: 'q1',
    text: "Describe the primary purpose of React's useEffect hook.",
    type: 'multiple_choice',
    options: [
      'To manage component state',
      'To perform side effects in function components',
      'To memoize expensive calculations',
      'To create reusable event handlers',
    ],
    correctAnswer: 'To perform side effects in function components',
    explanation:
      'useEffect is designed to handle side effects such as data fetching, subscriptions, and manual DOM mutations in function components.',
    conceptExplanation:
      'Side effects are operations that affect something outside the scope of the function being executed. In React, this includes things like:\n\n• API calls and data fetching\n• Setting up subscriptions or timers\n• Manually modifying the DOM\n• Logging analytics events\n\nThe useEffect hook runs after the component renders, keeping the rendering phase pure and predictable.',
    codeExample: `// Example: Fetching data with useEffect
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after component mounts
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();

    // Cleanup function (optional)
    return () => {
      // Cancel pending requests, cleanup subscriptions
    };
  }, [userId]); // Dependency array

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
    interviewTip:
      "When discussing useEffect in interviews, always mention the dependency array and cleanup functions. These are common areas where bugs occur and interviewers love to explore your understanding of React's lifecycle.",
    bridgeNote:
      'As a Go developer, think of useEffect like a deferred function that runs after the main execution, similar to defer statements but with the additional power of watching dependencies.',
  },
  {
    id: 'q2',
    text: 'What is the correct dependency array for a useEffect that should only run on component mount?',
    type: 'multiple_choice',
    options: ['No dependency array', '[]', '[true]', 'undefined'],
    correctAnswer: '[]',
    explanation:
      'An empty dependency array [] tells React to only run the effect once when the component mounts, and run the cleanup (if any) when it unmounts.',
    conceptExplanation:
      'The dependency array controls when your effect re-runs:\n\n• **No array**: Effect runs after every render\n• **Empty array []**: Effect runs only on mount (and cleanup on unmount)\n• **With dependencies [a, b]**: Effect runs when a or b changes\n\nThis is crucial for performance optimization and preventing infinite loops.',
    codeExample: `// Mount only effect
useEffect(() => {
  console.log('Component mounted!');

  return () => {
    console.log('Component will unmount!');
  };
}, []); // Empty array = mount only

// Effect that runs on dependency change
useEffect(() => {
  console.log('searchTerm changed:', searchTerm);
  // Debounce search or fetch results
}, [searchTerm]);

// Effect that runs every render (usually a mistake)
useEffect(() => {
  console.log('Every render!'); // ⚠️ Be careful
});`,
    interviewTip:
      'A common interview gotcha: forgetting the dependency array causes effects to run on every render, potentially causing performance issues or infinite loops.',
  },
  {
    id: 'q3',
    text: 'What does useState return?',
    type: 'multiple_choice',
    options: [
      'Just the current state value',
      'An object with state and setState',
      'A tuple of [state, setState]',
      'A promise that resolves to the state',
    ],
    correctAnswer: 'A tuple of [state, setState]',
    explanation:
      'useState returns an array with exactly two elements: the current state value and a function to update it. This pattern allows for easy destructuring.',
    conceptExplanation:
      "The tuple design was intentional:\n\n• Allows naming freedom through destructuring\n• Follows React's philosophy of explicit updates\n• Works well with TypeScript inference\n\nThe setter function can accept either:\n1. A new value directly\n2. A function that receives previous state",
    codeExample: `// Basic usage
const [count, setCount] = useState(0);

// Update with new value
setCount(5);

// Update based on previous state (recommended for derived updates)
setCount(prevCount => prevCount + 1);

// With objects (remember to spread!)
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Alice' }));

// Lazy initialization for expensive operations
const [data, setData] = useState(() => {
  return expensiveComputation();
});`,
    interviewTip:
      'Always use the functional form of setState when the new state depends on the previous state. This prevents stale closure bugs.',
  },
  {
    id: 'q4',
    text: 'When would you use useMemo over useCallback?',
    type: 'multiple_choice',
    options: [
      'When memoizing a function reference',
      'When memoizing an expensive computed value',
      'When handling DOM events',
      'When managing form state',
    ],
    correctAnswer: 'When memoizing an expensive computed value',
    explanation:
      'useMemo is for memoizing computed values to avoid expensive recalculations. useCallback is for memoizing function references to prevent unnecessary re-renders of child components.',
    conceptExplanation:
      'Both are optimization hooks, but serve different purposes:\n\n**useMemo**: Caches a value\n• Use for expensive calculations\n• Returns the memoized value\n\n**useCallback**: Caches a function\n• Use to maintain referential equality\n• Returns the memoized function\n• Especially useful with memo() children',
    codeExample: `// useMemo - memoize expensive computation
const expensiveResult = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// useCallback - memoize function reference
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Common pattern: memo + useCallback
const MemoChild = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  // Without useCallback, MemoChild re-renders every time
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <MemoChild onClick={handleClick} />;
}`,
    interviewTip:
      "Don't over-optimize! Only use useMemo/useCallback when you have measured a performance problem. Premature optimization adds complexity.",
  },
  {
    id: 'q5',
    text: 'What is the purpose of the useRef hook?',
    type: 'multiple_choice',
    options: [
      'To trigger re-renders when data changes',
      'To persist mutable values across renders without causing re-renders',
      'To share state between components',
      'To perform side effects',
    ],
    correctAnswer:
      'To persist mutable values across renders without causing re-renders',
    explanation:
      "useRef creates a mutable reference that persists across renders. Unlike state, changing a ref does not trigger a re-render, making it perfect for storing values that shouldn't affect the UI directly.",
    conceptExplanation:
      "useRef has two main use cases:\n\n1. **Accessing DOM elements**\n   - Store direct references to DOM nodes\n   - Essential for focus management, animations, measurements\n\n2. **Storing mutable values**\n   - Previous state values\n   - Timers and intervals\n   - Any value that shouldn't trigger re-renders",
    codeExample: `// DOM reference
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return <input ref={inputRef} />;
}

// Mutable value (timer ID)
function Timer() {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
}

// Previous value pattern
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current; // Returns value from previous render
}`,
    interviewTip:
      'A key distinction: refs are synchronous and mutable, while state updates are asynchronous and immutable. Know when to use each!',
  },
];

// Dummy skill nodes for the library
export const dummySkillNodes: SkillNode[] = [
  {
    id: 'react-hooks',
    name: 'React Hooks',
    readinessScore: 85,
    lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'mastered',
    relatedTopics: ['react-state', 'react-effects', 'react-context'],
    questionsAnswered: 45,
    totalQuestions: 50,
  },
  {
    id: 'react-state',
    name: 'State Management',
    readinessScore: 72,
    lastPracticed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'active',
    relatedTopics: ['react-hooks', 'redux', 'context-api'],
    questionsAnswered: 28,
    totalQuestions: 40,
  },
  {
    id: 'typescript-generics',
    name: 'TypeScript Generics',
    readinessScore: 45,
    lastPracticed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    status: 'decaying',
    relatedTopics: ['typescript-basics', 'typescript-advanced'],
    questionsAnswered: 15,
    totalQuestions: 35,
  },
  {
    id: 'system-design',
    name: 'System Design',
    readinessScore: 0,
    lastPracticed: new Date(),
    status: 'unexplored',
    relatedTopics: ['distributed-systems', 'scalability', 'databases'],
    questionsAnswered: 0,
    totalQuestions: 60,
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    readinessScore: 68,
    lastPracticed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'active',
    relatedTopics: ['data-structures', 'complexity', 'sorting'],
    questionsAnswered: 38,
    totalQuestions: 55,
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    readinessScore: 78,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'mastered',
    relatedTopics: ['algorithms', 'trees', 'graphs'],
    questionsAnswered: 42,
    totalQuestions: 50,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    readinessScore: 52,
    lastPracticed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: 'decaying',
    relatedTopics: ['javascript', 'async', 'express'],
    questionsAnswered: 22,
    totalQuestions: 45,
  },
  {
    id: 'css-layout',
    name: 'CSS Layout',
    readinessScore: 91,
    lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'mastered',
    relatedTopics: ['flexbox', 'grid', 'responsive'],
    questionsAnswered: 48,
    totalQuestions: 50,
  },
  {
    id: 'aws-services',
    name: 'AWS Services',
    readinessScore: 0,
    lastPracticed: new Date(),
    status: 'unexplored',
    relatedTopics: ['cloud', 'lambda', 's3', 'ec2'],
    questionsAnswered: 0,
    totalQuestions: 70,
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    readinessScore: 35,
    lastPracticed: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    status: 'decaying',
    relatedTopics: ['api-design', 'rest', 'apollo'],
    questionsAnswered: 12,
    totalQuestions: 40,
  },
  {
    id: 'testing',
    name: 'Testing',
    readinessScore: 62,
    lastPracticed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'active',
    relatedTopics: ['jest', 'react-testing', 'tdd'],
    questionsAnswered: 25,
    totalQuestions: 40,
  },
  {
    id: 'docker',
    name: 'Docker',
    readinessScore: 0,
    lastPracticed: new Date(),
    status: 'unexplored',
    relatedTopics: ['containers', 'kubernetes', 'devops'],
    questionsAnswered: 0,
    totalQuestions: 35,
  },
];

// Dummy user progress
export const dummyUserProgress: UserProgress = {
  totalScore: 78,
  currentStreak: 5,
  topicsExplored: 8,
  skillNodes: dummySkillNodes,
};

// Topic suggestions for setup
export const topicSuggestions = [
  { id: 'react', name: 'React', icon: '⚛️' },
  { id: 'typescript', name: 'TypeScript', icon: '📘' },
  { id: 'node', name: 'Node.js', icon: '🟢' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'aws', name: 'AWS', icon: '☁️' },
  { id: 'system-design', name: 'System Design', icon: '🏗️' },
  { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
  { id: 'sql', name: 'SQL', icon: '🗄️' },
];
