import Link from 'next/link';

import { FocusAreaList } from '@/components/FocusAreaList';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ProfileHero } from '@/components/ProfileHero';
import { ProfileStatsGrid } from '@/components/ProfileStatsGrid';
import { ProjectCard } from '@/components/ProjectCard';
import { getPreviewParagraphs } from '@/lib/markdown';
import { formatProjectDate, getAllProjects, getLatestProjects } from '@/lib/projects';
import { getProfile } from '@/lib/profile';

export default function HomePage() {
  const profile = getProfile();
  const latestProjects = getLatestProjects(2);
  const allProjects = getAllProjects();
  const latestProjectDate = formatProjectDate(allProjects[0]?.date);

  return (
    <div className="space-y-10">
      <ProfileHero profile={profile} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <article className="panel p-8 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">个人概览</p>
              <h2 className="section-heading mt-5">围绕公开项目、工程工具与工作流持续迭代</h2>
            </div>
            <Link
              href="/profile"
              className="rounded-lg text-sm font-semibold text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              查看完整资料 →
            </Link>
          </div>

          <div className="mt-6 text-slate-700">
            <MarkdownRenderer content={getPreviewParagraphs(profile.content)} />
          </div>
        </article>

        <aside className="space-y-6">
          <section className="panel p-8 sm:p-10">
            <p className="eyebrow">公开信号</p>
            <h2 className="section-heading mt-5">把技术方向和公开项目放在同一个展示语境里</h2>
            <div className="mt-6">
              <ProfileStatsGrid stats={profile.stats} />
            </div>
          </section>

          <section className="panel p-8 sm:p-10">
            <p className="eyebrow">当前关注</p>
            <div className="mt-5">
              <FocusAreaList items={profile.focusAreas} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">项目数量</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{allProjects.length}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">当前展示站中已整理的公开项目条目。</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">最近更新</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{latestProjectDate ?? '持续更新'}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">项目与资料内容会围绕当前公开仓库持续整理。</p>
              </div>
            </div>
          </section>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">精选项目</p>
            <h2 className="section-heading mt-4">围绕公开仓库整理出的当前代表性工作</h2>
          </div>
          <Link
            href="/projects"
            className="rounded-lg text-sm font-semibold text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
          >
            查看全部项目 →
          </Link>
        </div>

        {latestProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {latestProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="panel p-8 text-sm leading-7 text-slate-600">
            暂无项目内容，请先补充 <code>content/projects/</code> 下的 Markdown 文件。
          </div>
        )}
      </section>

      <section className="panel p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <p className="eyebrow">下一步</p>
            <h2 className="section-heading mt-5">如果你更关心公开项目、工程方法或自动化方向，可以继续深入查看</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              这个站点现在已经围绕当前 GitHub 账号的公开身份、公开仓库和持续构建方向进行了重新组织，适合作为个人能力、项目线索与工程关注点的统一入口。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/profile" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              查看资料
            </Link>
            <Link href="/projects" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
              查看项目
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
