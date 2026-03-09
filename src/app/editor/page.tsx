import type { Metadata } from 'next';

import { EditorShell } from '@/components/editor/EditorShell';

export const metadata: Metadata = {
  title: '在线编辑器',
  description: '在线编辑 Profile 和项目内容，实时预览并导出 Markdown 文件。',
};

export default function EditorPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">内容编辑器</p>
        <h1 className="section-heading mt-4">在线编辑，一键导出 Markdown</h1>
        <p className="mt-3 text-sm text-slate-500">
          填写表单或直接编辑原始 Markdown，右侧实时预览效果。完成后复制内容或下载 .md 文件，放入项目的 content 目录即可生效。
        </p>
      </div>
      <EditorShell />
    </div>
  );
}
