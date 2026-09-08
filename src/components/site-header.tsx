import Link from "next/link";
import { GitHubIcon } from "./icons";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export function navItems(locale: Locale, d: Dictionary) {
  return [
    { href: localePath(locale, "/projects"), label: d.nav.projects },
    { href: localePath(locale, "/blog"), label: d.nav.blog },
    { href: localePath(locale, "/shop"), label: d.nav.shop },
    { href: localePath(locale, "/about"), label: d.nav.about },
  ];
}

export function SiteHeader({ locale, d }: { locale: Locale; d: Dictionary }) {
  const items = navItems(locale, d);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href={localePath(locale)}
          className="font-semibold tracking-tight hover:text-accent"
        >
          {d.site.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label={d.nav.github}
            title={d.nav.github}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
          <ThemeToggle label={d.nav.toggleTheme} />
          <MobileNav items={items} label={d.nav.menu} />
        </div>
      </Container>
    </header>
  );
}
