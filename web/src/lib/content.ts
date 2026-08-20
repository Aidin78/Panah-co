import { strapiList, strapiOne } from "./strapi";
import type { Project, ProjectStatus, Service, SiteSettings } from "./types";

export async function getSiteSettings() {
  return strapiOne<SiteSettings>("/site-setting", { populate: "logo" });
}

export async function getFeaturedProjects() {
  return strapiList<Project>("/projects", {
    "filters[featured][$eq]": "true",
    populate: "phase,coverImage",
    sort: "createdAt:desc",
  });
}

export async function getSpotlightProject() {
  const projects = await strapiList<Project>("/projects", {
    "filters[spotlight][$eq]": "true",
    populate: "phase,coverImage",
    "pagination[limit]": "1",
  });
  return projects[0] ?? null;
}

export async function getServices() {
  return strapiList<Service>("/services", {
    populate: "image",
    sort: "order:asc",
  });
}

interface ProjectFilters {
  phaseSlug?: string;
  location?: string;
}

// Filters are status (phase) and location only — there is no project-type
// field in this content model (confirmed, planning doc §8/§25).
export async function getProjects(filters?: ProjectFilters) {
  const params: Record<string, string> = {
    populate: "phase,coverImage",
    sort: "createdAt:desc",
  };
  if (filters?.phaseSlug) {
    params["filters[phase][slug][$eq]"] = filters.phaseSlug;
  }
  if (filters?.location) {
    params["filters[location][$containsi]"] = filters.location;
  }
  return strapiList<Project>("/projects", params);
}

export async function getAllPhases() {
  return strapiList<ProjectStatus>("/project-statuses", {
    sort: "order:asc",
  });
}

export async function getProjectBySlug(slug: string) {
  const projects = await strapiList<Project>("/projects", {
    "filters[slug][$eq]": slug,
    populate: "phase,coverImage,gallery,relatedProjects,relatedProjects.phase,relatedProjects.coverImage",
    "pagination[limit]": "1",
  });
  return projects[0] ?? null;
}
