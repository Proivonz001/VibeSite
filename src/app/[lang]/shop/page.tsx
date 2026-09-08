import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShoppingCart } from "lucide-react";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { KindIcon } from "@/components/kind-icon";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.shop.title, description: d.shop.intro };
}

export default async function ShopPage() {
  const locale = await getLocale();
  const d = await getDictionary();
  const projects = (await getProjects(locale)).filter(
    (p) => p.meta.sale && p.meta.sale.mode !== "free",
  );

  return (
    <Container>
      <PageHeader title={d.shop.title} intro={d.shop.intro} />
      {projects.length === 0 ? (
        <EmptyState message={d.shop.empty} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map(({ meta }) => {
            const sale = meta.sale!;
            return (
              <article
                key={meta.slug}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <KindIcon kind={meta.kind} className="size-4" />
                  {d.projects.kinds[meta.kind]}
                </div>
                <h2 className="text-xl font-semibold">
                  <Link href={localePath(locale, `/projects/${meta.slug}`)} className="hover:text-accent">
                    {meta.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">{meta.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  {sale.mode === "checkout" ? (
                    <>
                      <span className="text-lg font-semibold">
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: sale.currency,
                        }).format(sale.price)}
                      </span>
                      <a
                        href={sale.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90"
                      >
                        <ShoppingCart className="size-4" />
                        {d.shop.buy}
                      </a>
                    </>
                  ) : (
                    <>
                      <Tag>{d.shop.licensing}</Tag>
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent(`${meta.title}: licensing`)}`}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted"
                      >
                        <Mail className="size-4" />
                        {d.shop.contact}
                      </a>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Container>
  );
}
