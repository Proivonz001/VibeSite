---
title: Four bugs hiding behind each other, and a race that changed with playback speed
summary: The Monaco start was chaos. The investigation found the anti-overlap code causing the overlaps, a corner of zero pixels, a grid packed inside the minimum gap, and finally a simulation whose winner depended on how fast you watched it.
date: 2026-08-25
written: 2026-09-08
project: effuan
step: 6
tags: [effuan, simulation, determinism, debugging, architecture]
---

On the second circuit of the calendar, the one modelled on Monaco, the start was a mess: cars on top of each other, stuttering through the first corners. My theory was crowding, twenty cars in a short twisty section. I asked for a check and a proposed solution. What followed, across two sessions on 14 and 25 August, was the deepest debugging of the whole project, and I am writing it down because the shape of it is the lesson.

## Measuring the chaos

The first numbers refuted my theory. Recording the Monaco start frame by frame and counting real overlaps, car bodies intersecting in 2D rather than merely close, gave 435 overlaps, and 91 percent of them in the first ten seconds. Overlapping cars were 0.2 pixels apart with the anti-overlap clamp active. The code meant to prevent overlaps was creating them: it teleported the follower backwards, 186 times, up to five metres in a single frame.

Removing the backward teleports made the overlaps go up. So there was a cause further upstream.

## Four bugs in a row

1. **A corner of zero pixels.** On Monaco, segment 16 was a five-metre corner that occupied zero pixels in the drawn track, so every car inside it landed on the same point. Corners in general were compressed: the simulation held 12 metres, the drawing showed 7. The degenerate segment was absorbed and the mapping between simulation and drawing became uniform on all six circuits: 12 metres of race are about 57 pixels everywhere.

2. **The grid started inside the minimum gap.** Still 4.9 overlaps per frame, cars at 0.1 pixels, two centimetres. This time the cause was in the simulation, and it was written in a comment: "A car already inside the minimum gap moves exactly with its leader." The grid had 8.9 metres between rows and 3.4 between the two cars of a row, both inside the minimum gap, so the pack stayed glued for the whole race. Gaps now reopen, without ever pushing anyone backwards. Overlaps fell by 68 percent.

3. **Duels in the same lane.** Of what remained, 84 percent were duels, cars side by side by design. But 82 percent of those had both cars in the same lane, lateral offset zero. Each car computed on its own which way the corner turned, and the two could disagree. And at the start, lanes were assigned by car index rather than grid position, so two cars on the same row converged on each other at the lights.

4. **Both cars changing side.** When a duel started, both cars swapped lanes and crossed the track at the same instant, meeting in the middle. Only the attacker moves now.

At one point the numbers said the lateral separation in duels had got worse, from 16 pixels to 3.7. Instead of shipping, we investigated, and the regression was an artefact of the metric, which decomposed distance along the corner arc and failed off the centre line. Re-measured with a criterion nobody could argue with, real distance between centres smaller than a car width, the result was 2.14 overlaps per frame down to 0.25. An 88 percent reduction, verified on all six circuits with zero backward jumps anywhere.

## The adversarial review

Before committing, Claude ran an adversarial review of its own changes: four independent lenses, 29 hypotheses of defects, then an attempt to demolish each one. 21 were refuted. 8 were real, and three of those had been introduced that same day. One was the last remaining path in the engine where a car could move backwards: a car retiring at the end of a segment was reset to the start of the segment, up to 600 metres back.

The eighth was the one that still surprises me. The lap time depended on playback speed. Same race, same seed, but at 4x a different driver won and the times drifted by two minutes. The race you watched depended on how fast you watched it. The engine scaled the size of the tick with the playback speed, while overtaking decisions were rolled once per tick, so at 8x there were eight times fewer overtaking opportunities per simulated second.

## Keep the simulation, or go back to dots?

That was the moment I asked the second uncomfortable question of the project. Were we sure this was the right way? Could we analyse how F1 Clash and F1 Manager simulate their races, and compare? I had the feeling we would never reach the level of simulation I wanted, and that it might be simpler to stay in Golden Lap's style, dots moving on a map.

Two things answered it. First, a reclassification of every bug found that day by layer: three lived in the simulation engine, the part that would remain even with dots, and the rest lived in the visual seam, the code that makes a picture follow the numbers. Second, a research pass on how the four reference games actually work, from developer diaries, patch notes and community decompilations. None of them run physics; all of them own positions in a simulation and draw them. We were not doing something exotic. We were doing the same thing with a seam that needed sealing, not replacing.

So the decision was to keep it, and to seal the seam. A **fixed timestep**: the engine always ticks at 0.05 seconds, and playback speed only decides how many ticks run per frame, one, four or eight. The race is the same at any speed by construction, not by luck. The test suite was retuned to the same cadence, snapshots roll every tick and the renderer interpolates between them, and the anti-overlap pass was deleted entirely, because with the four bugs gone it had nothing left to do.

The commit at the end of that session touched 56 files. Its message documents the three areas, the physical simulation with the fixed timestep, the sealed seam with the measurements, and the Golden Lap style UI, so that in six months the log tells why, not only what. Two weeks later the game went into a browser, which is where you can play it now.
