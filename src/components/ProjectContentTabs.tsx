'use client';

import { useState } from 'react';

import { MarkdownRenderer } from './MarkdownRenderer';
import { ReadmeViewer } from './ReadmeViewer';

interface ProjectContentTabsProps {
  content: string;
  repo?: string;
}

type Tab = 'content' | 'readme';

export function ProjectContentTabs({ content, repo }: ProjectContentTabsProps) {
  const hasContent = content.trim().length > 0;
  const hasRepo = Boolean(repo);
  const showTabs = hasContent && hasRepo;

  const defaultTab: Tab = hasContent ? 'content' : 'readme';
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  if (!showTabs) {
    if (hasContent) {
      return <MarkdownRenderer content={content} />;
    }
    if (hasRepo) {
      return <ReadmeViewer repo={repo!} />;
    }
    return (
      <p className="text-sm text-slate-400">暂无项目介绍内容。</p>
    );
  }

  const tabCls = (active: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
      active
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 w-fit">
        <button
          type="button"
          className={tabCls(activeTab === 'content')}
          onClick={() => setActiveTab('content')}
        >
          项目介绍
        </button>
        <button
          type="button"
          className={tabCls(activeTab === 'readme')}
          onClick={() => setActiveTab('readme')}
        >
          README
        </button>
      </div>

      <div>
        {activeTab === 'content' && <MarkdownRenderer content={content} />}
        {activeTab === 'readme' && <ReadmeViewer repo={repo!} />}
      </div>
    </div>
  );
}
