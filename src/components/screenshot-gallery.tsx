"use client";

import Image from "next/image";
import { Lightbox, type LightboxLabels } from "./lightbox";
import type { Screenshot } from "@/lib/content";

export function ScreenshotGallery({
  items,
  title,
  labels,
}: {
  items: Screenshot[];
  title: string;
  labels: LightboxLabels;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      <Lightbox images={items} labels={labels}>
        {(open) => (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((s, i) => (
              <figure
                key={s.src}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  title={labels.zoom}
                  className="group relative block aspect-[16/9] w-full cursor-zoom-in bg-muted"
                >
                  <Image
                    src={s.src}
                    alt={s.caption ?? ""}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                </button>
                {s.caption && (
                  <figcaption className="px-4 py-2 text-sm text-muted-foreground">
                    {s.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </Lightbox>
    </section>
  );
}
