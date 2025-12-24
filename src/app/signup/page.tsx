'use client';

import { AuthScreen } from '@/components/screens/AuthScreen';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
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
        mode='signup'
        onSubmit={(email, password, name) => router.push('/dashboard')}
        onSwitchMode={() => router.push('/login')}
        onBack={() => router.push('/')}
      />
    </>
  );
}
