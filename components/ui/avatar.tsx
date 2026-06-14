import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt = '', fallback, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };

  const initial = (fallback ?? alt ?? '?')[0]?.toUpperCase() ?? '?';

  return (
    <div
      className={cn(
        'rounded-2xl bg-hero-gradient flex items-center justify-center text-white font-display font-bold flex-shrink-0 overflow-hidden',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}
