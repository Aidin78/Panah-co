import { strapiList, strapiOne } from "./strapi";
import type { Project, Service, SiteSettings } from "./types";

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
