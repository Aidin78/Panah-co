import Image from "next/image";
import { strapiMediaUrl } from "@/lib/strapi";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl">
      <Image
        src={strapiMediaUrl(service.image.url)}
        alt={service.image.alternativeText ?? service.name}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-umber-deep/90 via-umber-deep/10 to-transparent" />
      <div className="relative z-10 p-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-plaster">
          {service.name}
        </h3>
      </div>
    </div>
  );
}
