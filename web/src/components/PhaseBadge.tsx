import type { ProjectStatus } from "@/lib/types";

export function PhaseBadge({ phase }: { phase: ProjectStatus | null }) {
  if (!phase) return null;

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-plaster"
      style={{ backgroundColor: phase.color ?? "var(--color-stone)" }}
    >
      {phase.name}
    </span>
  );
}
