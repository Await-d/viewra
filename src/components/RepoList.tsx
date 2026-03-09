'use client';

import { useEffect, useMemo, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushedAt: string;
  createdAt: string;
  homepage: string | null;
}

type FetchState =
  | { status: 'loading' }
  | { status: 'success'; repos: GitHubRepo[] }
  | { status: 'error'; message: string };

export function RepoList() {
  const [state, setState] = useState<FetchState>({ status: 'loading' });
  const [filter, setFilter] = useState<'all' | 'original' | 'fork'>('all');
  const [langFilter, setLangFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/github/repos')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const repos = await res.json() as GitHubRepo[];
        setState({ status: 'success', repos });
      })
      .catch((err: unknown) => {
        setState({ status: 'error', message: err instanceof Error ? err.message : '加载失败' });
      });
  }, []);

  const languages = useMemo(() => {
    if (state.status !== 'success') return [];
    const set = new Set<string>();
    for (const r of state.repos) {
      if (r.language) set.add(r.language);
    }
    return Array.from(set).sort();
  }, [state]);

  const filtered = useMemo(() => {
    if (state.status !== 'success') return [];
    return state.repos
      .filter((r) => filter === 'all' || (filter === 'original' ? !r.fork : r.fork))
      .filter((r) => !langFilter || r.language === langFilter);
  }, [state, filter, langFilter]);

  if (state.status === 'loading') {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={`skeleton-${i}`} className="h-40 animate-pulse rounded-[28px] bg-slate-100" />
        ))}
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="panel p-8 text-center text-sm text-red-400">
        加载失败：{state.message}
      </div>
    );
  }

  const modeBtnCls = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
      active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'
    }`;

  const tagBtnCls = (active: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
      active
        ? 'bg-slate-900 text-white shadow-sm'
        : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700'
    }`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1">
          {(['all', 'original', 'fork'] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={modeBtnCls(filter === f)}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '全部' : f === 'original' ? '原创' : 'Fork'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {langFilter && (
            <button type="button" className={tagBtnCls(true)} onClick={() => setLangFilter(null)}>
              {langFilter} ✕
            </button>
          )}
          {languages
            .filter((l) => l !== langFilter)
            .map((lang) => (
              <button
                key={lang}
                type="button"
                className={tagBtnCls(false)}
                onClick={() => setLangFilter(lang)}
              >
                {lang}
              </button>
            ))}
        </div>
      </div>

      <p className="text-xs text-slate-400">{filtered.length} 个仓库</p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_12px_32px_-8px_rgba(14,116,144,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-900 group-hover:text-sky-700 transition break-words">
                {repo.name}
              </p>
              {repo.fork && (
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                  fork
                </span>
              )}
              {repo.archived && (
                <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-mono text-amber-600">
                  archived
                </span>
              )}
            </div>

            {repo.description && (
              <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{repo.description}</p>
            )}

            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden />
                    {repo.language}
                  </span>
                )}
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {repo.stars}
                  </span>
                )}
              </div>
              <span>
                {new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short' }).format(new Date(repo.pushedAt))}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
