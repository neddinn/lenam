'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { DrillScreen } from '@/components/screens/DrillScreen';
import { Suspense } from 'react';

function DrillContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get('topic') || 'React';
  const goal = searchParams.get('goal') || 'interview';

  return (
    <DrillScreen
      topic={topic}
      goal={goal as 'interview' | 'build' | 'concept'}
      onComplete={(results) => {
        // Store results temporarily?
        // For now, redirect to dashboard as a "finish"
        router.push('/dashboard');
      }}
      onTeachMe={(question) => {
        sessionStorage.setItem('teachQuestion', JSON.stringify(question));
        router.push('/teach');
      }}
    />
  );
}

export default function DrillPage() {
  return (
    <Suspense
      fallback={<div className='p-12 text-center'>Loading drill...</div>}
    >
      <DrillContent />
    </Suspense>
  );
}
