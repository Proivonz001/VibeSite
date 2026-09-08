import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.about.title, description: d.about.body };
}

export default async function AboutPage() {
  const d = await getDictionary();
  return (
    <Container>
      <PageHeader title={d.about.title} />
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        <p>{d.about.body}</p>
        <p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            {site.github.replace("https://", "")}
          </a>
        </p>
      </div>
    </Container>
  );
}
