"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type LightboxImage = { src: string; caption?: string; alt?: string };

export type LightboxLabels = { close: string; prev: string; next: string; zoom: string };

/**
 * Renders `children` (any clickable thumbnails) and a full-screen viewer.
 * Call `open(index)` from the render prop to show an image.
 */
export function Lightbox({
  images,
  labels,
  children,
}: {
  images: LightboxImage[];
  labels: LightboxLabels;
  children: (open: (index: number) => void) => ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);
  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);
  const step = useCallback(
    (delta: number) => {
      setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      {children(open)}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-black/90 p-0 text-white backdrop:bg-black/80"
      >
        {current && (
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm text-white/70">
                {images.length > 1 ? `${index! + 1} / ${images.length}` : ""}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="rounded-md p-2 hover:bg-white/10"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1" onClick={close}>
              <Image
                src={current.src}
                alt={current.alt ?? current.caption ?? ""}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={labels.prev}
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70"
                  >
                    <ChevronLeft className="size-7" />
                  </button>
                  <button
                    type="button"
                    aria-label={labels.next}
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70"
                  >
                    <ChevronRight className="size-7" />
                  </button>
                </>
              )}
            </div>
            {current.caption && (
              <p className="p-4 text-center text-sm text-white/80">{current.caption}</p>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

/** A single image that opens itself in the lightbox when clicked. */
export function ZoomImage({
  src,
  alt,
  caption,
  labels,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt?: string;
  caption?: string;
  labels: LightboxLabels;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Lightbox images={[{ src, alt, caption }]} labels={labels}>
      {(open) => (
        <button
          type="button"
          onClick={() => open(0)}
          title={labels.zoom}
          className={"group relative block w-full cursor-zoom-in " + (className ?? "")}
        >
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            priority={priority}
            unoptimized={src.endsWith(".svg")}
            sizes={sizes ?? "100vw"}
            className="object-cover transition group-hover:opacity-95"
          />
        </button>
      )}
    </Lightbox>
  );
}
