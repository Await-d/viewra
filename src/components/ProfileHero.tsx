import Image from 'next/image';

import type { ProfileData } from '@/types/content';

import { getLeadParagraph } from '@/lib/markdown';

import { FocusAreaList } from './FocusAreaList';
import { ProfileStatsGrid } from './ProfileStatsGrid';
import { Tag } from './Tag';

interface ProfileHeroProps {
  profile: ProfileData;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const lead = getLeadParagraph(profile.content);
  const layoutClassName = profile.avatar
    ? 'relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start'
    : 'relative space-y-6';
  const hasMetaTags = Boolean(profile.location || profile.email);

  return (
    <section className="panel relative overflow-hidden p-8 sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_30%)]" />
      <div className={layoutClassName}>
        <div className="space-y-6">
          <span className="eyebrow">公开技术档案</span>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {profile.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{profile.title}</p>
          </div>

          {lead ? <p className="max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{lead}</p> : null}

          {hasMetaTags ? (
            <div className="flex flex-wrap gap-3">
              {profile.location ? <Tag tone="outline">{profile.location}</Tag> : null}
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 rounded-full">
                  <Tag tone="accent">{profile.email}</Tag>
                </a>
              ) : null}
            </div>
          ) : null}

          {profile.socials.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {profile.socials.map((social, index) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    index === 0
                      ? 'inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100'
                      : 'inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100'
                  }
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}

          <ProfileStatsGrid stats={profile.stats} />

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">当前重点</p>
            <FocusAreaList items={profile.focusAreas} />
          </div>
        </div>

        {profile.avatar ? (
          <div className="space-y-4 lg:pt-6">
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

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/85 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">公开身份</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{profile.name}</p>
              {profile.title && <p className="mt-2 text-sm leading-6 text-slate-600">{profile.title}</p>}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
