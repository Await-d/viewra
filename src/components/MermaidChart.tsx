'use client';

import { useEffect, useId, useRef, useState } from 'react';

interface MermaidChartProps {
  code: string;
}

export function MermaidChart({ code }: MermaidChartProps) {
  const id = useId().replace(/:/g, '-');
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          fontFamily: 'inherit',
        });

        const { svg } = await mermaid.render(`mermaid-${id}`, code);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Mermaid render error');
        }
      }
    }

    void render();
    return () => { cancelled = true; };
  }, [code, id]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
        <p className="text-xs font-mono text-red-400">Mermaid 渲染失败: {error}</p>
        <pre className="mt-2 text-xs text-slate-500 whitespace-pre-wrap">{code}</pre>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`my-4 flex justify-center overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-opacity duration-300 ${
        rendered ? 'opacity-100' : 'opacity-0'
      }`}
      role="img"
      aria-label="Mermaid diagram"
    />
  );
}
