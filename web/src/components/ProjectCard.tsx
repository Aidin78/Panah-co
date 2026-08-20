import Image from "next/image";
import Link from "next/link";
import { strapiMediaUrl } from "@/lib/strapi";
import type { Project } from "@/lib/types";
import { PhaseBadge } from "./PhaseBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-panel">
        <Image
          src={strapiMediaUrl(project.coverImage.url)}
          alt={project.coverImage.alternativeText ?? project.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-[family-name:var(--font-fa)] text-lg font-semibold">
          {project.title}
        </h3>
        <p className="font-[family-name:var(--font-fa)] text-sm text-ink-soft">
          {project.location}
        </p>
        <PhaseBadge phase={project.phase} />
      </div>
    </Link>
  );
}
