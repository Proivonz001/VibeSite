"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileNav({
  items,
  label,
}: {
  items: { href: string; label: string }[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-14 border-b border-border bg-background p-4 shadow-lg">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
