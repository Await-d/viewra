'use client';

import { useEffect, useState } from 'react';

interface GitHubProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
  createdAt: string;
}

type FetchState =
  | { status: 'loading' }
  | { status: 'success'; data: GitHubProfile }
  | { status: 'error' };

export function GitHubStats() {
  const [state, setState] = useState<FetchState>({ status: 'loading' });

  useEffect(() => {
    fetch('/api/github/profile')
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json() as GitHubProfile;
        setState({ status: 'success', data });
      })
      .catch(() => setState({ status: 'error' }));
  }, []);

  if (state.status === 'loading') {
    return (
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 w-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  if (state.status === 'error') return null;

  const { data } = state;
  const joinYear = new Date(data.createdAt).getFullYear();

  const stats = [
    { label: '公开仓库', value: String(data.publicRepos) },
    { label: '粉丝', value: String(data.followers) },
    { label: '关注', value: String(data.following) },
    { label: 'GitHub 起点', value: String(joinYear) },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <a
          key={stat.label}
          href={data.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 transition hover:border-sky-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span className="font-display text-xl font-semibold text-slate-900">{stat.value}</span>
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{stat.label}</span>
        </a>
      ))}
    </div>
  );
}
