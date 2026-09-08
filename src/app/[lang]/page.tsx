import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getPosts, getProjects } from "@/lib/content";

export default async function HomePage() {
  const locale = await getLocale();
  const d = await getDictionary();
  const [projects, posts] = await Promise.all([getProjects(locale), getPosts(locale)]);
  const featured = projects.filter((p) => p.meta.featured);
  const latestProjects = (featured.length > 0 ? featured : projects).slice(0, 3);
  const latestPosts = posts.slice(0, 3);

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
        <SectionHeading
          title={d.home.latestProjects}
          href={localePath(locale, "/projects")}
          linkLabel={d.home.viewAll}
        />
        {latestProjects.length === 0 ? (
          <EmptyState message={d.projects.empty} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((p) => (
              <ProjectCard key={p.meta.slug} project={p.meta} locale={locale} d={d} />
            ))}
          </div>
        )}
      </section>

      <section className="py-8">
        <SectionHeading
          title={d.home.latestPosts}
          href={localePath(locale, "/blog")}
          linkLabel={d.home.viewAll}
        />
        {latestPosts.length === 0 ? (
          <EmptyState message={d.blog.empty} />
        ) : (
          <div className="max-w-2xl">
            {latestPosts.map((p) => (
              <PostCard key={p.meta.slug} post={p.meta} locale={locale} authorLabel={d.authors[p.meta.author].badge} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
        {linkLabel}
      </Link>
    </div>
  );
}
