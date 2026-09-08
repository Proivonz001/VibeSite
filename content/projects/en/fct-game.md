---
title: FCT
summary: A Factorio-inspired automation game. Mine iron, copper and coal, smelt them in furnaces, and route everything with two-lane conveyor belts, splitters and tunnels.
date: 2026-07-20
kind: game
tags: [game, automation, factory]
status: wip
engine: Godot 4
cover: /images/projects/fct-game.svg
play: /games/fct/index.html
featured: true
---

## What it is

FCT is a small automation game in the spirit of *Factorio*. You walk around a map with WASD, place drills on ore patches, feed furnaces with coal, and build belt networks that carry ingots to the central depot. The goal is simple: deliver as much as you can.

## Belt logic, done properly

The fun part of these games is the belt system, so that is where most of the effort went:

- Every belt has **two lanes**; items queue compactly when something blocks them.
- Belts **curve automatically** when they receive from a single side.
- Feeding a belt from the side fills the nearest lane (**side-loading**), so merging two flows needs no special piece.
- **Splitters** have three output arms that you can toggle individually; the flow divides evenly and overflows when an arm is blocked.
- **Tunnels** come in two pieces that pair up on their own within five tiles.
- Building over an existing belt replaces it, so rotating or upgrading never requires demolishing first.

## How it was built

Designed and coded with Claude Code in Godot 4.7. The design document in the repository describes the rules before any code was written, which made the belt behaviour much easier to get right.

## Status

Work in progress and playable in the browser as an early demo: expect rough edges. The interface is in Italian for now. Not yet published on GitHub.
