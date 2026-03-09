'use client';

import type { EditMode } from './types';

interface MarkdownBodyEditorProps {
  value: string;
  editMode: EditMode;
  onChange: (value: string) => void;
  rawMarkdown: string;
  onRawChange: (value: string) => void;
}

const textareaCls =
  'w-full flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 transition resize-none leading-relaxed';

export function MarkdownBodyEditor({
  value,
  editMode,
  onChange,
  rawMarkdown,
  onRawChange,
}: MarkdownBodyEditorProps) {
  if (editMode === 'raw') {
    return (
      <div className="flex flex-1 flex-col space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          原始 Markdown（含 frontmatter）
        </p>
        <textarea
          className={`${textareaCls} min-h-[400px]`}
          placeholder="在此粘贴或编辑完整的 Markdown 内容..."
          value={rawMarkdown}
          onChange={(e) => onRawChange(e.target.value)}
          spellCheck={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">正文内容</p>
      <textarea
        className={`${textareaCls} min-h-[300px]`}
        placeholder={"在这里写正文内容，支持标准 Markdown 语法。\n\n例如：\n\n## 项目背景\n\n这里是项目的详细介绍..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
