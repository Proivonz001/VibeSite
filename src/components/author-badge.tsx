import clsx from "clsx";
import { Sparkles } from "lucide-react";
import type { PostAuthor } from "@/lib/content";

/** Small AI / PA pill. `label` is the badge text from the dictionary. */
export function AuthorBadge({
  author,
  label,
  title,
  size = "sm",
}: {
  author: PostAuthor;
  label: string;
  title?: string;
  size?: "sm" | "md";
}) {
  const ai = author === "claude";
  return (
    <span
      title={title}
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wide",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        ai
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      )}
    >
      {ai && <Sparkles className={size === "sm" ? "size-3" : "size-3.5"} />}
      {label}
    </span>
  );
}
