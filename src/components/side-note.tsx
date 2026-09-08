import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Margin comment inside a post. On large screens it floats into the right
 * margin next to the paragraph it follows; on small screens it is an inline callout.
 * Used from MDX as <PA>...</PA> and <AI>...</AI>.
 */
export function SideNote({
  by,
  label,
  children,
}: {
  by: "priamo" | "claude";
  label: string;
  children: ReactNode;
}) {
  const ai = by === "claude";
  return (
    <aside
      className={
        "not-prose my-4 rounded-lg border p-3 text-sm leading-relaxed " +
        "lg:float-right lg:clear-right lg:-mr-[300px] lg:my-0 lg:mb-4 lg:w-[260px] " +
        (ai
          ? "border-accent/40 bg-accent/5"
          : "border-amber-500/40 bg-amber-500/5")
      }
    >
      <span
        className={
          "mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide " +
          (ai ? "text-accent" : "text-amber-600 dark:text-amber-400")
        }
      >
        {ai ? <Sparkles className="size-3" /> : <span className="rounded-full border border-current px-1">PA</span>}
        {label}
      </span>
      <div className="text-foreground/90">{children}</div>
    </aside>
  );
}
