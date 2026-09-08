import { Container } from "./container";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export function SiteFooter({ d }: { d: Dictionary }) {
  return (
    <footer className="mt-auto border-t border-border py-8 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.author}. {d.footer.rights}
        </p>
        <p>{d.footer.builtWith}</p>
      </Container>
    </footer>
  );
}
