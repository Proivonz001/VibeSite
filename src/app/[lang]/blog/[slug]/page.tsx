import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Hammer } from "lucide-react";
import { Container } from "@/components/container";
import { KindIcon } from "@/components/kind-icon";
import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/tag";
import { enabledLocales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatDate, getBuildLog, getPost, getPosts, getProject } from "@/lib/content";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of enabledLocales) {
    const posts = await getPosts(lang);
    for (const p of posts) params.push({ lang, slug: p.meta.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPost(locale, slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.summary };
}

function monthYear(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "it" ? "it-IT" : "en-GB", {
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = await getDictionary();
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const { meta, body } = post;

  const project = meta.project ? await getProject(locale, meta.project) : null;
  const log = meta.project ? await getBuildLog(locale, meta.project) : [];
  const index = log.findIndex((p) => p.meta.slug === meta.slug);
  const prev = index > 0 ? log[index - 1] : null;
  const next = index >= 0 && index < log.length - 1 ? log[index + 1] : null;

  return (
    <Container className="max-w-5xl">
      <Link
        href={project ? localePath(locale, `/projects/${project.meta.slug}`) : localePath(locale, "/blog")}
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {project ? project.meta.title : d.blog.backToList}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0">
          {project && index >= 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-accent/40 bg-accent/5 px-4 py-2.5 text-sm">
              <Hammer className="size-4 text-accent" />
              <span>
                {d.buildlog.partOf
                  .replace("{n}", String(index + 1))
                  .replace("{total}", String(log.length))
                  .replace("{project}", project.meta.title)}
              </span>
            </div>
          )}
          <time dateTime={meta.date} className="text-sm text-muted-foreground">
            {formatDate(meta.date, locale)}
          </time>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{meta.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{meta.summary}</p>
          {meta.written && meta.written !== meta.date && (
            <p className="mt-3 text-sm italic text-muted-foreground">
              {d.buildlog.retroNote
                .replace("{written}", monthYear(meta.written, locale))
                .replace("{date}", monthYear(meta.date, locale))}
            </p>
          )}
          {meta.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
          <div className="mt-10">
            <Markdown source={body} />
          </div>

          {(prev || next) && (
            <nav className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                {prev && (
                  <Link
                    href={localePath(locale, `/blog/${prev.meta.slug}`)}
                    className="group block rounded-lg border border-border p-4 hover:border-accent/50"
                  >
                    <span className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
                      <ArrowLeft className="size-3" /> {d.buildlog.prev}
                    </span>
                    <span className="mt-1 block font-medium group-hover:text-accent">{prev.meta.title}</span>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={localePath(locale, `/blog/${next.meta.slug}`)}
                    className="group block rounded-lg border border-border p-4 text-right hover:border-accent/50"
                  >
                    <span className="flex items-center justify-end gap-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {d.buildlog.next} <ArrowRight className="size-3" />
                    </span>
                    <span className="mt-1 block font-medium group-hover:text-accent">{next.meta.title}</span>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </article>

        {project && (
          <aside className="lg:pt-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {project.meta.cover && (
                <Link
                  href={localePath(locale, `/projects/${project.meta.slug}`)}
                  className="relative block aspect-[16/9] bg-muted"
                >
                  <Image
                    src={project.meta.cover}
                    alt=""
                    fill
                    unoptimized={project.meta.cover.endsWith(".svg")}
                    sizes="280px"
                    className="object-cover"
                  />
                </Link>
              )}
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{d.buildlog.aboutProject}</p>
                <h2 className="mt-1 flex items-center gap-2 font-semibold">
                  <KindIcon kind={project.meta.kind} className="size-4 text-muted-foreground" />
                  <Link href={localePath(locale, `/projects/${project.meta.slug}`)} className="hover:text-accent">
                    {project.meta.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{project.meta.summary}</p>
                <ol className="mt-4 space-y-1.5 border-l border-border pl-3 text-sm">
                  {log.map((p, i) => (
                    <li key={p.meta.slug}>
                      <Link
                        href={localePath(locale, `/blog/${p.meta.slug}`)}
                        className={
                          p.meta.slug === meta.slug
                            ? "font-medium text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      >
                        {i + 1}. {p.meta.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        )}
      </div>
    </Container>
  );
}
