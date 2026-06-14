import type { Metadata } from 'next';
import { Inter, Noto_Sans_TC, Sora } from 'next/font/google';
import { ToastProvider } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-tc',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Connections — 台灣跨境商務人脈 AI 配對',
  description:
    'AI 為你配對最值得認識的台灣/亞洲跨境商務人脈。告別 LinkedIn spam 邀請，告別無效社交。',
  keywords: ['人脈', '商務社交', '跨境', '台灣', 'AI 配對', '創業', 'B2B'],
  authors: [{ name: 'Connections' }],
  openGraph: {
    title: 'Connections — 台灣跨境商務人脈 AI 配對',
    description: 'AI 為你配對最值得認識的台灣/亞洲跨境商務人脈。',
    type: 'website',
    locale: 'zh_TW',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${inter.variable} ${notoTC.variable} ${sora.variable}`}
    >
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
