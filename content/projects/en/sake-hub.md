---
title: Sake Hub
summary: A site to learn sake, one sip at a time. A curated catalogue, a 167-term linked glossary and a study path of 234 cards, with accounts for personal notes and an admin area for the content.
date: 2026-09-08
kind: tool
tags: [tool, sake, learning, nextjs, supabase]
demo: https://sake-hub.vercel.app/
status: released
engine: Next.js + Supabase
cover: /images/projects/sake-hub.svg
screenshots:
  - src: /images/projects/sake-hub-v5.png
    caption: The public site, version 5.1, with catalogue, glossary and study path.
  - src: /images/projects/sake-hub-home.png
    caption: Version 4, the offline single-file app that came before, in its "Kuro" dark theme.
featured: false
sale:
  mode: free
requirements:
  - Nothing. It is a public website; an account is only needed to save personal notes.
---

## What it is

Sake Hub started as a study aid for a sake course and became a small public encyclopedia. The current version is a website: a catalogue of bottles with type, prefecture, brewery and tasting profile, a glossary where every term links to the bottles and lessons it appears in, and a study path that takes you through the topics card by card. Sign in and you can keep notes and favourites on each sake.

## The road to version 5

- **v1 to v3** were offline single-file HTML apps built for personal use: catalogue, glossary, flashcards with spaced repetition, quizzes, a personal cellar.
- **v4** was a complete visual redesign, "Kuro": black lacquer, a single gold accent, embedded font and icon set, everything still in one file that works without a server.
- **v5** rebuilt it as a Next.js site on Supabase so the content could be shared: static pages regenerated on demand, an admin area to curate bottles, glossary and lessons, image storage, authentication with password recovery.
- **v5.1** was a hardening pass: database constraints that make renames atomic and block accidental deletions, sake archived instead of deleted, a protected revalidation endpoint, native dialogs with proper focus handling, filters kept in the URL so views can be shared, sitemap, Open Graph and a proper 404.

## How it was built

Every version was built with Claude Code, including the design system document that guided the v4 redesign and the review of v5 that produced v5.1. The content itself, tasting profiles and pairings included, was curated by hand from course material and reference sources.

## Status

Live and growing. The site is in Italian.
