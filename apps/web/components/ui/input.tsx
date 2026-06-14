import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ink-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 text-base text-ink-900 bg-white border rounded-button transition',
            'placeholder:text-ink-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-ink-50 disabled:cursor-not-allowed',
            error ? 'border-red-500' : 'border-ink-300',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-ink-500">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
