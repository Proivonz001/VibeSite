import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getPosts } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.blog.title, description: d.blog.intro };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const d = await getDictionary();
  const posts = await getPosts(locale);

  return (
    <Container>
      <PageHeader title={d.blog.title} intro={d.blog.intro} />
      {posts.length === 0 ? (
        <EmptyState message={d.blog.empty} />
      ) : (
        <div className="max-w-2xl">
          {posts.map((p) => (
            <PostCard key={p.meta.slug} post={p.meta} locale={locale} />
          ))}
        </div>
      )}
    </Container>
  );
}
