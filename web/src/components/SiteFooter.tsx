import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.phones?.[0];
  const instagram = settings?.socialLinks?.instagram;

  return (
    <footer className="border-t border-line px-6 py-8 font-[family-name:var(--font-fa)] text-sm text-ink-soft sm:px-10">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {settings?.companyName ?? "گروه ساختمانی پناه"}
        </p>
        <div className="flex items-center gap-6">
          {phone && (
            <a href={`tel:${phone}`} className="hover:text-ink" dir="ltr">
              {phone}
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              اینستاگرام
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
