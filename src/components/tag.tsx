import clsx from "clsx";

export function Tag({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "accent"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
