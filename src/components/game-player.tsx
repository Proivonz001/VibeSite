"use client";

import { Maximize2 } from "lucide-react";
import { useRef } from "react";

export function GamePlayer({
  src,
  title,
  labels,
}: {
  src: string;
  title: string;
  labels: { fullscreen: string };
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const goFullscreen = () => {
    frameRef.current?.requestFullscreen?.();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black">
      <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2">
        <span className="text-sm font-medium">{title}</span>
        <button
          type="button"
          onClick={goFullscreen}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Maximize2 className="size-3.5" />
          {labels.fullscreen}
        </button>
      </div>
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        allow="fullscreen; autoplay"
        allowFullScreen
        className="block aspect-video w-full"
      />
    </div>
  );
}
