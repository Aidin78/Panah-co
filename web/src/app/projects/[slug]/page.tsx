import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { strapiMediaUrl } from "@/lib/strapi";
import { getProjectBySlug, getSiteSettings } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { PhaseBadge } from "@/components/PhaseBadge";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  const keyFacts = [
    project.location,
    project.areaSqm ? `${project.areaSqm} متر مربع` : null,
    project.unitCount ? `${project.unitCount} واحد` : null,
  ].filter(Boolean);

  return (
    <>
      <SiteHeader settings={settings} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-umber-deep">
          <Image
            src={strapiMediaUrl(project.coverImage.url)}
            alt={project.coverImage.alternativeText ?? project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umber-deep/90 via-umber-deep/10 to-transparent" />
          <div className="relative z-10 px-6 pb-10 sm:px-10">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium text-plaster sm:text-5xl">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Key info bar — status and location, no project-type field */}
        {keyFacts.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line bg-panel px-6 py-4 font-[family-name:var(--font-fa)] text-sm sm:px-10">
            <PhaseBadge phase={project.phase} />
            {keyFacts.map((fact) => (
              <span key={fact} className="text-ink-soft">
                {fact}
              </span>
            ))}
          </div>
        )}

        {/* Description + CTA */}
        <section className="flex flex-col gap-8 px-6 py-12 sm:flex-row sm:px-10 sm:py-16">
          <div
            className="prose max-w-none flex-[2] font-[family-name:var(--font-fa)] text-ink-soft [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          <div className="flex-1">
            <Link
              href={`/contact?project=${project.slug}`}
              className="block rounded-md bg-ink px-6 py-4 text-center font-[family-name:var(--font-fa)] text-sm font-semibold text-plaster transition-opacity hover:opacity-90"
            >
              علاقه‌مند به این پروژه هستید؟
            </Link>
          </div>
        </section>

        {/* Gallery — hidden if fewer than 2 images beyond cover (§9) */}
        {project.gallery.length >= 2 && (
          <section className="px-6 pb-16 sm:px-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.gallery.map((image, i) => (
                <div
                  key={image.url}
                  className="relative aspect-square overflow-hidden rounded-lg bg-panel"
                >
                  <Image
                    src={strapiMediaUrl(image.url)}
                    alt={image.alternativeText ?? `${project.title} ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related projects */}
        {project.relatedProjects.length > 0 && (
          <section className="border-t border-line px-6 py-16 sm:px-10">
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-medium">
              پروژه‌های مرتبط
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.relatedProjects.map((related) => (
                <ProjectCard key={related.id} project={related} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
