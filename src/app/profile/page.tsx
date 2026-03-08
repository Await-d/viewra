import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ProfileHero } from '@/components/ProfileHero';
import { TechStackGrid } from '@/components/TechStackGrid';
import { getProfile } from '@/lib/profile';

export default function ProfilePage() {
  const profile = getProfile();
  const hasContactInfo = Boolean(profile.email || profile.location || profile.socials.length > 0);
  const contentGridClassName = hasContactInfo
    ? 'grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]'
    : 'grid gap-6';

  return (
    <div className="space-y-10">
      <ProfileHero profile={profile} />

      <section className={contentGridClassName}>
        <article className="panel p-8 sm:p-10">
          <p className="eyebrow">Profile</p>
          <h2 className="section-heading mt-5">Background, focus, and working style</h2>
          <div className="mt-6">
            <MarkdownRenderer content={profile.content} />
          </div>
        </article>

        {hasContactInfo ? (
          <aside className="space-y-6">
            <section className="panel p-8">
              <p className="eyebrow">Contact</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                {profile.email ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-2 inline-block rounded-lg font-medium text-slate-900 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      {profile.email}
                    </a>
                  </div>
                ) : null}

                {profile.location ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Location</p>
                    <p className="mt-2 text-slate-900">{profile.location}</p>
                  </div>
                ) : null}

                {profile.socials.length > 0 ? (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Links</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {profile.socials.map((social) => (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          </aside>
        ) : null}
      </section>

      <section className="panel p-8 sm:p-10">
        <p className="eyebrow">Tech stack</p>
        <h2 className="section-heading mt-5">Organized by domain instead of badge clutter</h2>
        <div className="mt-6">
          <TechStackGrid techStack={profile.techStack} />
        </div>
      </section>
    </div>
  );
}
