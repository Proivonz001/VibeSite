import Image from "next/image";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { KindIcon } from "./kind-icon";
import { Tag } from "./tag";
import { GitHubIcon } from "./icons";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ProjectMeta } from "@/lib/content";

export function statusLabel(status: ProjectMeta["status"], d: Dictionary) {
  return d.projects.status[status];
}

export function ProjectCard({
  project,
  locale,
  d,
}: {
  project: ProjectMeta;
  locale: Locale;
  d: Dictionary;
}) {
  const href = localePath(locale, `/projects/${project.slug}`);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-accent/50 hover:shadow-md">
      <Link href={href} className="relative block aspect-[16/9] w-full overflow-hidden bg-muted">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            unoptimized={project.cover.endsWith(".svg")}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <KindIcon kind={project.kind} className="size-10" />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold leading-tight">
            <KindIcon kind={project.kind} className="size-4 shrink-0 text-muted-foreground" />
            <Link href={href} className="hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <Tag tone={project.status === "released" ? "accent" : "muted"}>
            {statusLabel(project.status, d)}
          </Tag>
        </div>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.engine && <Tag>{project.engine}</Tag>}
          {project.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          <span className="ml-auto flex items-center gap-2 text-muted-foreground">
            {project.play && (
              <span title={d.projects.playNow}>
                <Gamepad2 className="size-4" />
              </span>
            )}
            {project.repo && (
              <span title={d.projects.viewSource}>
                <GitHubIcon className="size-4" />
              </span>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}
