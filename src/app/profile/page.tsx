import Link from 'next/link';

import { FocusAreaList } from '@/components/FocusAreaList';
import { GitHubStats } from '@/components/GitHubStats';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ProfileHero } from '@/components/ProfileHero';
import { ProfileStatsGrid } from '@/components/ProfileStatsGrid';
import { TechStackGrid } from '@/components/TechStackGrid';
import { getLatestProjects } from '@/lib/projects';
import { getProfile } from '@/lib/profile';

export default function ProfilePage() {
  const profile = getProfile();
  const latestProjects = getLatestProjects(2);
  const hasContactInfo = Boolean(profile.email || profile.location || profile.socials.length > 0);
  const hasSidebarContent = Boolean(
    hasContactInfo || profile.stats.length > 0 || profile.focusAreas.length > 0 || latestProjects.length > 0,
  );
  const contentGridClassName = hasSidebarContent
    ? 'grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]'
    : 'grid gap-6';

  return (
    <div className="space-y-10">
      <ProfileHero profile={profile} />
      <GitHubStats />

      <section className={contentGridClassName}>
        <article className="panel p-8 sm:p-10">
          <p className="eyebrow">个人介绍</p>
          <h2 className="section-heading mt-5">当前公开身份、关注方向与工程视角</h2>
          <div className="mt-6">
            <MarkdownRenderer content={profile.content} />
          </div>
        </article>

        {hasSidebarContent ? (
          <aside className="space-y-6">
            {profile.stats.length > 0 ? (
              <section className="panel p-8">
                <p className="eyebrow">资料速览</p>
                <div className="mt-5">
                  <ProfileStatsGrid stats={profile.stats} />
                </div>
              </section>
            ) : null}

            {profile.focusAreas.length > 0 ? (
              <section className="panel p-8">
                <p className="eyebrow">关注方向</p>
                <div className="mt-5">
                  <FocusAreaList items={profile.focusAreas} />
                </div>
              </section>
            ) : null}

            <section className="panel p-8">
              <p className="eyebrow">链接与线索</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                {profile.email ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">邮箱</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-2 inline-block rounded-lg font-medium text-slate-900 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      {profile.email}
                    </a>
                  </div>
                ) : null}

                {profile.location ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">位置</p>
                    <p className="mt-2 text-slate-900">{profile.location}</p>
                  </div>
                ) : null}

                {profile.socials.length > 0 ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">公开链接</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {profile.socials.map((social) => (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            {latestProjects.length > 0 ? (
              <section className="panel p-8">
                <p className="eyebrow">最近项目</p>
                <div className="mt-5 space-y-4">
                  {latestProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="block rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-sky-200 hover:bg-white"
                    >
                      <p className="text-sm font-semibold text-slate-900">{project.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{project.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        ) : null}
      </section>

      <section className="panel p-8 sm:p-10">
        <p className="eyebrow">能力矩阵</p>
        <h2 className="section-heading mt-5">把使用中的技术能力按职责域整理，而不是堆成一串徽章</h2>
        <div className="mt-6">
          <TechStackGrid techStack={profile.techStack} />
        </div>
      </section>
    </div>
  );
}
