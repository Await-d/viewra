import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="panel mx-auto max-w-2xl overflow-hidden">
        <div className="relative p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.06),_transparent_40%)]" />
          <div className="relative space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 text-3xl font-semibold text-slate-300">
              ??
            </div>
            <div>
              <p className="eyebrow">404</p>
              <h1 className="section-heading mt-4">页面不存在或尚未发布</h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                你访问的内容可能已被移除、重命名，或者当前还没有发布。
                <br />
                可以先返回首页或项目列表继续浏览。
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
              >
                返回首页
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
              >
                查看项目
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
