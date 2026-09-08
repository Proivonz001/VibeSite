import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return { title: d.shop.title, description: d.shop.intro };
}

export default async function ShopPage() {
  const d = await getDictionary();
  return (
    <Container>
      <PageHeader title={d.shop.title} intro={d.shop.intro} />
      <EmptyState message={d.shop.empty} />
    </Container>
  );
}
