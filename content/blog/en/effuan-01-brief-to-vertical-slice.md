---
title: A brief, an empty repo and a playable game before lunch
summary: EFFUAN started as a one-page concept brief pasted into a chat at eight in the morning. By half past nine there was a complete career loop to play, and the first feedback round was already reshaping it.
date: 2026-07-22
written: 2026-09-08
project: effuan
step: 1
tags: [effuan, godot, game-design, claude-code]
---

Every project on this site started with a conversation. This one started with a document.

On the morning of 22 July I created an empty repository on GitHub, opened Claude Code, and pasted a brief I had been writing for a few days: "Modern minimalist F1 manager, Godot 4". The idea was a hybrid of two games I love for opposite reasons. *Golden Lap* for its clean 2D look and its pace: a race lasts a few minutes and there is no menu bloat. *Motorsport Manager Mobile 3* for its technical depth: ERS deployment, DRS, tyres with a thermal window, undercuts. I wanted races of five to eight real minutes where every decision is a strategy call, on top of a season with promotion and relegation.

The first thing I asked was not to write code. It was to talk.

> Connect to this repo, read this, and let's discuss before starting.

## Deciding the foundations

The brief left the big questions open, and the first hour went into them. How do the reference games actually simulate a race? The answer, pieced together from developer diaries and community reverse-engineering, was that none of them run real physics. Motorsport Manager moves cars along a "time cost" model per track section; Golden Lap keeps the whole race as numbers and only draws dots on a map. That settled the engine design: a **segment-based simulation** with a fixed tick, where each car's pace per segment comes from tyres, fuel, ERS mode, driver skill and the car in front. The visuals would be a projection of that state, not the other way round.

The second question was graphics. I asked how much harder 2.5D or 3D would be in Godot. The honest answer was a scale from one to five stars, and 2D top-down vector graphics were the one-star option that matched the brief anyway. We stayed in 2D. Two months later, that choice would be questioned again, and it would survive.

The third question was season structure. Golden Lap has short single-series seasons, Motorsport Manager has tiers you climb. I chose tiers: you start mid-grid in "Series Two" with promotion as the goal, six rounds per season, so that a full season fits in an evening.

## Milestone 1 in forty minutes

At 08:21 Claude found the portable Godot 4.7 I keep in another folder and started. By 08:51 the first two commits were on GitHub: a data layer of `.tres` resources for compounds, drivers, teams and tracks; a tyre model with wear and temperature; the segment engine; and a race view where twenty cars ran twenty-five laps in about four minutes, with a live leaderboard and a working pit wall. It was ugly, it was a test track, and it was already a race.

Then I asked for the whole thing.

> Continue on your own, we need all the base points in, so I can try a vertical slice of the game and decide what works and what we need to change. Ask me questions if you need to, even during the process.

It asked four questions, I answered, and at 09:39 the vertical slice was pushed: a season hub, an R&D screen where you pick a development pillar and a risk level, a race weekend with setup and qualifying, dynamic weather with the wet crossover, reliability failures, and the second tier with its own grid. Open Godot, press F5, "New career", and the loop was there.

## The first playtest changes the design

I played one race and wrote down what bothered me. Cars sometimes stopped and restarted on the spot. At 8x speed I could not make decisions. The setup slider had no scale. And I wanted progression to work like in the official F1 game: each driver's weekend performance earns the team experience points, you spend them on upgrades, and upgrades take a number of races to arrive.

Two of these turned out to be the first appearances of problems that would follow the project for weeks. The cars stopping were pit stops with no pit lane, so a car froze on the finish line for two seconds like it had broken down, plus an anti-overlap clamp that pulled cars back a few pixels every tick. Both got a first fix that morning. Neither was the last time we would talk about them.

The XP-based R&D went in exactly as described, and it is still the progression system today. Then, because a race with nothing happening is a boring race, the Safety Car and the race engineer radio came next: a retirement has a 55 percent chance of bringing out the Safety Car, never in the last three laps, the pack bunches up, and the engineer talks to you.

It was 10:17. The game had existed for two and a half hours.
