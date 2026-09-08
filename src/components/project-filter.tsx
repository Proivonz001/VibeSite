"use client";

import clsx from "clsx";
import { useState, type ReactNode } from "react";

export type FilterItem = { kind: string; card: ReactNode };

export function ProjectFilter({
  items,
  labels,
  allLabel,
}: {
  items: FilterItem[];
  /** kind -> label, in display order */
  labels: { kind: string; label: string }[];
  allLabel: string;
}) {
  const [active, setActive] = useState<string>("all");
  const kindsPresent = new Set(items.map((i) => i.kind));
  const tabs = [
    { kind: "all", label: allLabel },
    ...labels.filter((l) => kindsPresent.has(l.kind)),
  ];
  const visible = items.filter((i) => active === "all" || i.kind === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.kind}
            type="button"
            role="tab"
            aria-selected={active === t.kind}
            onClick={() => setActive(t.kind)}
            className={clsx(
              "rounded-full border px-3 py-1 text-sm transition",
              active === t.kind
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((i, idx) => (
          <div key={idx}>{i.card}</div>
        ))}
      </div>
    </div>
  );
}
