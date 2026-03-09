'use client';

import { useEffect, useState } from 'react';

interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  htmlUrl: string;
}

type FetchState =
  | { status: 'loading' }
  | { status: 'success'; data: RepoStats }
  | { status: 'error' };

interface GitHubRepoStatsProps {
  repo: string;
}

function extractRepoPath(repoUrl: string): string | null {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return null;
    const parts = url.pathname.replace(/^\//, '').split('/');
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

export function GitHubRepoStats({ repo }: GitHubRepoStatsProps) {
  const [state, setState] = useState<FetchState>({ status: 'loading' });

  useEffect(() => {
    const repoPath = extractRepoPath(repo);
    if (!repoPath) {
      setState({ status: 'error' });
      return;
    }

    fetch(`/api/github/repos`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const repos = await res.json() as RepoStats[];
        const match = (repos as Array<RepoStats & { fullName: string }>).find(
          (r) => r.fullName.toLowerCase() === repoPath.toLowerCase(),
        );
        if (!match) throw new Error();
        setState({ status: 'success', data: match });
      })
      .catch(() => setState({ status: 'error' }));
  }, [repo]);

  if (state.status === 'loading') {
    return <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />;
  }

  if (state.status === 'error') return null;

  const { data } = state;
  const updatedDate = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(data.pushedAt));

  return (
    <section className="panel p-6 space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">GitHub 数据</p>
      <dl className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <dt className="font-medium text-slate-900">Stars</dt>
          <dd className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {data.stars}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-medium text-slate-900">Forks</dt>
          <dd>{data.forks}</dd>
        </div>
        {data.language && (
          <div className="flex items-center justify-between">
            <dt className="font-medium text-slate-900">语言</dt>
            <dd>{data.language}</dd>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dt className="font-medium text-slate-900">最近推送</dt>
          <dd>{updatedDate}</dd>
        </div>
      </dl>
      <a
        href={data.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        在 GitHub 查看
      </a>
    </section>
  );
}
