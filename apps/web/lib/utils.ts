import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合併 className — shadcn/ui 標準 cn helper
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期為台灣在地化字串
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * 計算 AI 配對分數的可讀等級
 */
export function scoreToTier(score: number): {
  label: string;
  color: string;
} {
  if (score >= 0.85) return { label: '極高契合', color: 'text-green-600 bg-green-50' };
  if (score >= 0.70) return { label: '高契合', color: 'text-primary-600 bg-primary-50' };
  if (score >= 0.55) return { label: '中等契合', color: 'text-accent-600 bg-accent-50' };
  return { label: '低契合', color: 'text-ink-500 bg-ink-50' };
}
