import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { GamePlayer } from "@/components/game-player";
import { enabledLocales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of enabledLocales) {
    const projects = await getProjects(lang);
    for (const p of projects) if (p.meta.play) params.push({ lang, slug: p.meta.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]/play">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const d = await getDictionary();
  const project = await getProject(locale, slug);
  if (!project) return {};
  return { title: `${d.projects.playNow}: ${project.meta.title}` };
}

export default async function PlayPage({ params }: PageProps<"/[lang]/projects/[slug]/play">) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = await getDictionary();
  const project = await getProject(locale, slug);
  const playUrl = project?.meta.play;
  if (!project || !playUrl) notFound();
  const { meta } = project;


  return (
    <Container className="max-w-6xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={localePath(locale, `/projects/${meta.slug}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {meta.title}
        </Link>
        <a
          href={playUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          {d.play.openInNewTab}
          <ExternalLink className="size-4" />
        </a>
      </div>

      <GamePlayer src={playUrl} title={meta.title} labels={d.play} />

      <p className="mt-4 text-sm text-muted-foreground">{d.play.hint}</p>
    </Container>
  );
}
