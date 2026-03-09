'use client';

import { useCallback, useState } from 'react';

import { MarkdownRenderer } from './MarkdownRenderer';
import { ReadmeViewer } from './ReadmeViewer';
import { TableOfContents } from './TableOfContents';

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
  const [readmeContent, setReadmeContent] = useState<string>('');

  const handleReadmeContent = useCallback((text: string) => {
    setReadmeContent(text);
  }, []);

  const activeContent = activeTab === 'content' ? content : readmeContent;

  const tabCls = (active: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
      active
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`;

  if (!showTabs) {
    const singleContent = hasContent ? content : '';
    return (
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          {hasContent && <MarkdownRenderer content={content} />}
          {!hasContent && hasRepo && <ReadmeViewer repo={repo!} onContent={handleReadmeContent} />}
          {!hasContent && !hasRepo && <p className="text-sm text-slate-400">暂无项目介绍内容。</p>}
        </div>
        <div className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents content={hasContent ? singleContent : readmeContent} />
          </div>
        </div>
      </div>
    );
  }

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

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          {activeTab === 'content' && <MarkdownRenderer content={content} />}
          {activeTab === 'readme' && <ReadmeViewer repo={repo!} onContent={handleReadmeContent} />}
        </div>
        <div className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents content={activeContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
