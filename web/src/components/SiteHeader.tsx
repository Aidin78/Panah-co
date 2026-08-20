import Image from "next/image";
import Link from "next/link";
import { strapiMediaUrl } from "@/lib/strapi";
import type { SiteSettings } from "@/lib/types";

const navLinks = [
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/services", label: "خدمات" },
  { href: "/journal", label: "مجله" },
  { href: "/about", label: "درباره ما" },
];

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  return (
    <header className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
      <Link href="/" className="flex items-center">
        {settings?.logo ? (
          <Image
            src={strapiMediaUrl(settings.logo.url)}
            alt={settings.companyName}
            width={120}
            height={38}
            className="h-8 w-auto"
            priority
          />
        ) : (
          <span className="font-[family-name:var(--font-display)] text-lg font-medium">
            پناه
          </span>
        )}
      </Link>

      <nav className="hidden items-center gap-8 font-[family-name:var(--font-fa)] text-sm md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className="rounded-md border border-ink px-5 py-2 font-[family-name:var(--font-fa)] text-sm font-medium transition-colors hover:bg-ink hover:text-plaster"
      >
        تماس با ما
      </Link>
    </header>
  );
}
