# VIBESITE

Portfolio, blog and shop for the games, tools and MCP servers I build with AI.

Live: https://vibesite-one.vercel.app

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4. Content is Markdown in the repo
(gray-matter + next-mdx-remote), no CMS. Hosted on Vercel: every push to `main`
deploys to production.

## Develop

```bash
npm ci
npm run dev -- --port 3111
```

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run build`     | Production build (content pages are prerendered) |
| `npm run lint`      | ESLint over the site code                        |
| `npm run typecheck` | Generates route types, then runs `tsc`           |

## Where things live

- Projects: `content/projects/<lang>/*.md`. The frontmatter schema is in `src/lib/content.ts`.
- Blog posts and build logs: `content/blog/<lang>/*.md`.
- Covers, screenshots and post images: `public/images/`.
- UI strings: `src/i18n/dictionaries/*.json` (English only for now).
- Games: Godot web exports in `public/games/<slug>/`. Rebuild one with
  `scripts/export-game.ps1 -Project <godot project> -Slug <slug>`
  (needs Godot 4.7 and its web export templates).
- PDF Editor: static build in `public/tools/pdf-edit/`, source at
  https://github.com/Proivonz001/pdf-editor.

Project conventions for working with Claude Code are in `CLAUDE.md`.
