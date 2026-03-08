import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Tag } from '@/components/Tag';
import { formatProjectDate, getAllProjects, getProjectBySlug } from '@/lib/projects';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formattedDate = formatProjectDate(project.date);

  return (
    <article className="space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
      >
        <span aria-hidden>←</span>
        Back to projects
      </Link>

      <header className="panel overflow-hidden">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover image`}
            width={1280}
            height={720}
            className="aspect-[16/8] w-full object-cover"
            priority
          />
        ) : null}

        <div className="space-y-6 p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
            {formattedDate ? <Tag tone="outline">{formattedDate}</Tag> : null}
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="panel p-8 sm:p-10">
          <MarkdownRenderer content={project.content} />
        </section>

        <aside className="space-y-6">
          <section className="panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Project links</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Repository ↗
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Live demo ↗
                </a>
              ) : null}
              {!project.repo && !project.demo ? (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-slate-500">
                  No external links were provided for this project.
                </p>
              ) : null}
            </div>
          </section>

          <section className="panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Metadata</p>
            <dl className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
              {project.status ? (
                <div>
                  <dt className="font-medium text-slate-900">Status</dt>
                  <dd>{project.status}</dd>
                </div>
              ) : null}
              {formattedDate ? (
                <div>
                  <dt className="font-medium text-slate-900">Date</dt>
                  <dd>{formattedDate}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-medium text-slate-900">Slug</dt>
                <dd>{project.slug}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </article>
  );
}
