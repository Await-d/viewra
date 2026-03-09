import type { ProfileStat } from '@/types/content';

interface ProfileStatsGridProps {
  stats: ProfileStat[];
}

export function ProfileStatsGrid({ stats }: ProfileStatsGridProps) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-[24px] border border-slate-200/90 bg-white/80 p-5 shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
          {stat.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{stat.description}</p> : null}
        </article>
      ))}
    </div>
  );
}
