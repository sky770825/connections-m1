import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-ink-100 text-ink-700',
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
