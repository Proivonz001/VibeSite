import Link from "next/link";
import { Hammer } from "lucide-react";
import { AuthorBadge } from "./author-badge";
import { Tag } from "./tag";
import { localePath, type Locale } from "@/i18n/config";
import { formatDate, type PostMeta } from "@/lib/content";

export function PostCard({
  post,
  locale,
  projectTitle,
  authorLabel,
}: {
  post: PostMeta;
  locale: Locale;
  projectTitle?: string;
  /** Badge text for the post's author (AI / PA). */
  authorLabel?: string;
}) {
  const href = localePath(locale, `/blog/${post.slug}`);
  return (
    <article className="flex flex-col gap-2 border-b border-border py-6 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        {authorLabel && <AuthorBadge author={post.author} label={authorLabel} />}
        {projectTitle && (
          <span className="inline-flex items-center gap-1 text-accent">
            <Hammer className="size-3" />
            {projectTitle}
            {post.step ? ` · ${post.step}` : ""}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold leading-tight">
        <Link href={href} className="hover:text-accent">
          {post.title}
        </Link>
      </h3>
      <p className="text-muted-foreground">{post.summary}</p>
      {post.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}
