'use client';

import { useEffect, useState } from 'react';

import { MarkdownRenderer } from './MarkdownRenderer';

interface ReadmeViewerProps {
  repo: string;
  onContent?: (content: string) => void;
}

type FetchState =
  | { status: 'loading' }
  | { status: 'success'; content: string }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

export function ReadmeViewer({ repo, onContent }: ReadmeViewerProps) {
  const [state, setState] = useState<FetchState>({ status: 'loading' });

  useEffect(() => {
    setState({ status: 'loading' });

    const encoded = encodeURIComponent(repo);

    fetch(`/api/readme?repo=${encoded}`)
      .then(async (res) => {
        if (res.status === 404) {
          setState({ status: 'not-found' });
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setState({ status: 'error', message: data.error ?? `HTTP ${res.status}` });
          return;
        }
        const text = await res.text();
        setState({ status: 'success', content: text });
        onContent?.(text);
      })
      .catch((err: unknown) => {
        setState({ status: 'error', message: err instanceof Error ? err.message : '网络错误' });
      });
  }, [repo, onContent]);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-slate-400">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-sky-400" />
        正在拉取 README...
      </div>
    );
  }

  if (state.status === 'not-found') {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
        <p className="text-sm text-slate-400">该仓库没有 README 文件。</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="rounded-2xl border border-dashed border-red-100 bg-red-50 px-6 py-10 text-center">
        <p className="text-sm text-red-400">加载失败：{state.message}</p>
      </div>
    );
  }

  return <MarkdownRenderer content={state.content} />;
}
