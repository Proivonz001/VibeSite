import "server-only";

export type RepoInfo = {
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  description: string | null;
  license: string | null;
};

/**
 * Fetch public repository metadata. Cached for an hour so that the
 * unauthenticated GitHub rate limit (60 req/h) is never a problem.
 * Returns null on any failure so pages still render.
 */
export async function getRepoInfo(repo: string): Promise<RepoInfo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "vibesite",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      url: data.html_url,
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: data.language ?? null,
      pushedAt: data.pushed_at,
      description: data.description ?? null,
      license: data.license?.spdx_id && data.license.spdx_id !== "NOASSERTION"
        ? data.license.spdx_id
        : null,
    };
  } catch {
    return null;
  }
}
