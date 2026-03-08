import Image from 'next/image';
import Link from 'next/link';

import type { ProjectData } from '@/types/content';

import { formatProjectDate } from '@/lib/projects';

import { Tag } from './Tag';

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = formatProjectDate(project.date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_28px_72px_-36px_rgba(14,116,144,0.35)]">
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
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-200">Project</p>
              <p className="mt-3 max-w-[18rem] text-lg font-semibold text-white">{project.title}</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-100">
              Markdown-driven
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-3">
          {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
          {formattedDate ? <span className="text-sm text-slate-500">{formattedDate}</span> : null}
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
              View details
              <span aria-hidden>→</span>
          </Link>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Repo
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
