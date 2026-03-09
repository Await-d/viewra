import type { Metadata } from 'next';

import { RepoList } from '@/components/RepoList';

export const metadata: Metadata = {
  title: '开源仓库',
  description: 'Await-d GitHub 账号下的所有公开仓库列表。',
};

export default function ReposPage() {
  return (
    <div className="space-y-8">
      <header className="panel p-8 sm:p-10">
        <div>
          <p className="eyebrow">开源仓库</p>
          <h1 className="section-heading mt-5">Await-d 全部公开仓库</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            以下数据实时从 GitHub API 拉取，包含所有公开仓库，按 Stars 和最近推送时间排序。
          </p>
        </div>
      </header>
      <RepoList />
    </div>
  );
}
