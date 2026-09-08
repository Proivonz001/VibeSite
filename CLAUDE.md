@AGENTS.md

# VIBESITE conventions

- Portfolio + blog + shop for AI-built projects. Language: English now, structured for Italian later.
- All routes live under `src/app/[lang]/`. `src/proxy.ts` rewrites unprefixed URLs to the default locale (`/projects` -> `/en/projects`), so public links must be built with `localePath()` from `src/i18n/config.ts`.
- UI strings come from `src/i18n/dictionaries/*.json`; read them with `getDictionary()` (uses `next/root-params`). Add `it.json` and put `"it"` in `enabledLocales` to switch on Italian.
- Next 16 quirk: a proxy `matcher` containing regex dots silently never matches, so file-extension filtering is done in code.
- Theme: next-themes with class strategy; colors are CSS tokens in `src/app/globals.css` mapped through `@theme inline`.
- Content (phase 2) goes in `content/projects/<lang>/*.md` and `content/blog/<lang>/*.md`.
- Dev server: `npm run dev -- --port 3111` (see `.claude/launch.json`).
