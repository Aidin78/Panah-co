const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function strapiMediaUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiSingleResponse<T> {
  data: T | null;
  meta: Record<string, unknown>;
}

async function strapiRequest<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${url}`);
  }

  return (await res.json()) as T;
}

export async function strapiList<T>(path: string, params?: Record<string, string>) {
  const res = await strapiRequest<StrapiListResponse<T>>(path, params);
  return res.data;
}

export async function strapiOne<T>(path: string, params?: Record<string, string>) {
  const res = await strapiRequest<StrapiSingleResponse<T>>(path, params);
  return res.data;
}

export { STRAPI_URL };
