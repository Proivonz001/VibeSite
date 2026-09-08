"use client";

import clsx from "clsx";
import { useState, type ReactNode } from "react";

export type PostFilterItem = { group: string; card: ReactNode };

export function PostFilter({
  items,
  groups,
  allLabel,
}: {
  items: PostFilterItem[];
  /** group key -> label, in display order */
  groups: { key: string; label: string }[];
  allLabel: string;
}) {
  const [active, setActive] = useState("all");
  const present = new Set(items.map((i) => i.group));
  const tabs = [{ key: "all", label: allLabel }, ...groups.filter((g) => present.has(g.key))];
  const visible = items.filter((i) => active === "all" || i.group === active);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={clsx(
              "rounded-full border px-3 py-1 text-sm transition",
              active === t.key
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="max-w-2xl">
        {visible.map((i, idx) => (
          <div key={idx}>{i.card}</div>
        ))}
      </div>
    </div>
  );
}
