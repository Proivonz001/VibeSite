import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.projects.title, description: d.projects.intro };
}

export default async function ProjectsPage() {
  const d = await getDictionary();
  return (
    <Container>
      <PageHeader title={d.projects.title} intro={d.projects.intro} />
      <EmptyState message={d.projects.empty} />
    </Container>
  );
}
