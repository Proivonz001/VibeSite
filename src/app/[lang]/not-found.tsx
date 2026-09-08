import Link from "next/link";
import { Container } from "@/components/container";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const locale = await getLocale();
  const d = await getDictionary();
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{d.notFound.title}</h1>
      <p className="mt-3 text-muted-foreground">{d.notFound.body}</p>
      <Link
        href={localePath(locale)}
        className="mt-8 inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
      >
        {d.notFound.back}
      </Link>
    </Container>
  );
}
