// Mirrors the Strapi content-type schemas in cms/src/api/*/content-types.
// Keep in sync manually — see docs/product-planning.md §15 for the source model.

export interface StrapiMedia {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface ProjectStatus {
  id: number;
  name: string;
  slug: string;
  order: number;
  color: string | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  // Named "phase" not "status" — Strapi 5 reserves the "status" attribute
  // name on content types with draftAndPublish enabled.
  phase: ProjectStatus | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
  shortDescription: string;
  description: string;
  coverImage: StrapiMedia;
  gallery: StrapiMedia[];
  areaSqm: number | null;
  unitCount: number | null;
  startDate: string | null;
  completionDate: string | null;
  architectureInfo: string | null;
  constructionInfo: string | null;
  features: string[] | null;
  videoUrl: string | null;
  tags: string[] | null;
  relatedProjects: Project[];
  featured: boolean;
  spotlight: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string | null;
  image: StrapiMedia;
  order: number;
  relatedProjects: Project[];
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  coverImage: StrapiMedia;
  category: ArticleCategory | null;
  tags: string[] | null;
  body: string;
  relatedProject: Project | null;
  publishedDate: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

export type MessageType = "general" | "partnership";
export type MessageStatus = "new" | "contacted" | "closed";

export interface SiteSettings {
  companyName: string;
  tagline: string | null;
  logo: StrapiMedia;
  phones: string[] | null;
  email: string | null;
  address: string | null;
  mapLatitude: number | null;
  mapLongitude: number | null;
  socialLinks: Record<string, string> | null;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: StrapiMedia;
}
