const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function strapiMediaUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

async function strapiFetch<T>(path: string, params?: Record<string, string>) {
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

export { strapiFetch, STRAPI_URL };
