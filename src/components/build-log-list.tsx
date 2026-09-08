"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthorBadge } from "./author-badge";
import type { BuildLogItem } from "./build-log";

const PREVIEW = 4;

export function BuildLogList({
  items,
  readLabel,
  showAllLabel,
  showLessLabel,
}: {
  items: BuildLogItem[];
  readLabel: string;
  showAllLabel: string;
  showLessLabel: string;
}) {
  const [open, setOpen] = useState(items.length <= PREVIEW);
  const visible = open ? items : items.slice(0, PREVIEW);
  const hidden = items.length - visible.length;

  return (
    <div>
      <ol className="relative ml-3 border-l border-border">
        {visible.map((it) => (
          <li key={it.href} className="relative pb-8 pl-8 last:pb-0">
            <span className="absolute -left-[11px] top-1 flex size-[22px] items-center justify-center rounded-full border border-accent bg-background text-[11px] font-semibold text-accent">
              {it.step}
            </span>
            <div className="flex items-center gap-2">
              <time dateTime={it.date} className="text-xs uppercase tracking-wide text-muted-foreground">
                {it.dateLabel}
              </time>
              <AuthorBadge author={it.author} label={it.authorLabel} />
            </div>
            <h3 className="mt-1 text-lg font-semibold leading-snug">
              <Link href={it.href} className="hover:text-accent">
                {it.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.summary}</p>
            <Link href={it.href} className="mt-2 inline-block text-sm text-accent hover:underline">
              {readLabel} →
            </Link>
          </li>
        ))}
      </ol>
      {(hidden > 0 || (open && items.length > PREVIEW)) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-6 ml-3 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          {open ? showLessLabel : showAllLabel}
        </button>
      )}
    </div>
  );
}
