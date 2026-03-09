'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/', label: '首页' },
  { href: '/profile', label: '资料' },
  { href: '/projects', label: '项目' },
  { href: '/repos', label: '仓库' },
  { href: '/editor', label: '编辑器' },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl text-sm font-semibold tracking-[0.22em] text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-100"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 font-mono text-xs text-sky-100">
            AW
          </span>
          <span className="font-mono uppercase text-slate-600">Await-d</span>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm text-slate-600 shadow-sm">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'hover:bg-white hover:text-slate-900'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
