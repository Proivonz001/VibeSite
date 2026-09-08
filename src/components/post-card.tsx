import Link from "next/link";
import { Tag } from "./tag";
import { localePath, type Locale } from "@/i18n/config";
import { formatDate, type PostMeta } from "@/lib/content";

export function PostCard({ post, locale }: { post: PostMeta; locale: Locale }) {
  const href = localePath(locale, `/blog/${post.slug}`);
  return (
    <article className="flex flex-col gap-2 border-b border-border py-6 first:pt-0">
      <time dateTime={post.date} className="text-xs text-muted-foreground">
        {formatDate(post.date, locale)}
      </time>
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
