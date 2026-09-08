import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { PostFilter } from "@/components/post-filter";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getPosts, getProjects } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.blog.title, description: d.blog.intro };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const d = await getDictionary();
  const [posts, projects] = await Promise.all([getPosts(locale), getProjects(locale)]);
  const titleOf = new Map(projects.map((p) => [p.meta.slug, p.meta.title]));

  return (
    <Container>
      <PageHeader title={d.blog.title} intro={d.blog.intro} />
      {posts.length === 0 ? (
        <EmptyState message={d.blog.empty} />
      ) : (
        <PostFilter
          allLabel={d.blog.all}
          groups={[
            { key: "general", label: d.blog.general },
            ...projects.map((p) => ({ key: p.meta.slug, label: p.meta.title })),
          ]}
          items={posts.map((p) => ({
            group: p.meta.project ?? "general",
            card: (
              <PostCard
                post={p.meta}
                locale={locale}
                projectTitle={p.meta.project ? titleOf.get(p.meta.project) : undefined}
                authorLabel={d.authors[p.meta.author].badge}
              />
            ),
          }))}
        />
      )}
    </Container>
  );
}
