import Image from 'next/image';

import type { ProfileData } from '@/types/content';

import { getLeadParagraph } from '@/lib/markdown';

import { Tag } from './Tag';

interface ProfileHeroProps {
  profile: ProfileData;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const lead = getLeadParagraph(profile.content);
  const layoutClassName = profile.avatar
    ? 'relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start'
    : 'relative space-y-6';

  return (
    <section className="panel relative overflow-hidden p-8 sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_30%)]" />
      <div className={layoutClassName}>
        <div className="space-y-6">
          <span className="eyebrow">Markdown-driven personal site</span>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {profile.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{profile.title}</p>
          </div>

          {lead ? <p className="max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{lead}</p> : null}

          <div className="flex flex-wrap gap-3">
            {profile.location ? <Tag tone="outline">{profile.location}</Tag> : null}
            {profile.email ? <Tag tone="accent">{profile.email}</Tag> : null}
          </div>

          {profile.socials.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {profile.avatar ? (
          <div className="flex justify-start lg:justify-end">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950/95 p-3 shadow-panel">
              <Image
                src={profile.avatar}
                alt={`${profile.name} avatar`}
                width={208}
                height={208}
                className="h-40 w-40 rounded-[24px] object-cover sm:h-52 sm:w-52"
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
