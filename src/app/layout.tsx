import type { Metadata, Viewport } from 'next';

import { Navbar } from '@/components/Navbar';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Await · 技术展示站',
    template: '%s | Await',
  },
  description: '专注 AI 工作流、.NET 工具、自托管平台与网络自动化。',
};

export const viewport: Viewport = {
  themeColor: '#f8fafc',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen">
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-slate-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
          >
            跳到主要内容
          </a>
          <Navbar />
          <main id="main-content" className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
            {children}
          </main>
          <footer className="mx-auto max-w-6xl px-6 pb-10 pt-2 text-sm text-slate-500 sm:px-8">
            Await-d · 持续构建 AI 工作流、工程工具、自托管平台与公开项目。
          </footer>
        </div>
      </body>
    </html>
  );
}
