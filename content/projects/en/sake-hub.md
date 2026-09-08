---
title: Sake Hub
summary: An offline app to explore and study sake. A catalogue with tasting notes and pairings, a 167-term glossary, a learning deck with spaced repetition, and quizzes, all in a single HTML file.
date: 2026-07-05
kind: tool
tags: [tool, sake, learning, offline, vanilla-js]
status: released
engine: Single-file HTML
cover: /images/projects/sake-hub.svg
screenshots:
  - src: /images/projects/sake-hub-home.png
    caption: The catalogue in the "Kuro" dark theme, with filters by brewery, prefecture and type.
featured: false
sale:
  mode: free
requirements:
  - Any modern browser. The app is one HTML file plus an images folder and works without a server or an internet connection.
---

## What it is

Sake Hub started as a study aid for a sake course and grew into a small personal encyclopedia. It runs entirely offline from a single HTML file: no install, no account, no server. Your notes and progress stay in the browser, and a JSON export carries everything, images included, to another device.

## What is inside

- **Catalogue**: bottles with photos, vertical Japanese labels, origin map, tags and tasting radar. A personal cellar tracks what you want to try, what you own and what you have tasted, with star ratings, price and where you bought it.
- **Pairings**: recommended dishes and serving temperature for each sake type, with sources.
- **Glossary**: 167 terms grouped by category and cross-linked to the bottles and lessons where they appear.
- **Learning**: lesson cards with flashcards and spaced repetition using the SM-2 algorithm, daily review queue, streaks and per-topic progress.
- **Quiz**: quick games, saved quizzes and a question bank, generated automatically or written by hand.
- **Admin mode**: curate the standard content and export a content pack, so the catalogue can be updated without touching anyone's personal data.

## How it was built

The whole app is vanilla JavaScript with a small build script that inlines CSS, JS, fonts and icons into one distributable file. The fourth version was a complete visual redesign, "Kuro": black lacquer and a single gold accent, dark first, with an embedded font and inlined icon set so it still works offline. User images live in IndexedDB rather than localStorage to get past the five-megabyte limit.

Everything, from the first prototype to the design system document that guided the redesign, was built with Claude Code. A fifth version as a proper web app with a shared database is in progress.

## Status

Released as a personal tool. Not hosted here because of the size of the image library; a public web version will come with v5.
