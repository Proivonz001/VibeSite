---
title: Room Rogue
summary: A room-based action roguelite that grew through four versions, from procedurally drawn 2D sprites in Python to a 3D port in Godot with stealth, patrols and backstab criticals.
date: 2026-07-05
kind: game
tags: [game, roguelite, 3d, stealth]
status: prototype
engine: Godot 4
cover: /images/projects/rpg-game.svg
play: /games/room-rogue/index.html
---

## What it is

An action roguelite where you clear rooms one at a time. It started as an experiment in how far a Python game could go with graphics generated entirely from code, and ended up as a 3D project in Godot.

## Four versions, one game

The project is organised as parallel versions so that every experiment is kept and comparable:

1. **V1**: pygame, every sprite drawn procedurally. Simple, clean, coherent.
2. **V2**: pygame with 2D Kenney assets (CC0) for the world, items and hero.
3. **V3**: a 3D attempt in Python with Ursina.
4. **V4**: the current line, ported to Godot 4. Real walls with collisions, an animated hero, three enemy types (orc, crab, bee) with patrol routes, vision cones and hearing.

## Gameplay so far

- Walk and sprint with WASD and Shift. Walking is silent, sprinting is not.
- Enemies react to sight and sound, so stealth is a real option.
- Attacking from behind lands a critical hit.
- Health and stamina with an on-screen HUD.

## How it was built

Every version was built with Claude Code. Keeping the old versions around turned out to be the best decision of the project: comparing them side by side is what made the case for moving to a real engine.

## Status

Prototype, playable in the browser as a demo of the current Godot build: one biome, three enemy types, stealth and combat. The interface is in Italian for now.
