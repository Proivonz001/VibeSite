import { GitFork, Star, Scale, Code2, Clock } from "lucide-react";
import { GitHubIcon } from "./icons";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatDate } from "@/lib/content";
import { getRepoInfo } from "@/lib/github";

export async function GitHubStats({
  repo,
  locale,
  d,
}: {
  repo: string;
  locale: Locale;
  d: Dictionary;
}) {
  const info = await getRepoInfo(repo);
  const url = info?.url ?? `https://github.com/${repo}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 font-medium hover:text-accent"
      >
        <GitHubIcon className="size-5" />
        {repo}
      </a>
      {info ? (
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Stat icon={<Star className="size-4" />} label={d.github.stars} value={info.stars} />
          <Stat icon={<GitFork className="size-4" />} label={d.github.forks} value={info.forks} />
          {info.language && (
            <Stat icon={<Code2 className="size-4" />} label={d.github.language} value={info.language} />
          )}
          {info.license && (
            <Stat icon={<Scale className="size-4" />} label={d.github.license} value={info.license} />
          )}
          <Stat
            icon={<Clock className="size-4" />}
            label={d.github.lastPush}
            value={formatDate(info.pushedAt, locale)}
          />
        </dl>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{d.github.unavailable}</p>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="font-medium">{value}</dd>
      </div>
    </div>
  );
}
