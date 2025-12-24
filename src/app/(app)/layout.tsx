'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useRouter, usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract screen name from path (e.g., "/dashboard" -> "dashboard")
  const currentScreen = pathname?.split('/').filter(Boolean)[0] || 'dashboard';

  return (
    <AppShell
      currentScreen={currentScreen}
      userName='Engineer' // Mock for now
      onNavigate={(screen) => router.push(`/${screen}`)}
      onLogout={() => router.push('/')}
    >
      {children}
    </AppShell>
  );
}
