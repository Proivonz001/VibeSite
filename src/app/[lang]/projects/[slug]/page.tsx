import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Gamepad2 } from "lucide-react";
import { Container } from "@/components/container";
import { GitHubIcon } from "@/components/icons";
import { GitHubStats } from "@/components/github-stats";
import { Markdown } from "@/components/markdown";
import { InstallSteps, Requirements, SaleBox, ToolList } from "@/components/mcp-details";
import { statusLabel } from "@/components/project-card";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { Tag } from "@/components/tag";
import { enabledLocales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatDate, getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of enabledLocales) {
    const projects = await getProjects(lang);
    for (const p of projects) params.push({ lang, slug: p.meta.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProject(locale, slug);
  if (!project) return {};
  return {
    title: project.meta.title,
    description: project.meta.summary,
    openGraph: project.meta.cover ? { images: [project.meta.cover] } : undefined,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = await getDictionary();
  const project = await getProject(locale, slug);
  if (!project) notFound();
  const { meta, body } = project;

  return (
    <Container>
      <Link
        href={localePath(locale, "/projects")}
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {d.projects.backToList}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="accent">{d.projects.kinds[meta.kind]}</Tag>
            <Tag>{statusLabel(meta.status, d)}</Tag>
            {meta.engine && <Tag>{meta.engine}</Tag>}
            {meta.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{meta.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {meta.play && (
              <Link
                href={localePath(locale, `/projects/${meta.slug}/play`)}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
              >
                <Gamepad2 className="size-4" />
                {d.projects.playNow}
              </Link>
            )}
            {meta.demo && (
              <a
                href={meta.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <ExternalLink className="size-4" />
                {d.projects.liveDemo}
              </a>
            )}
            {meta.repo && (
              <a
                href={`https://github.com/${meta.repo}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <GitHubIcon className="size-4" />
                {d.projects.viewSource}
              </a>
            )}
          </div>

          {meta.cover && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={meta.cover}
                alt=""
                fill
                priority
                unoptimized={meta.cover.endsWith(".svg")}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-10">
            <Markdown source={body} />
          </div>

          <ToolList tools={meta.tools} d={d} />
          <InstallSteps install={meta.install} d={d} />
          <ScreenshotGallery items={meta.screenshots ?? []} title={d.projects.screenshots} />
        </div>

        <aside className="space-y-6 lg:pt-2">
          <SaleBox meta={meta} d={d} />
          {meta.repo && <GitHubStats repo={meta.repo} locale={locale} d={d} />}
          <Requirements requirements={meta.requirements} d={d} />
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <dt className="text-xs text-muted-foreground">{d.projects.published}</dt>
            <dd className="mt-1 font-medium">{formatDate(meta.date, locale)}</dd>
          </div>
        </aside>
      </div>
    </Container>
  );
}
