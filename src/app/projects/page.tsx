import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <header className="panel p-8 sm:p-10">
        <p className="eyebrow">Projects</p>
        <h1 className="section-heading mt-5">Selected work, experiments, and product systems</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          This page reads every markdown file under <code>content/projects/</code>, parses the frontmatter, sorts entries by date descending, and renders each project as a responsive card.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="panel p-8 text-sm leading-7 text-slate-600">
          No projects found yet. Add a markdown file under <code>content/projects/</code> to publish one.
        </div>
      )}
    </div>
  );
}
