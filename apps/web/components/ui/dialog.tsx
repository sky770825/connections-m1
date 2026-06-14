'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full max-w-md bg-white rounded-card shadow-2xl p-6',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-600 transition"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h2 className="font-display text-2xl font-bold text-ink-900">{title}</h2>
        )}
        {description && (
          <p className="mt-1 text-sm text-ink-500">{description}</p>
        )}
        <div className={title || description ? 'mt-4' : ''}>{children}</div>
      </div>
    </div>
  );
}
