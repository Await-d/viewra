import Link from 'next/link';

import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ProfileHero } from '@/components/ProfileHero';
import { ProjectCard } from '@/components/ProjectCard';
import { TechStackGrid } from '@/components/TechStackGrid';
import { getPreviewParagraphs } from '@/lib/markdown';
import { getLatestProjects } from '@/lib/projects';
import { getProfile } from '@/lib/profile';

export default function HomePage() {
  const profile = getProfile();
  const latestProjects = getLatestProjects(2);

  return (
    <div className="space-y-10">
      <ProfileHero profile={profile} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <article className="panel p-8 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">About</p>
              <h2 className="section-heading mt-5">A profile page that stays easy to update</h2>
            </div>
            <Link
              href="/profile"
              className="rounded-lg text-sm font-semibold text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Full profile →
            </Link>
          </div>

          <div className="mt-6">
            <MarkdownRenderer content={getPreviewParagraphs(profile.content)} />
          </div>
        </article>

        <aside className="panel p-8 sm:p-10">
          <p className="eyebrow">Stack overview</p>
          <h2 className="section-heading mt-5">Core technologies grouped by capability</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Content is sourced from <code>content/profile.md</code>, so future updates stay close to the codebase and require no admin panel.
          </p>
          <div className="mt-6">
            <TechStackGrid techStack={profile.techStack} />
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 className="section-heading mt-4">Recent work and shipped experiments</h2>
          </div>
          <Link
            href="/projects"
            className="rounded-lg text-sm font-semibold text-slate-600 transition hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
          >
            Browse all projects →
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
            Add markdown files to <code>content/projects/</code> to automatically populate this section.
          </div>
        )}
      </section>
    </div>
  );
}
