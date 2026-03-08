import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="panel mx-auto max-w-2xl p-10 text-center">
      <p className="eyebrow">404</p>
      <h1 className="section-heading mt-5">This page could not be found</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        The content may have been removed, renamed, or never published. Head back to the projects list to continue browsing.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
        >
          Go home
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
