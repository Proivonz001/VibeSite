---
title: BurnMyTokens
summary: A meme site. Paste one prompt into your own AI and it writes glorious garbage on a loop while a public counter adds up the tokens burned. You pay, with your own subscription. Motto, "You paid for it. Use it."
date: 2026-09-15
kind: tool
tags: [tool, meme, cloudflare, hono, typescript]
demo: https://burnmytokens.dev
demoRel: me
status: released
engine: Hono on Cloudflare Workers
cover: /images/projects/burnmytokens.svg
screenshots:
  - src: /images/projects/burnmytokens-home.png
    caption: The home page with the live counter, the prompt generator and the equivalents nobody measured.
  - src: /images/projects/burnmytokens-receipt.png
    caption: The receipt of a finished session, rendered as a PNG by a real browser at the edge. Two rounds, 2,020 tokens, one LED bulb burning for 404 seconds.
  - src: /images/projects/burnmytokens-boards.png
    caption: The milestones board and the session leaderboard, with the verified, names and models tabs.
featured: true
sale:
  mode: free
requirements:
  - Any AI chat that can read a web page (ChatGPT, Claude, Gemini, Grok) or a CLI agent, and your own subscription. No API key, no account, no email.
---

## What it is

BurnMyTokens calls itself the most energy-hungry website in the world, with an estimate of scientific rigour zero. You press one button, get a session code and a prompt, and paste the prompt into whatever AI you already pay for. From then on the AI fetches a pointless writing task, writes it in the chat, reports how many characters it produced, and receives the next task in the same page. A giant public counter goes up. Nothing useful is ever produced. That is the joke, and the site never hides it.

The site never asks for API keys, email, phone or cookies, and it never calls a model itself. Every task is "write this text in the chat" and nothing else. If your AI declines to play along, the site's own words are that it is being sensible.

## The loop

1. The AI reads `/next?s=CODE` and gets a task: forty one-star reviews of air, the terms and conditions for renting a dead battery, the colour of silence in five literary styles.
2. It writes the piece in the chat. Text only.
3. It reads `/report?s=CODE&model=…&chars=…`, which already contains the next task. And so on, until you press "Enough" or fifty rounds run out.

The count is an estimate, four characters per token, because a model inside a chat does not know its own usage and will invent a number if asked. An agent that can read its own logs may add a real token count to the report, and those tokens are shown separately with a green tick.

## What to look at

- **The live counter.** Every round on the site is pushed to every open page through server-sent events, with a feed of the latest waste: who made which model write how many characters, and for which task.
- **The receipts.** A finished session prints a thermal receipt with the rounds as line items, the site totals at close and a "PAID IN FULL" stamp. Whoever burns a round-numbered token gets an edition nobody can buy: every 10,000 is a milestone, every 100,000 rare, every million epic, then legendary and mythic. Repeated digits are cursed and come out as a misprint. The receipt downloads as PNG or as a real 80 mm PDF.
- **The verified board.** Next to the session leaderboard there is a smaller one that only counts tokens the AI reported itself. Nothing on it is an estimate, which makes it the one that matters.
- **The bill.** The site costs about five dollars a month to keep one counter awake. A board shows who paid it, fed by the Ko-fi webhook, and a donor's name appears only if it is already a name claimed on the site. Everything else is an anonymous supporter.

Names work without an account: you take a word and receive a code once, the site keeps only its fingerprint, and if you lose the code the name is gone. That is the whole point of not asking for an email.

## Under the hood

- **Hono and TypeScript on Cloudflare Workers.** The routes receive a store and an event bus and do not know where they run, so the same app works in memory on Node and on Cloudflare in production.
- **D1** holds sessions, rounds and totals. One **Durable Object** owns the live streams and the brake per IP address.
- **Edge cache** in front of the home page, the leaderboard API and the receipt image, checked before the rate limiter so a cached hit never costs a Durable Object call.
- **Browser Rendering** opens the receipt page inside Cloudflare and photographs it, so the PNG carries the holographic paper, the burn marks and the stamps of each edition. The PDF is written by hand, a hundred lines of Courier and no library.
- **No client framework.** Plain HTML, CSS and JavaScript, deliberately ugly, with Courier everywhere.
- More than 250 Vitest tests cover the protocol, the round cap, the stop, the duplicates, the milestones, the receipts and the donations.

## Guardrails

Fifty rounds per session, one report every three seconds, a session expires after two hours of silence. A duplicate report within ninety seconds is not counted, eight uncounted reports in a row close the session, and every response to the AI is a 200, errors included, because a 500 would leave the model without a task and without a STOP. Stopping a session needs the owner's key, which lives in the owner's page and never in the prompt. The pages the AI reads never contain a link outside the site.

## Status

Live at burnmytokens.dev, with the Ko-fi bill open. Built with Claude Code over one week in September 2026. The source stays private for now.
