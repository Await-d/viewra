'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MarkdownBodyEditor } from './MarkdownBodyEditor';
import { EditorPreview } from './EditorPreview';
import { ProfileEditorForm } from './ProfileEditorForm';
import { ProjectEditorForm } from './ProjectEditorForm';
import { serializeProfileToMarkdown, serializeProjectToMarkdown } from './serializer';
import type { EditMode, EditorMode, ProfileFormState, ProjectFormState } from './types';

const STORAGE_KEY = 'viewra_editor_draft';

const DEFAULT_PROFILE: ProfileFormState = {
  name: '',
  title: '',
  avatar: '',
  email: '',
  location: '',
  socials: [],
  stats: [],
  focusAreas: '',
  techStack: [],
  body: '',
};

const DEFAULT_PROJECT: ProjectFormState = {
  title: '',
  slug: '',
  summary: '',
  tags: '',
  cover: '',
  status: '',
  date: '',
  repo: '',
  demo: '',
  body: '',
};

interface DraftData {
  editorMode: EditorMode;
  profileState: ProfileFormState;
  projectState: ProjectFormState;
  rawMarkdown: string;
}

function loadDraft(): Partial<DraftData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<DraftData>;
  } catch {
    return {};
  }
}

function saveDraft(data: DraftData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage quota exceeded or private mode — silently ignore
  }
}

type CopyState = 'idle' | 'copied' | 'error';

export function EditorShell() {
  const draft = useRef<Partial<DraftData> | null>(null);
  if (draft.current === null) {
    draft.current = loadDraft();
  }
  const d = draft.current;

  const [editorMode, setEditorMode] = useState<EditorMode>(d.editorMode ?? 'profile');
  const [editMode, setEditMode] = useState<EditMode>('form');
  const [profileState, setProfileState] = useState<ProfileFormState>(d.profileState ?? DEFAULT_PROFILE);
  const [projectState, setProjectState] = useState<ProjectFormState>(d.projectState ?? DEFAULT_PROJECT);
  const [rawMarkdown, setRawMarkdown] = useState(d.rawMarkdown ?? '');
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft({ editorMode, profileState, projectState, rawMarkdown });
      setSavedAt(new Date());
    }, 800);
    return () => clearTimeout(timer);
  }, [editorMode, profileState, projectState, rawMarkdown]);

  const generatedMarkdown = useMemo(() => {
    if (editMode === 'raw') return rawMarkdown;
    if (editorMode === 'profile') return serializeProfileToMarkdown(profileState);
    return serializeProjectToMarkdown(projectState);
  }, [editMode, editorMode, profileState, projectState, rawMarkdown]);

  const handleEditorModeChange = useCallback(
    (mode: EditorMode) => {
      setEditorMode(mode);
      if (editMode === 'raw') setEditMode('form');
    },
    [editMode],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedMarkdown);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  }, [generatedMarkdown]);

  const handleDownload = useCallback(() => {
    const fileName =
      editorMode === 'profile'
        ? 'profile.md'
        : `${(projectState.slug || 'project').replace(/[^\w-]/g, '-')}.md`;
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [editorMode, generatedMarkdown, projectState.slug]);

  const handleClearDraft = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
    setProfileState(DEFAULT_PROFILE);
    setProjectState(DEFAULT_PROJECT);
    setRawMarkdown('');
    setSavedAt(null);
  }, []);

  const modeBtnCls = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'
    }`;

  const editModeBtnCls = (active: boolean) =>
    `rounded-lg px-3 py-1 text-xs font-medium transition ${
      active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="panel flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1">
            <button
              type="button"
              className={modeBtnCls(editorMode === 'profile')}
              onClick={() => handleEditorModeChange('profile')}
            >
              个人资料
            </button>
            <button
              type="button"
              className={modeBtnCls(editorMode === 'project')}
              onClick={() => handleEditorModeChange('project')}
            >
              项目
            </button>
          </div>
          {savedAt && (
            <span className="text-xs text-slate-400">
              已自动保存 {savedAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              className={editModeBtnCls(editMode === 'form')}
              onClick={() => setEditMode('form')}
            >
              表单模式
            </button>
            <button
              type="button"
              className={editModeBtnCls(editMode === 'raw')}
              onClick={() => {
                if (editMode === 'form') setRawMarkdown(generatedMarkdown);
                setEditMode('raw');
              }}
            >
              原始 Markdown
            </button>
          </div>

          <button
            type="button"
            onClick={handleClearDraft}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            清空
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {copyState === 'copied' ? '已复制 ✓' : copyState === 'error' ? '复制失败' : '复制 .md'}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="rounded-2xl bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            下载 .md
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel flex flex-col gap-5 p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {editMode === 'form' && editorMode === 'profile' && (
            <ProfileEditorForm state={profileState} onChange={setProfileState} />
          )}
          {editMode === 'form' && editorMode === 'project' && (
            <ProjectEditorForm state={projectState} onChange={setProjectState} />
          )}

          <MarkdownBodyEditor
            value={editorMode === 'profile' ? profileState.body : projectState.body}
            editMode={editMode}
            onChange={(val) =>
              editorMode === 'profile'
                ? setProfileState((s) => ({ ...s, body: val }))
                : setProjectState((s) => ({ ...s, body: val }))
            }
            rawMarkdown={rawMarkdown}
            onRawChange={setRawMarkdown}
          />
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
          <EditorPreview
            mode={editorMode}
            profileState={profileState}
            projectState={projectState}
            rawMarkdown={rawMarkdown}
            isRawMode={editMode === 'raw'}
          />
        </div>
      </div>
    </div>
  );
}
