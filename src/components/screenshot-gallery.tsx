import Image from "next/image";
import type { Screenshot } from "@/lib/content";

export function ScreenshotGallery({
  items,
  title,
}: {
  items: Screenshot[];
  title: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((s) => (
          <figure
            key={s.src}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-[16/9] bg-muted">
              <Image
                src={s.src}
                alt={s.caption ?? ""}
                fill
                sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {s.caption && (
              <figcaption className="px-4 py-2 text-sm text-muted-foreground">
                {s.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
