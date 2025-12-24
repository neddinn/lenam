'use client';

import { SetupScreen } from '@/components/screens/SetupScreen';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();

  return (
    <SetupScreen
      onStartDrill={(topic, goal) => {
        const params = new URLSearchParams();
        params.set('topic', topic);
        params.set('goal', goal);
        router.push(`/drill?${params.toString()}`);
      }}
    />
  );
}
