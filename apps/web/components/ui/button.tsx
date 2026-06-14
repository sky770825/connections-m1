'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-button transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-cta-gradient text-white shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:scale-[1.02] focus:ring-accent-500',
        secondary:
          'bg-white border border-ink-200 text-ink-700 hover:border-primary-300 hover:text-primary-700 focus:ring-primary-500',
        outline:
          'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'bg-transparent text-ink-700 hover:bg-ink-100 focus:ring-ink-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 h-9',
        md: 'text-sm px-4 py-2 h-10',
        lg: 'text-base px-6 py-3 h-12',
        xl: 'text-lg px-8 py-4 h-14',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
