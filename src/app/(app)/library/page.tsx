'use client';

import { LibraryScreen } from '@/components/screens/LibraryScreen';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();

  return (
    <LibraryScreen
      onStartDrill={(topic) => {
        router.push(`/drill?topic=${encodeURIComponent(topic)}&goal=interview`);
      }}
    />
  );
}
