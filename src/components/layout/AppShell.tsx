'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, useAuth } from '@/lib/context';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  requiresAuth?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/app', label: 'Home', icon: '🏠', requiresAuth: true },
  { href: '/app/drill', label: 'Start Drill', icon: '⚡', requiresAuth: true },
  { href: '/app/library', label: 'Library', icon: '📚', requiresAuth: true },
  { href: '/app/progress', label: 'Progress', icon: '📈', requiresAuth: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { isSidebarOpen, toggleSidebar, soundEnabled, toggleSound } = useApp();

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-bg-charcoal border-r border-white/5
          transition-transform duration-300 ease-out
          w-64 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className='p-6 border-b border-white/5'>
          <Link href='/app' className='flex items-center gap-3'>
            <span className='text-2xl'>⚡</span>
            <span className='text-xl font-bold text-text-primary'>Lenam</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-1'>
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                      : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'
                  }
                `}
              >
                <span className='text-lg'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings section */}
        <div className='p-4 border-t border-white/5'>
          <button
            onClick={toggleSound}
            className='flex items-center justify-between w-full px-4 py-3 rounded-xl text-text-secondary hover:bg-bg-surface transition-colors'
          >
            <span className='flex items-center gap-3'>
              <span>{soundEnabled ? '🔊' : '🔇'}</span>
              <span className='text-sm'>Sound</span>
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${soundEnabled ? 'bg-neon-green/20 text-neon-green' : 'bg-bg-surface text-text-muted'}`}
            >
              {soundEnabled ? 'On' : 'Off'}
            </span>
          </button>
        </div>

        {/* User profile */}
        <div className='p-4 border-t border-white/5'>
          <div className='flex items-center gap-3 px-4 py-3'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-cool-blue to-neon-green flex items-center justify-center text-bg-obsidian font-bold'>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-text-primary truncate'>
                {user?.name || 'User'}
              </p>
              <p className='text-xs text-text-muted truncate'>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className='w-full mt-2 px-4 py-2 text-sm text-text-muted hover:text-electric-red transition-colors text-left'
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

export function AppHeader() {
  const { toggleSidebar } = useApp();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className='fixed top-0 right-0 left-0 lg:left-64 h-16 bg-bg-obsidian/80 backdrop-blur-md border-b border-white/5 z-30 flex items-center px-4 lg:px-6'>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden p-2 rounded-lg hover:bg-bg-surface transition-colors mr-4'
        aria-label='Toggle menu'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M3 12h18M3 6h18M3 18h18' />
        </svg>
      </button>

      {/* Breadcrumb or page title would go here */}
      <div className='flex-1' />

      {/* Quick actions */}
      <div className='flex items-center gap-2'>
        <Link href='/app/drill' className='btn btn-primary text-sm'>
          <span className='hidden sm:inline'>Quick Drill</span>
          <span className='sm:hidden'>⚡</span>
        </Link>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className='min-h-screen bg-bg-obsidian'>
      <AppSidebar />
      <AppHeader />
      <main className='lg:ml-64 pt-16 min-h-screen'>{children}</main>
    </div>
  );
}
