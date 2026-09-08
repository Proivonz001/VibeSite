---
title: EFFUAN
summary: A minimalist Formula 1 management game. ERS, DRS, tyre temperatures, dirty air and undercuts, in races that last five to eight real minutes.
date: 2026-08-25
tags: [game, f1, strategy, simulation]
repo: Proivonz001/EFFUAN
status: beta
engine: Godot 4
cover: /images/projects/effuan-race.png
screenshots:
  - src: /images/projects/effuan-hub.png
    caption: Team hub between rounds, with standings, next race and the R&D shop.
  - src: /images/projects/effuan-setup.png
    caption: Pre-race setup, with car balance and per-driver tyre and fuel commitments.
play: /games/effuan/index.html
featured: true
---

## What it is

EFFUAN is a Formula 1 management game that borrows the clean 2D pacing of *Golden Lap* and the technical depth of *Motorsport Manager*. You do not drive: you make the calls from the pit wall.

Every race is a small physical simulation with a fixed timestep. Cars fight for real: an overtake is not an instant swap, the attacker pulls alongside and the verdict lands at the next braking zone, with radio calls for both phases.

## Features

- **Race strategy**: starting compound and fuel mode per driver, ERS deployment, DRS zones, an earned one-lap OVERTAKE boost.
- **Tyre model**: thermal windows, wear, and rain that darkens the asphalt and changes grip.
- **Broadcast presentation**: timing tower, weather column, telemetry bar with vector gauges, and three camera modes (full circuit, TV auto-director, onboard).
- **Real formation grid** on four circuits with realistic box pitch.
- **Custom UI theme** built on Titillium Web, with shared palette and widget factories across every screen.

## How it was built

The whole project was written together with Claude Code, from the physics of the race simulation to the UI kit. The repository keeps a milestone log in its README, so you can follow how the design evolved from a prototype into the current version.

## Status

Playable directly in the browser and in active development. You can also clone the repository and open it with Godot 4.7.
