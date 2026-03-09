import Image from 'next/image';
import Link from 'next/link';

import type { ProjectData } from '@/types/content';

import { formatProjectDate } from '@/lib/date';

import { Tag } from './Tag';

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = formatProjectDate(project.date);
  const repoLabel = project.repo
    ? project.repo.replace(/^https?:\/\/[^/]+\//, '')
    : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_28px_72px_-36px_rgba(14,116,144,0.35)]">
      <div className="relative overflow-hidden border-b border-slate-200/80 bg-slate-950/95">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover image`}
            width={1280}
            height={720}
            className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-end justify-between bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a_50%,_#1e293b)] p-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-200">公开项目</p>
              <p className="mt-3 max-w-[18rem] text-lg font-semibold text-white">{project.title}</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-100">
              GitHub
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-3">
          {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
          {formattedDate ? <span className="text-sm text-slate-500">{formattedDate}</span> : null}
          {repoLabel ? <span className="font-mono text-xs text-slate-400">{repoLabel}</span> : null}
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
            <Link
              href={`/projects/${project.slug}`}
              className="break-words rounded-lg transition group-hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {project.title}
            </Link>
          </h3>
          <p className="break-words text-sm leading-7 text-slate-600 sm:text-base">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-900 transition group-hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              查看详情
              <span aria-hidden>→</span>
            </Link>

          <div className="flex flex-wrap gap-2">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                仓库
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                演示
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
