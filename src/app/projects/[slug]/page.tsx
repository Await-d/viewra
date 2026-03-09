import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GitHubRepoStats } from '@/components/GitHubRepoStats';
import { ProjectContentTabs } from '@/components/ProjectContentTabs';
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
        返回项目列表
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
          <ProjectContentTabs content={project.content} repo={project.repo} />
        </section>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <section className="panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">项目链接</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  查看仓库 ↗
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  在线演示 ↗
                </a>
              ) : null}
              {!project.repo && !project.demo ? (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-slate-500">
                  当前没有提供额外的外部访问链接。
                </p>
              ) : null}
            </div>
          </section>

          {project.repo ? <GitHubRepoStats repo={project.repo} /> : null}

          <section className="panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">项目信息</p>
            <dl className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
              {project.status ? (
                <div>
                  <dt className="font-medium text-slate-900">状态</dt>
                  <dd>{project.status}</dd>
                </div>
              ) : null}
              {formattedDate ? (
                <div>
                  <dt className="font-medium text-slate-900">时间</dt>
                  <dd>{formattedDate}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-medium text-slate-900">标识</dt>
                <dd>{project.slug}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </article>
  );
}
