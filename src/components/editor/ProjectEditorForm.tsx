'use client';

import { useId } from 'react';

import type { ProjectFormState } from './types';

interface ProjectEditorFormProps {
  state: ProjectFormState;
  onChange: (state: ProjectFormState) => void;
}

const inputCls =
  'w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 transition';
const labelCls = 'block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1';
const sectionCls = 'space-y-3';
const groupCls = 'rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-3';

export function ProjectEditorForm({ state, onChange }: ProjectEditorFormProps) {
  const uid = useId();

  function set<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    onChange({ ...state, [key]: value });
  }

  function handleTitleChange(value: string) {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-');
    onChange({ ...state, title: value, slug: state.slug || slug });
  }

  return (
    <div className="space-y-6 text-sm">
      <section className={sectionCls}>
        <p className="eyebrow">基本信息</p>
        <div className={groupCls}>
          <div>
            <label htmlFor={`${uid}-title`} className={labelCls}>项目名称</label>
            <input
              id={`${uid}-title`}
              className={inputCls}
              placeholder="我的项目"
              value={state.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-slug`} className={labelCls}>Slug（路由标识）</label>
            <input
              id={`${uid}-slug`}
              className={inputCls}
              placeholder="my-project"
              value={state.slug}
              onChange={(e) => set('slug', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-summary`} className={labelCls}>简介</label>
            <textarea
              id={`${uid}-summary`}
              className={`${inputCls} h-20 resize-none`}
              placeholder="用一句话概括项目的目标、价值或核心能力。"
              value={state.summary}
              onChange={(e) => set('summary', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">标签与状态</p>
        <div className={groupCls}>
          <div>
            <label htmlFor={`${uid}-tags`} className={labelCls}>标签（每行一个）</label>
            <textarea
              id={`${uid}-tags`}
              className={`${inputCls} h-24 resize-none`}
              placeholder={"Next.js\nTypeScript\nTailwind CSS"}
              value={state.tags}
              onChange={(e) => set('tags', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${uid}-status`} className={labelCls}>状态</label>
              <input
                id={`${uid}-status`}
                className={inputCls}
                placeholder="已上线"
                value={state.status}
                onChange={(e) => set('status', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-date`} className={labelCls}>日期</label>
              <input
                id={`${uid}-date`}
                className={inputCls}
                type="date"
                value={state.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">链接</p>
        <div className={groupCls}>
          <div>
            <label htmlFor={`${uid}-repo`} className={labelCls}>仓库地址（可选）</label>
            <input
              id={`${uid}-repo`}
              className={inputCls}
              placeholder="https://github.com/..."
              value={state.repo}
              onChange={(e) => set('repo', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-demo`} className={labelCls}>演示地址（可选）</label>
            <input
              id={`${uid}-demo`}
              className={inputCls}
              placeholder="https://..."
              value={state.demo}
              onChange={(e) => set('demo', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-cover`} className={labelCls}>封面图路径（可选）</label>
            <input
              id={`${uid}-cover`}
              className={inputCls}
              placeholder="/images/cover.svg"
              value={state.cover}
              onChange={(e) => set('cover', e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
