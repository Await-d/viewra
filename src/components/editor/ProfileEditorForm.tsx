'use client';

import { useId } from 'react';

import type { ProfileFormState, ProfileStatField, SocialLinkField, TechStackEntry } from './types';

interface ProfileEditorFormProps {
  state: ProfileFormState;
  onChange: (state: ProfileFormState) => void;
}

function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

const inputCls =
  'w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 transition';
const labelCls = 'block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1';
const sectionCls = 'space-y-3';
const groupCls = 'rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-3';

export function ProfileEditorForm({ state, onChange }: ProfileEditorFormProps) {
  const uid = useId();

  function set<K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) {
    onChange({ ...state, [key]: value });
  }

  function addSocial() {
    set('socials', [...state.socials, { id: nanoid(), label: '', href: '' }]);
  }
  function removeSocial(id: string) {
    set('socials', state.socials.filter((s) => s.id !== id));
  }
  function updateSocial(id: string, field: keyof SocialLinkField, value: string) {
    set(
      'socials',
      state.socials.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  }

  function addStat() {
    set('stats', [...state.stats, { id: nanoid(), label: '', value: '', description: '' }]);
  }
  function removeStat(id: string) {
    set('stats', state.stats.filter((s) => s.id !== id));
  }
  function updateStat(id: string, field: keyof ProfileStatField, value: string) {
    set(
      'stats',
      state.stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  }

  function addTechEntry() {
    set('techStack', [...state.techStack, { id: nanoid(), category: '', items: '' }]);
  }
  function removeTechEntry(id: string) {
    set('techStack', state.techStack.filter((e) => e.id !== id));
  }
  function updateTechEntry(id: string, field: keyof TechStackEntry, value: string) {
    set(
      'techStack',
      state.techStack.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  }

  return (
    <div className="space-y-6 text-sm">
      <section className={sectionCls}>
        <p className="eyebrow">基本信息</p>
        <div className={groupCls}>
          <div>
            <label htmlFor={`${uid}-name`} className={labelCls}>姓名</label>
            <input
              id={`${uid}-name`}
              className={inputCls}
              placeholder="Alex Chen"
              value={state.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-title`} className={labelCls}>职业定位</label>
            <input
              id={`${uid}-title`}
              className={inputCls}
              placeholder="Full-Stack Engineer · Product Builder"
              value={state.title}
              onChange={(e) => set('title', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${uid}-email`} className={labelCls}>邮箱</label>
              <input
                id={`${uid}-email`}
                className={inputCls}
                type="email"
                placeholder="hello@example.dev"
                value={state.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-location`} className={labelCls}>位置</label>
              <input
                id={`${uid}-location`}
                className={inputCls}
                placeholder="Shanghai, China"
                value={state.location}
                onChange={(e) => set('location', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor={`${uid}-avatar`} className={labelCls}>头像路径（可选）</label>
            <input
              id={`${uid}-avatar`}
              className={inputCls}
              placeholder="/avatars/profile-avatar.svg"
              value={state.avatar}
              onChange={(e) => set('avatar', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">社交链接</p>
        <div className={groupCls}>
          {state.socials.map((social) => (
            <div key={social.id} className="flex items-center gap-2">
              <input
                className={`${inputCls} w-28 shrink-0`}
                placeholder="GitHub"
                value={social.label}
                onChange={(e) => updateSocial(social.id, 'label', e.target.value)}
              />
              <input
                className={`${inputCls} flex-1`}
                placeholder="https://github.com/..."
                value={social.href}
                onChange={(e) => updateSocial(social.id, 'href', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeSocial(social.id)}
                className="shrink-0 rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                aria-label="删除"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSocial}
            className="w-full rounded-2xl border border-dashed border-slate-300 py-2 text-xs text-slate-500 hover:border-sky-300 hover:text-sky-600 transition"
          >
            + 添加社交链接
          </button>
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">关注方向</p>
        <div className={groupCls}>
          <label htmlFor={`${uid}-focus`} className={labelCls}>每行一个方向</label>
          <textarea
            id={`${uid}-focus`}
            className={`${inputCls} h-24 resize-none`}
            placeholder={"产品工程\n开发者体验\n基础设施"}
            value={state.focusAreas}
            onChange={(e) => set('focusAreas', e.target.value)}
          />
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">资料速览</p>
        <div className={groupCls}>
          {state.stats.map((stat) => (
            <div key={stat.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                className={inputCls}
                placeholder="标签"
                value={stat.label}
                onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="值"
                value={stat.value}
                onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeStat(stat.id)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                aria-label="删除"
              >
                ✕
              </button>
              <input
                className={`${inputCls} col-span-2`}
                placeholder="补充说明（可选）"
                value={stat.description}
                onChange={(e) => updateStat(stat.id, 'description', e.target.value)}
              />
              <div />
            </div>
          ))}
          <button
            type="button"
            onClick={addStat}
            className="w-full rounded-2xl border border-dashed border-slate-300 py-2 text-xs text-slate-500 hover:border-sky-300 hover:text-sky-600 transition"
          >
            + 添加统计项
          </button>
        </div>
      </section>

      <section className={sectionCls}>
        <p className="eyebrow">技术栈</p>
        <div className={groupCls}>
          {state.techStack.map((entry) => (
            <div key={entry.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  className={`${inputCls} w-36 shrink-0`}
                  placeholder="Frontend"
                  value={entry.category}
                  onChange={(e) => updateTechEntry(entry.id, 'category', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeTechEntry(entry.id)}
                  className="ml-auto shrink-0 rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                  aria-label="删除"
                >
                  ✕
                </button>
              </div>
              <textarea
                className={`${inputCls} h-20 resize-none`}
                placeholder={"Next.js\nTypeScript\nTailwind CSS"}
                value={entry.items}
                onChange={(e) => updateTechEntry(entry.id, 'items', e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTechEntry}
            className="w-full rounded-2xl border border-dashed border-slate-300 py-2 text-xs text-slate-500 hover:border-sky-300 hover:text-sky-600 transition"
          >
            + 添加技术分类
          </button>
        </div>
      </section>
    </div>
  );
}
