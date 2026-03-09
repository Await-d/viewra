interface FocusAreaListProps {
  items: string[];
}

export function FocusAreaList({ items }: FocusAreaListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
      {items.map((item, index) => (
        <article key={item} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-sky-200 hover:bg-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-500">方向 {String(index + 1).padStart(2, '0')}</p>
          <p className="mt-3 text-base font-medium text-slate-900">{item}</p>
        </article>
      ))}
    </div>
  );
}
