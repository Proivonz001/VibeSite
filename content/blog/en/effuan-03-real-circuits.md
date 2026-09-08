---
title: Questioning every decision, then tracing real circuits from GPS data
summary: Two weeks away, then a day that started with "would you make the same choices again?" and ended with six real circuits in true metres, after I was ready to change game engine.
date: 2026-08-06
written: 2026-09-08
project: effuan
step: 3
tags: [effuan, godot, tracks, geojson, architecture]
---

I came back to EFFUAN on 6 August at three in the morning with a message that sums up how these projects work: "Where were we? It's been a while since I touched this. Do a general check." The check read the project notes, ran the four headless test suites, and reported the state: milestone 4 done, tree clean.

Then I listed what still felt wrong. Tracks should be longer and wider. Cars slowed down and stuttered when other cars were nearby. The pit lane should be a real road that cars enter, stop in and leave. Tyre wear should reflect the length of a race, because finishing on two sets of softs is not Formula 1, and there should be a rule that forces two different compounds.

The stutter had a name by then: the "train clamp". When a car reached the one in front without attacking, every tick it was teleported back to a minimum gap, and the jumps exploded at segment boundaries where the minimum gap changed from 10 to 31 metres at once. The replacement was pace inheritance: cars advance in position order, and a car that has caught its leader simply moves with it. Pit lane and the two-compound rule went in the same morning.

## The uncomfortable question

Before going further I asked something I think every long project deserves at least once.

> Let's question any rule or limit we imposed before. Engine, graphics, physics, rules, UI/UX, 2D/3D, the way cars are simulated, anything. If you had to build a game like this from scratch, would you make the same decisions?

The answer was a table, layer by layer: what we had, and whether it would be chosen again. Godot and GDScript: yes. 2D top-down vectors: yes. Segment-based simulation with a fixed tick: yes. The one real exception was the visual layer, which had accumulated tricks to hide the simulation's coarse resolution. We also wrote down three decisions that had been implicit until then: the destination is a free release on itch.io, the soul of the game is half watching and half managing, and the strategy is to fix the feel now on definitive foundations, then resume the roadmap.

## The track saga

The rest of the day was about tracks, and it is the part of this project I would tell a friend about.

The first circuit had a "very standard shape". Real F1 circuits are complex and fun to look at, so I proposed copying the real ones directly: layout, dimensions, width in each point, DRS zones, finish line, pit lane. I found a repository of F1 circuits as SVG. Claude wrote a converter from the Bezier paths to dense anchors, eighty to a hundred per track, and built a standalone preview tool so we could check the shapes without running a race.

The result had visible corner artefacts, and at Silverstone a section of track ran over another one. I assumed real elevation differences. It was a tracing error. Then, after a second attempt, I wrote the message that I think changed the project:

> There is something fundamentally not working in how tracks are created. I don't think you're not capable, I think the tools we're using don't let you make working tracks. We need to find a new way. I'm even willing to completely change game engine.

The reply was a precise diagnosis: the SVG curves were mathematically perfect, but they were being resampled every 55 pixels and reconstructed, and in hairpins with a 20-pixel radius that was far too coarse. Fix pushed, same zones re-rendered. I tested Silverstone and Monaco and it still was not right. Cars stopped and restarted at turn 13. The proportions between cars and track were still off.

I had found two more repositories in the meantime: one with F1 circuits as GeoJSON, and FastF1, the telemetry library that would later become the basis of another project. The GeoJSON one was the key. Real latitude and longitude, projected into metres and calibrated on the official length of each circuit: Monza is exactly 5,793 metres. From that moment tracks were not drawings to interpret but measurements. The proportions that had been "impossible" fell into place because the car length in pixels and the track width in pixels finally came from the same scale.

At 14:26 I wrote "ok, now the track is right". Six real circuits under fictional names, a true-scale pit lane, and a preview tool that renders each circuit with its segment classes so I can check a track without racing it.

## Three views and continuous overtakes

With the track solved, the tricks built for the old map-scale view had to be reconsidered. I asked for what F1 Manager does: a TV director, a driver camera and a strategic map. The strategic map became a full-screen stylised circuit with driver pills. And the duel mechanics were rewritten without the gluing and without teleports: a continuous pace boost along the racing line, with lane offsets so two cars can really run side by side.

The next day I removed the TV director again. Two views were enough: the driver camera, pulled back and slower so it stays calm at 4x and 8x, and the map, with the mouse wheel to zoom from one to the other. Sometimes the best feature is the one you delete.
