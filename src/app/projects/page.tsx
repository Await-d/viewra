import { ProjectList } from '@/components/ProjectList';
import { formatProjectDate, getAllProjects } from '@/lib/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const latestDate = formatProjectDate(projects[0]?.date);

  return (
    <div className="space-y-8">
      <header className="panel p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="eyebrow">公开项目</p>
            <h1 className="section-heading mt-5">当前围绕 Await-d 公开仓库整理的项目列表</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              这里优先展示当前公开身份下最适合用于说明技术方向、工程关注点与项目表达方式的仓库内容。它们不是仓库列表的机械镜像，而是经过整理后的展示型项目页面。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">项目条目</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{projects.length}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">当前展示站中可直接访问的项目详情页数量。</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">最近项目时间</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">{latestDate ?? '持续更新'}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">按项目时间倒序展示，优先看到最近整理的内容。</p>
            </div>
          </div>
        </div>
      </header>

      <ProjectList projects={projects} />
    </div>
  );
}
