'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  user?: {
    displayName: string;
    avatarUrl?: string | null;
  } | null;
  currentPath?: string;
}

export function Navbar({ user, currentPath }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const links = user
    ? [
        { href: '/dashboard', label: '儀表板' },
        { href: '/search', label: '搜尋' },
        { href: '/connections', label: '連線' },
        { href: '/match', label: 'AI 配對' },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-ink-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-hero-gradient animate-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-900">Connections</span>
        </Link>

        {/* Desktop nav */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-button transition',
                  currentPath === l.href
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center text-white font-bold text-sm">
                {user.displayName[0]?.toUpperCase()}
              </div>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline-block text-sm font-medium text-ink-700 hover:text-ink-900">
                登入
              </Link>
              <Link href="/signup">
                <Button size="sm">免費加入</Button>
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink-600"
            aria-label="選單"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && user && (
        <div className="md:hidden border-t border-ink-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100 rounded-button"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
