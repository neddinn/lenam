'use client';

import { useRouter } from 'next/navigation';
import { MarketingPage } from '@/components/marketing/MarketingPage';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className='animated-mesh-bg' />
      <div className='mesh-overlay' />
      <MarketingPage
        onLogin={() => router.push('/login')}
        onSignup={() => router.push('/signup')}
        onGetStarted={() => router.push('/signup')}
      />
    </>
  );
}
