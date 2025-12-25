'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeachMeScreen } from '@/components/screens/TeachMeScreen';
import { Question } from '@/lib/types';

export default function TeachPage() {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // Wrap in async to avoid synchronous state update warning
    const loadQuestion = async () => {
      try {
        const stored = sessionStorage.getItem('teachQuestion');
        if (stored) {
          setQuestion(JSON.parse(stored));
        } else {
          // Fallback if no question found
          router.replace('/dashboard');
        }
      } catch (e) {
        console.error('Failed to load teach question', e);
        router.replace('/dashboard');
      }
    };

    loadQuestion();
  }, [router]);

  if (!question) {
    return (
      <div className='flex items-center justify-center min-h-screen text-slate-500'>
        Loading...
      </div>
    );
  }

  return <TeachMeScreen question={question} onComplete={() => router.back()} />;
}
