import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getProjects, projectKinds } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.projects.title, description: d.projects.intro };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const d = await getDictionary();
  const projects = await getProjects(locale);

  return (
    <Container>
      <PageHeader title={d.projects.title} intro={d.projects.intro} />
      {projects.length === 0 ? (
        <EmptyState message={d.projects.empty} />
      ) : (
        <ProjectFilter
          allLabel={d.projects.all}
          labels={projectKinds.map((k) => ({ kind: k, label: d.projects.kinds[k] }))}
          items={projects.map((p) => ({
            kind: p.meta.kind,
            card: <ProjectCard project={p.meta} locale={locale} d={d} />,
          }))}
        />
      )}
    </Container>
  );
}
