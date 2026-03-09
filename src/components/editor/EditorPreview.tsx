'use client';

import { MarkdownRenderer } from '@/components/MarkdownRenderer';

import type { EditorMode, ProfileFormState, ProjectFormState } from './types';

interface EditorPreviewProps {
  mode: EditorMode;
  profileState: ProfileFormState;
  projectState: ProjectFormState;
  rawMarkdown: string;
  isRawMode: boolean;
}

export function EditorPreview({
  mode,
  profileState,
  projectState,
  rawMarkdown,
  isRawMode,
}: EditorPreviewProps) {
  if (isRawMode) {
    const secondDash = rawMarkdown.indexOf('---', 3);
    const body = secondDash !== -1 ? rawMarkdown.slice(secondDash + 3).trim() : rawMarkdown.trim();
    return (
      <div className="space-y-4">
        <p className="eyebrow">预览</p>
        <div className="panel p-6">
          <MarkdownRenderer content={body || '在左侧输入内容后，预览将在此显示。'} />
        </div>
      </div>
    );
  }

  if (mode === 'profile') {
    return <ProfilePreview state={profileState} />;
  }

  return <ProjectPreview state={projectState} />;
}

function ProfilePreview({ state }: { state: ProfileFormState }) {
  const focusItems = state.focusAreas
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const hasContent = state.name || state.title || state.body;

  return (
    <div className="space-y-4">
      <p className="eyebrow">预览</p>
      <div className="panel p-6 space-y-5">
        {!hasContent && (
          <p className="text-sm text-slate-300 text-center py-8">在左侧填写信息后，预览将在此显示。</p>
        )}

        {hasContent && (
          <>
            <div className="border-b border-slate-100 pb-4">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {state.name || <span className="text-slate-300">姓名</span>}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {state.title || <span className="text-slate-300">职业定位</span>}
              </p>
              {(state.email || state.location) && (
                <p className="mt-2 text-xs text-slate-400">
                  {[state.email, state.location].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            {state.socials.filter((s) => s.label && s.href).length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">社交链接</p>
                <div className="flex flex-wrap gap-2">
                  {state.socials
                    .filter((s) => s.label && s.href)
                    .map((s) => (
                      <span
                        key={s.id}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {s.label}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {focusItems.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">关注方向</p>
                <div className="flex flex-wrap gap-2">
                  {focusItems.map((item) => (
                    <span key={item} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {state.stats.filter((s) => s.label && s.value).length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">资料速览</p>
                <div className="grid grid-cols-2 gap-3">
                  {state.stats
                    .filter((s) => s.label && s.value)
                    .map((s) => (
                      <div key={s.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        <p className="text-lg font-semibold text-slate-900">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                        {s.description && <p className="mt-1 text-xs text-slate-400">{s.description}</p>}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {state.body.trim() && (
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">个人介绍</p>
                <MarkdownRenderer content={state.body} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProjectPreview({ state }: { state: ProjectFormState }) {
  const tags = state.tags
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const hasContent = state.title || state.summary || state.body;

  return (
    <div className="space-y-4">
      <p className="eyebrow">预览</p>
      <div className="panel overflow-hidden">
        <div className="space-y-4 p-6">
          {!hasContent && (
            <p className="text-sm text-slate-300 text-center py-8">在左侧填写信息后，预览将在此显示。</p>
          )}

          {hasContent && (
            <>
              <div className="flex flex-wrap gap-2">
                {state.status && (
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {state.status}
                  </span>
                )}
                {state.date && (
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
                    {state.date}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {state.title || <span className="text-slate-300">项目名称</span>}
                </h1>
                {state.summary && (
                  <p className="mt-2 text-sm leading-7 text-slate-600">{state.summary}</p>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {state.body.trim() && (
                <div className="border-t border-slate-100 pt-4">
                  <MarkdownRenderer content={state.body} />
                </div>
              )}

              {(state.repo || state.demo) && (
                <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-3">
                  {state.repo && (
                    <span className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
                      仓库 ↗
                    </span>
                  )}
                  {state.demo && (
                    <span className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
                      演示 ↗
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
