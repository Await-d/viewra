import type { PropsWithChildren } from 'react';

type TagTone = 'neutral' | 'accent' | 'outline';

const toneClasses: Record<TagTone, string> = {
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  accent: 'border-sky-200 bg-sky-50 text-sky-700',
  outline: 'border-slate-300 bg-white text-slate-700',
};

interface TagProps extends PropsWithChildren {
  tone?: TagTone;
}

export function Tag({ children, tone = 'neutral' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
