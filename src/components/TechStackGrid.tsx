import type { TechStackMap } from '@/types/content';
import { TECH_STACK_CATEGORIES } from '@/types/content';

interface TechStackGridProps {
  techStack: TechStackMap;
}

export function TechStackGrid({ techStack }: TechStackGridProps) {
  const preferredCategories = TECH_STACK_CATEGORIES.filter((category) => (techStack[category] ?? []).length > 0);
  const extraCategories = Object.keys(techStack)
    .filter((category) => !TECH_STACK_CATEGORIES.includes(category as (typeof TECH_STACK_CATEGORIES)[number]))
    .sort((left, right) => left.localeCompare(right));
  const populatedCategories = [...preferredCategories, ...extraCategories];

  if (populatedCategories.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-7 text-slate-500">
        在 <code>content/profile.md</code> 的 <code>techStack</code> 字段中添加技术栈内容，即可在此显示。
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {populatedCategories.map((category) => (
        <section key={category} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">{category}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {(techStack[category] ?? []).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
