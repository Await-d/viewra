'use client';

import { useMemo, useState } from 'react';

import type { ProjectData } from '@/types/content';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: ProjectData[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const project of projects) {
      for (const tag of project.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(
    () =>
      activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects,
    [projects, activeTag],
  );

  if (projects.length === 0) {
    return (
      <div className="panel p-8 text-sm leading-7 text-slate-600">
        还没有可展示的项目内容，请先补充 <code>content/projects/</code> 下的 Markdown 文件。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeTag === null
                ? 'bg-slate-900 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700'
            }`}
          >
            全部
            <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
              activeTag === null ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {projects.length}
            </span>
          </button>
          {allTags.map((tag) => {
            const count = projects.filter((p) => p.tags.includes(tag)).length;
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(active ? null : tag)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700'
                }`}
              >
                {tag}
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="panel p-8 text-center text-sm text-slate-400">
          没有符合「{activeTag}」标签的项目。
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
