import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.blog.title, description: d.blog.intro };
}

export default async function BlogPage() {
  const d = await getDictionary();
  return (
    <Container>
      <PageHeader title={d.blog.title} intro={d.blog.intro} />
      <EmptyState message={d.blog.empty} />
    </Container>
  );
}
