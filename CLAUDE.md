@AGENTS.md

# VIBESITE conventions

- Portfolio + blog + shop for AI-built projects. Language: English now, structured for Italian later.
- All routes live under `src/app/[lang]/`. `src/proxy.ts` rewrites unprefixed URLs to the default locale (`/projects` -> `/en/projects`), so public links must be built with `localePath()` from `src/i18n/config.ts`.
- UI strings come from `src/i18n/dictionaries/*.json`; read them with `getDictionary()` (uses `next/root-params`). Add `it.json` and put `"it"` in `enabledLocales` to switch on Italian.
- Next 16 quirk: a proxy `matcher` containing regex dots silently never matches, so file-extension filtering is done in code.
- Theme: next-themes with class strategy; colors are CSS tokens in `src/app/globals.css` mapped through `@theme inline`.
- Content (phase 2) goes in `content/projects/<lang>/*.md` and `content/blog/<lang>/*.md`.
- Dev server: `npm run dev -- --port 3111` (see `.claude/launch.json`).
- Games: Godot web exports live in `public/games/<slug>/` and are committed (about 40 MB each, mostly `index.wasm`). Rebuild with `scripts/export-game.ps1 -Project <godot project> -Slug <slug>` (effuan, fct, room-rogue); each project needs an `export_presets.cfg` with a "Web" preset, and 3D projects need `rendering_method.web="gl_compatibility"`. A project's `play` frontmatter points to `/games/<slug>/index.html`; the site wraps it in `/projects/<slug>/play`.
- Project frontmatter (`src/lib/content.ts` is the source of truth): `kind` (game|mcp|tool) drives the filter tabs and icons; `tools`, `requirements`, `install` render the MCP blocks on the detail page; `sale.mode` (free|contact|checkout) decides whether a project appears in the Shop. Covers are hand-made SVGs in `public/images/projects/`, screenshots go in `screenshots:`.
- Blog build logs: a post with `project: <slug>` and `step: n` becomes part of that project's build log (timeline on the project page, "Part n of N" banner and prev/next on the post, filter chip on /blog). `date` is the date of the events; `written` is when the post was actually written (shows the retro note). Transcript digests for writing them: `scratchpad/digest.py` over `~/.claude/projects/<folder>/*.jsonl`.
