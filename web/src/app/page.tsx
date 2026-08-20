import Image from "next/image";
import Link from "next/link";
import { strapiMediaUrl } from "@/lib/strapi";
import {
  getFeaturedProjects,
  getServices,
  getSiteSettings,
  getSpotlightProject,
} from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { PhaseBadge } from "@/components/PhaseBadge";

export default async function Home() {
  const [settings, featuredProjects, services, spotlight] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getServices(),
    getSpotlightProject(),
  ]);

  return (
    <>
      <SiteHeader settings={settings} />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-umber-deep">
          {spotlight?.coverImage && (
            <Image
              src={strapiMediaUrl(spotlight.coverImage.url)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-90"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-umber-deep/90 via-umber-deep/10 to-transparent" />
          <div className="relative z-10 px-6 pb-16 sm:px-10">
            <p className="mb-4 font-[family-name:var(--font-fa)] text-sm uppercase tracking-[0.2em] text-stone-light">
              گروه ساختمانی پناه
            </p>
            <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl font-medium leading-tight text-plaster sm:text-6xl">
              ساخت با اصالت،
              <br />
              طراحی با دقت
            </h1>
            <Link
              href="/projects"
              className="mt-8 inline-block rounded-md bg-plaster px-7 py-3 font-[family-name:var(--font-fa)] text-sm font-semibold text-umber-deep transition-opacity hover:opacity-90"
            >
              مشاهده پروژه‌ها
            </Link>
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="px-6 py-16 sm:px-10 sm:py-24">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium sm:text-3xl">
                پروژه‌های منتخب
              </h2>
              <Link
                href="/projects"
                className="font-[family-name:var(--font-fa)] text-sm text-stone hover:underline"
              >
                مشاهده همه پروژه‌ها ←
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {services.length > 0 && (
          <section className="bg-panel px-6 py-16 sm:px-10 sm:py-24">
            <h2 className="mb-10 font-[family-name:var(--font-display)] text-2xl font-medium sm:text-3xl">
              خدمات ما
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {/* Spotlight */}
        {spotlight && (
          <section className="px-6 py-16 sm:px-10 sm:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={strapiMediaUrl(spotlight.coverImage.url)}
                  alt={spotlight.coverImage.alternativeText ?? spotlight.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <PhaseBadge phase={spotlight.phase} />
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium">
                  {spotlight.title}
                </h2>
                <p className="font-[family-name:var(--font-fa)] text-ink-soft">
                  {spotlight.shortDescription}
                </p>
                <Link
                  href={`/projects/${spotlight.slug}`}
                  className="mt-2 rounded-md border border-ink px-6 py-3 font-[family-name:var(--font-fa)] text-sm font-medium transition-colors hover:bg-ink hover:text-plaster"
                >
                  مشاهده پروژه
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="bg-umber px-6 py-16 text-center sm:px-10 sm:py-20">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-medium text-plaster sm:text-3xl">
            آماده شروع پروژه بعدی هستید؟
          </h2>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-plaster px-7 py-3 font-[family-name:var(--font-fa)] text-sm font-semibold text-umber-deep transition-opacity hover:opacity-90"
          >
            تماس با ما
          </Link>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
