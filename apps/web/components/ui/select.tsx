'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
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
        <select
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 text-base text-ink-900 bg-white border rounded-button transition',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error ? 'border-red-500' : 'border-ink-300',
            className
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
