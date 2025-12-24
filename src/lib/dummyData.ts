import { DrillQuestion } from '@/components';
import { OrbState } from '@/components/ui/SkillOrb';

// Dummy questions for demo
export const DEMO_QUESTIONS: DrillQuestion[] = [
  {
    id: '1',
    question: 'What is the time complexity of a Hash Map lookup?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
    correctIndex: 1,
    topic: 'Data Structures',
    explanation:
      'Hash Map lookups are O(1) on average because the hash function directly computes the index where the value is stored. However, in worst case with many collisions, it can degrade to O(n).',
  },
  {
    id: '2',
    question:
      'In React, what hook should you use to perform side effects after render?',
    options: ['useState', 'useRef', 'useEffect', 'useMemo'],
    correctIndex: 2,
    topic: 'React Hooks',
    explanation:
      'useEffect is designed for side effects like data fetching, subscriptions, or manually changing the DOM after React has updated the screen.',
  },
  {
    id: '3',
    question: "What does the 'S' stand for in SOLID principles?",
    options: [
      'Single Responsibility',
      'Separation of Concerns',
      'State Management',
      'Structural Design',
    ],
    correctIndex: 0,
    topic: 'Design Principles',
    explanation:
      'Single Responsibility Principle states that a class should have only one reason to change. Each module or class should have responsibility over a single part of functionality.',
  },
  {
    id: '4',
    question:
      'Which HTTP status code indicates a successful POST request that created a resource?',
    options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
    correctIndex: 1,
    topic: 'REST APIs',
    explanation:
      '201 Created indicates that the request has been fulfilled and resulted in one or more new resources being created. It should include a Location header with the URL of the new resource.',
  },
  {
    id: '5',
    question: 'What is the purpose of a database index?',
    options: [
      'To encrypt sensitive data',
      'To speed up data retrieval operations',
      'To compress storage space',
      'To maintain referential integrity',
    ],
    correctIndex: 1,
    topic: 'Databases',
    explanation:
      'A database index is a data structure that improves the speed of data retrieval operations at the cost of additional writes and storage space. Think of it like a book index that helps you find content quickly.',
  },
];

// Teach content for questions
export const TEACH_CONTENT: Record<
  string,
  {
    concept: string;
    code?: string;
    codeLanguage?: string;
    bridgeNote?: string;
    bridgeContext?: string;
  }
> = {
  '1': {
    concept: `Hash Maps (also called Hash Tables or Dictionaries) provide O(1) average-case lookup by using a hash function to compute an index from the key.

Here's how it works:
1. When you insert a key-value pair, the hash function converts the key into an array index
2. The value is stored at that index
3. When looking up, the same hash function is applied to find the index directly

The magic is that computing a hash is constant time, and array access by index is also constant time.

However, collisions (when two keys hash to the same index) can occur. Different strategies handle this:
- Chaining: Each bucket contains a linked list
- Open Addressing: Find the next available slot

In pathological cases with many collisions, lookup can degrade to O(n).`,
    code: `// JavaScript Hash Map operations
const map = new Map();

// Insert: O(1) average
map.set('name', 'Alice');

// Lookup: O(1) average
const name = map.get('name'); // 'Alice'

// Check existence: O(1) average
map.has('name'); // true

// Delete: O(1) average
map.delete('name');`,
    codeLanguage: 'JavaScript',
    bridgeNote:
      'Think of HashMap like a Java HashMap or Python dict - they all use the same underlying hash table concept.',
    bridgeContext: 'Java',
  },
  '2': {
    concept: `useEffect is React's escape hatch for synchronizing with external systems and performing side effects.

Key concepts:
• Effects run AFTER render, not during
• Dependencies array controls when effect re-runs
• Return a cleanup function to prevent memory leaks

Common use cases:
- Fetching data from an API
- Setting up subscriptions
- Manually manipulating DOM
- Logging and analytics

The dependency array is crucial:
- [] = run once on mount
- [value] = run when 'value' changes
- No array = run after every render`,
    code: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Side effect: fetch data
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();

    // Cleanup function (optional)
    return () => {
      // Cancel pending requests, unsubscribe, etc.
    };
  }, [userId]); // Re-run when userId changes

  return <div>{user?.name}</div>;
}`,
    codeLanguage: 'React',
    bridgeNote:
      "If you're coming from class components, useEffect combines componentDidMount, componentDidUpdate, and componentWillUnmount.",
    bridgeContext: 'React Class Components',
  },
};

// Skill library data
export interface Skill {
  id: string;
  name: string;
  state: OrbState;
  score?: number;
  lastPracticed?: string;
}

export const DEMO_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Arrays',
    state: 'ready',
    score: 92,
    lastPracticed: '1 day ago',
  },
  {
    id: '2',
    name: 'Hash Maps',
    state: 'ready',
    score: 88,
    lastPracticed: '2 days ago',
  },
  {
    id: '3',
    name: 'Trees',
    state: 'progress',
    score: 65,
    lastPracticed: '3 days ago',
  },
  {
    id: '4',
    name: 'Graphs',
    state: 'progress',
    score: 45,
    lastPracticed: '4 days ago',
  },
  {
    id: '5',
    name: 'Dynamic Prog',
    state: 'decay',
    score: 72,
    lastPracticed: '10 days ago',
  },
  {
    id: '6',
    name: 'Sorting',
    state: 'ready',
    score: 95,
    lastPracticed: '1 day ago',
  },
  {
    id: '7',
    name: 'Searching',
    state: 'ready',
    score: 85,
    lastPracticed: '3 days ago',
  },
  {
    id: '8',
    name: 'Recursion',
    state: 'progress',
    score: 55,
    lastPracticed: '5 days ago',
  },
  { id: '9', name: 'Backtracking', state: 'grey' },
  { id: '10', name: 'Bit Manipulation', state: 'grey' },
  {
    id: '11',
    name: 'Linked Lists',
    state: 'ready',
    score: 90,
    lastPracticed: '2 days ago',
  },
  {
    id: '12',
    name: 'Stacks',
    state: 'ready',
    score: 88,
    lastPracticed: '2 days ago',
  },
  {
    id: '13',
    name: 'Queues',
    state: 'decay',
    score: 78,
    lastPracticed: '8 days ago',
  },
  {
    id: '14',
    name: 'Heaps',
    state: 'progress',
    score: 60,
    lastPracticed: '6 days ago',
  },
  { id: '15', name: 'Tries', state: 'grey' },
];

// Session history for summary screen
export interface SessionAttempt {
  date: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export const DEMO_SESSION_HISTORY: SessionAttempt[] = [
  { date: '2024-01-15', score: 45, questionsAnswered: 10, correctAnswers: 5 },
  { date: '2024-01-16', score: 52, questionsAnswered: 12, correctAnswers: 7 },
  { date: '2024-01-17', score: 58, questionsAnswered: 10, correctAnswers: 6 },
  { date: '2024-01-18', score: 65, questionsAnswered: 15, correctAnswers: 10 },
  { date: '2024-01-19', score: 72, questionsAnswered: 12, correctAnswers: 9 },
  { date: '2024-01-20', score: 78, questionsAnswered: 10, correctAnswers: 8 },
  { date: '2024-01-21', score: 82, questionsAnswered: 15, correctAnswers: 13 },
];
