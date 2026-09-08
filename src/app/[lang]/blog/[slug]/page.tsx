import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/tag";
import { enabledLocales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatDate, getPost, getPosts } from "@/lib/content";

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

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = await getDictionary();
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const { meta, body } = post;

  return (
    <Container className="max-w-3xl">
      <Link
        href={localePath(locale, "/blog")}
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {d.blog.backToList}
      </Link>
      <article>
        <time dateTime={meta.date} className="text-sm text-muted-foreground">
          {formatDate(meta.date, locale)}
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{meta.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{meta.summary}</p>
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
      </article>
    </Container>
  );
}
