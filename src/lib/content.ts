import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/i18n/config";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ProjectStatus = "released" | "beta" | "wip" | "prototype";

export type Screenshot = { src: string; caption?: string };

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, used for ordering. */
  date: string;
  tags: string[];
  /** GitHub repository as "owner/name". Optional for local-only projects. */
  repo?: string;
  status: ProjectStatus;
  /** Path to a cover image under /public. */
  cover?: string;
  /** Extra images shown as a gallery on the project page. */
  screenshots?: Screenshot[];
  /** Public path of a playable web build (e.g. /games/effuan/index.html). */
  play?: string;
  /** External live demo URL. */
  demo?: string;
  /** Engine or main technology, shown as a badge. */
  engine?: string;
  featured?: boolean;
  /** Set when the project is sold in the shop. */
  price?: { amount: number; currency: string; checkoutUrl: string };
};

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  cover?: string;
};

export type Entry<M> = { meta: M; body: string };

type Kind = "projects" | "blog";

async function listFiles(kind: Kind, locale: Locale): Promise<{ dir: string; files: string[] }> {
  const candidates = locale === defaultLocale ? [locale] : [locale, defaultLocale];
  for (const loc of candidates) {
    const dir = path.join(CONTENT_ROOT, kind, loc);
    try {
      const files = (await fs.readdir(dir)).filter((f) => /\.mdx?$/.test(f));
      if (files.length > 0) return { dir, files };
    } catch {
      // directory missing: try the next candidate
    }
  }
  return { dir: "", files: [] };
}

async function readEntry<M extends { slug: string }>(
  filePath: string,
  slug: string,
): Promise<Entry<M>> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  return { meta: { ...(data as Omit<M, "slug">), slug } as M, body: content };
}

async function readAll<M extends { slug: string; date: string }>(
  kind: Kind,
  locale: Locale,
): Promise<Entry<M>[]> {
  const { dir, files } = await listFiles(kind, locale);
  const entries = await Promise.all(
    files.map((f) => readEntry<M>(path.join(dir, f), f.replace(/\.mdx?$/, ""))),
  );
  return entries
    .filter((e) => !("draft" in e.meta && (e.meta as { draft?: boolean }).draft))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

async function readOne<M extends { slug: string; date: string }>(
  kind: Kind,
  locale: Locale,
  slug: string,
): Promise<Entry<M> | null> {
  const all = await readAll<M>(kind, locale);
  return all.find((e) => e.meta.slug === slug) ?? null;
}

export const getProjects = (locale: Locale) => readAll<ProjectMeta>("projects", locale);
export const getProject = (locale: Locale, slug: string) =>
  readOne<ProjectMeta>("projects", locale, slug);

export const getPosts = (locale: Locale) => readAll<PostMeta>("blog", locale);
export const getPost = (locale: Locale, slug: string) => readOne<PostMeta>("blog", locale, slug);

export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "it" ? "it-IT" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
