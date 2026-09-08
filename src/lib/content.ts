import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/i18n/config";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ProjectStatus = "released" | "beta" | "wip" | "prototype";
export type ProjectKind = "game" | "mcp" | "tool";
export const projectKinds: ProjectKind[] = ["game", "mcp", "tool"];

export type Screenshot = { src: string; caption?: string };
export type ToolEntry = { name: string; description: string };
export type InstallStep = { label: string; command: string };
export type Sale =
  | { mode: "free" }
  | { mode: "contact"; note?: string }
  | { mode: "checkout"; price: number; currency: string; url: string };

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, used for ordering. */
  date: string;
  kind: ProjectKind;
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
  /** MCP servers and tools: the tools they expose. */
  tools?: ToolEntry[];
  /** What the user needs before running it. */
  requirements?: string[];
  /** Copy-paste installation commands. */
  install?: InstallStep[];
  /** How the project is distributed; drives the Shop page. */
  sale?: Sale;
};

export type PostAuthor = "claude" | "priamo";

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  /** Who wrote the post: the AI that wrote the code, or the site owner. Defaults to priamo. */
  author: PostAuthor;
  /** Date of the events told, for build-log posts written after the fact. */
  date: string;
  tags: string[];
  cover?: string;
  /** Slug of the project this post belongs to (makes it part of that project's build log). */
  project?: string;
  /** Position in the project's build log, 1-based. */
  step?: number;
  /** ISO date the post was actually written, when different from `date`. */
  written?: string;
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

function normalizeProject(entry: Entry<ProjectMeta>): Entry<ProjectMeta> {
  const meta = entry.meta;
  const rawDate: unknown = meta.date;
  const date = rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate);
  return {
    ...entry,
    meta: { ...meta, date, kind: meta.kind ?? "tool", tags: meta.tags ?? [] },
  };
}

export const getProjects = async (locale: Locale) =>
  (await readAll<ProjectMeta>("projects", locale)).map(normalizeProject);
export const getProject = async (locale: Locale, slug: string) => {
  const entry = await readOne<ProjectMeta>("projects", locale, slug);
  return entry ? normalizeProject(entry) : null;
};

function normalizePost(entry: Entry<PostMeta>): Entry<PostMeta> {
  const meta = entry.meta;
  const rawDate: unknown = meta.date;
  const rawWritten: unknown = meta.written;
  const toIso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : undefined);
  return { ...entry, meta: { ...meta, date: toIso(rawDate)!, written: toIso(rawWritten), tags: meta.tags ?? [], author: meta.author ?? "priamo" } };
}

export const getPosts = async (locale: Locale) =>
  (await readAll<PostMeta>("blog", locale)).map(normalizePost);
export const getPost = async (locale: Locale, slug: string) => {
  const entry = await readOne<PostMeta>("blog", locale, slug);
  return entry ? normalizePost(entry) : null;
};

/** Posts of a project's build log, oldest first, ordered by step then date. */
export async function getBuildLog(locale: Locale, projectSlug: string) {
  const posts = (await getPosts(locale)).filter((p) => p.meta.project === projectSlug);
  return posts.sort((a, b) => (a.meta.step ?? 0) - (b.meta.step ?? 0) || (a.meta.date < b.meta.date ? -1 : 1));
}

export function formatDate(iso: string | Date, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "it" ? "it-IT" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
