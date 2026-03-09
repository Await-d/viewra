'use client';

import { useEffect, useRef, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const lines = content.split('\n');
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(#{1,4})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
      .replace(/[\s]+/g, '-')
      .replace(/^-+|-+$/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          break;
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });

    const timer = setTimeout(() => {
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) observerRef.current?.observe(el);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav aria-label="文档目录" className="space-y-1">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">目录</p>
      <ul className="space-y-0.5">
        {headings.map((heading) => {
          const indent = (heading.level - minLevel) * 12;
          const active = activeId === heading.id;
          return (
            <li key={`${heading.id}-${heading.level}`}>
              <a
                href={`#${heading.id}`}
                style={{ paddingLeft: indent + 8 }}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', `#${heading.id}`);
                    setActiveId(heading.id);
                  }
                }}
                className={`block rounded-xl py-1 pr-2 text-sm leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  active
                    ? 'font-medium text-sky-700 bg-sky-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
