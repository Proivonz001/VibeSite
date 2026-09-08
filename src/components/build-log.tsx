import Link from "next/link";
import { BuildLogList } from "./build-log-list";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatDate, type Entry, type PostMeta } from "@/lib/content";

export type BuildLogItem = {
  href: string;
  step: number;
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  author: "claude" | "priamo";
  authorLabel: string;
};

export function BuildLog({
  posts,
  locale,
  d,
}: {
  posts: Entry<PostMeta>[];
  locale: Locale;
  d: Dictionary;
}) {
  if (posts.length === 0) return null;
  const items: BuildLogItem[] = posts.map((p, i) => ({
    href: localePath(locale, `/blog/${p.meta.slug}`),
    step: p.meta.step ?? i + 1,
    date: p.meta.date,
    dateLabel: formatDate(p.meta.date, locale),
    title: p.meta.title,
    summary: p.meta.summary,
    author: p.meta.author,
    authorLabel: d.authors[p.meta.author].badge,
  }));
  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{d.buildlog.title}</h2>
        <p className="mt-1 text-muted-foreground">{d.buildlog.intro}</p>
      </div>
      <BuildLogList
        items={items}
        readLabel={d.buildlog.readMore}
        showAllLabel={d.buildlog.showAll.replace("{n}", String(items.length))}
        showLessLabel={d.buildlog.showLess}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href={localePath(locale, "/blog")} className="hover:text-foreground">
          {d.blog.title} →
        </Link>
      </p>
    </section>
  );
}
