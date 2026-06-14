import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    hint?: string;
  }
>(({ className, label, error, hint, id, ...props }, ref) => {
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
      <textarea
        id={inputId}
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 text-base text-ink-900 bg-white border rounded-button transition resize-y min-h-[100px]',
          'placeholder:text-ink-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          error ? 'border-red-500' : 'border-ink-300',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-sm text-ink-500">{hint}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
