import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function HomePage() {
  const locale = await getLocale();
  const d = await getDictionary();

  return (
    <Container>
      <section className="py-12 sm:py-20">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          {d.home.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {d.home.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, "/projects")}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            {d.home.ctaProjects}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={localePath(locale, "/blog")}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            {d.home.ctaBlog}
          </Link>
        </div>
      </section>

      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {d.home.latestProjects}
          </h2>
          <Link
            href={localePath(locale, "/projects")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {d.home.viewAll}
          </Link>
        </div>
        <EmptyState message={d.projects.empty} />
      </section>

      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {d.home.latestPosts}
          </h2>
          <Link
            href={localePath(locale, "/blog")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {d.home.viewAll}
          </Link>
        </div>
        <EmptyState message={d.blog.empty} />
      </section>
    </Container>
  );
}
