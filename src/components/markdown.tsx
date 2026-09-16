import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Children, isValidElement, type ReactNode } from "react";
import { SideNote } from "./side-note";
import { ZoomImage, type LightboxLabels } from "./lightbox";
import type { Dictionary } from "@/i18n/dictionaries";

export function Markdown({ source, d }: { source: string; d: Dictionary }) {
  const labels: LightboxLabels = d.lightbox;
  const components = {
    PA: ({ children }: { children?: ReactNode }) => (
      <SideNote by="priamo" label={d.authors.priamo.note}>
        {children}
      </SideNote>
    ),
    AI: ({ children }: { children?: ReactNode }) => (
      <SideNote by="claude" label={d.authors.claude.note}>
        {children}
      </SideNote>
    ),
    // A paragraph that only holds an image is unwrapped: the lightbox renders a
    // <dialog>, which is not allowed inside <p> and would break hydration.
    p: ({ children }: { children?: ReactNode }) => {
      const items = Children.toArray(children);
      const only = items.length === 1 ? items[0] : null;
      if (only && isValidElement(only) && typeof (only.props as { src?: unknown }).src === "string") {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
    img: ({ src, alt }: { src?: string; alt?: string }) =>
      src ? (
        <span className="not-prose my-6 block">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
            <ZoomImage src={src} alt={alt} caption={alt} labels={labels} fit="contain" sizes="(min-width: 1024px) 700px, 100vw" />
          </span>
          {alt && <span className="mt-2 block text-center text-sm text-muted-foreground">{alt}</span>}
        </span>
      ) : null,
  };
  return (
    <div className="prose prose-stone max-w-none dark:prose-invert prose-a:text-accent prose-headings:tracking-tight">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
