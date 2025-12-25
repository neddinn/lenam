'use client';

import { AuthScreen } from '@/components/screens/AuthScreen';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg-obsidian)',
          zIndex: 0,
        }}
      />
      <AuthScreen
        mode='login'
        onSubmit={(email, password) => router.push('/dashboard')}
        onSwitchMode={() => router.push('/signup')}
        onBack={() => router.push('/')}
      />
    </>
  );
}
