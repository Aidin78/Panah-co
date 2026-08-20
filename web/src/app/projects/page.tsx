import Link from "next/link";
import type { Metadata } from "next";
import { getAllPhases, getProjects, getSiteSettings } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "پروژه‌ها",
  description: "نمونه‌کارهای گروه ساختمانی پناه در رشت و حومه.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ phase?: string; location?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;

  const [settings, phases, projects] = await Promise.all([
    getSiteSettings(),
    getAllPhases(),
    getProjects({ phaseSlug: params.phase, location: params.location }),
  ]);

  return (
    <>
      <SiteHeader settings={settings} />

      <main className="flex-1 px-6 py-16 sm:px-10 sm:py-20">
        <h1 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-medium sm:text-4xl">
          پروژه‌ها
        </h1>

        {/* Filters — status and location only, no project-type facet (§8/§25) */}
        <form className="mb-10 flex flex-wrap gap-3" method="get">
          <select
            name="phase"
            defaultValue={params.phase ?? ""}
            className="rounded-md border border-line bg-plaster px-4 py-2 font-[family-name:var(--font-fa)] text-sm"
          >
            <option value="">همه مراحل</option>
            {phases.map((phase) => (
              <option key={phase.id} value={phase.slug}>
                {phase.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="location"
            defaultValue={params.location ?? ""}
            placeholder="محله یا منطقه"
            className="rounded-md border border-line bg-plaster px-4 py-2 font-[family-name:var(--font-fa)] text-sm"
          />

          <button
            type="submit"
            className="rounded-md bg-ink px-5 py-2 font-[family-name:var(--font-fa)] text-sm font-medium text-plaster"
          >
            اعمال فیلتر
          </button>

          {(params.phase || params.location) && (
            <Link
              href="/projects"
              className="flex items-center font-[family-name:var(--font-fa)] text-sm text-stone hover:underline"
            >
              حذف فیلترها
            </Link>
          )}
        </form>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="font-[family-name:var(--font-fa)] text-ink-soft">
            پروژه‌ای با این مشخصات یافت نشد.
          </p>
        )}
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
