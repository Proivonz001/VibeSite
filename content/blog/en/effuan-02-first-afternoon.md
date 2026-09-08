---
title: Real cars, a grid that would not spread out, and a video as a bug report
summary: The afternoon of day one went into identity and feel. Custom theme and typography, hand-drawn SVG cars, a broadcast HUD, and a starting grid whose bug I could only explain by recording my screen.
date: 2026-07-22
written: 2026-09-08
project: effuan
step: 2
tags: [effuan, godot, ui, debugging]
---

By late morning the game worked, but it looked like a debug build. Grey default buttons, a system font, cars drawn as dots. I asked how to make a leap in technical and visual quality, and the answer was a plan on four fronts: a custom theme, a race view worth watching, timing with milliseconds, and procedural audio. An hour later the game had a global theme built on Titillium Web, the typeface family that F1 broadcasts use, with dark panels, rounded corners and proper hover states. It looked like a product for the first time.

## The track was lying

Then came a screenshot from me: at one point of the circuit the cars stopped and restarted. I suggested softer corners. The diagnosis was more interesting than that, and it was the first of a long series of bugs with the same shape.

The simulation splits the lap into segments measured in nominal metres. The visual position of a car was projected onto the drawn curve proportionally, over the whole lap. Where the drawn shape did not match the metres, the boundary of a hairpin in the simulation slid into a straight on screen, and a car would crawl at hairpin speed through what looked like a straight. Nothing was wrong with the corners. The map and the simulation disagreed about where the corners were. The fix anchored segment boundaries to the drawn geometry, and it held for about two weeks, until the tracks got real and the same class of problem came back at a larger scale.

## Cars that are actually cars

I wanted real cars instead of dots, and offered to use generic Godot assets. The counter-proposal was better: two hand-drawn SVG layers, a livery layer in light greys that gets tinted with the team colour at runtime, and a neutral detail layer on top with tyres, cockpit and halo. Every team gets its own colour, the sprites stay crisp at any zoom, and they are eight hundred bytes each. Those two files are still in the game today, and they are the cars on this project's cover.

The next hour was about proportions and "guard rails". The cars were too big for the track, the track looked small, corners had visible elbows. The elbows were mathematics: the spline handles had a single length per anchor, so a long straight entering a tight corner produced a tangent out of proportion. Handles proportional to the distance of each neighbour fixed it. I asked for a written document of the track standards before drawing more circuits, so every new track would follow the same rules for width, grid straight, DRS zones and kerbs. That document still exists in the repository.

## The grid

The starting grid is where I learned how to report a bug to an AI.

Cars started glued to each other and then spread into a line when the lights went out. The first fix made the pitch between grid rows 42 pixels, about 1.6 car lengths as in real F1, and lengthened the grid straights on all four tracks. I looked, and it was still wrong. So I recorded my screen with the Windows snipping tool and pasted the path of the video.

> I checked, but the grid problem is still there, I made a video to show you.

Claude extracted frames from the video and found it. The spacing in the game world was right. The problem was the camera: the full-circuit view sat at zoom 0.66, and at that distance the two columns of the grid, a few pixels apart laterally, collapsed into a single bumper-to-bumper train. The fix was a dedicated grid camera that frames the formation up close through the start lights and pulls back at the green. When I said it was still happening, the answer was to record a video on its side with Godot's movie-maker mode, prove the build worked, and suspect I was running an old version. I was.

## The first duel

The last request of the day was the one that mattered most for the feel of the game: overtakes resolved in an instant, a dry swap of positions, and I wanted wheel-to-wheel. The solution was the duel: when a car catches the one in front, the two pull alongside in opposite lanes and run side by side, and the verdict lands at the next braking zone, with a radio call for both phases.

It also introduced a bug within minutes. During the side-by-side phase the attacker kept advancing at its own pace and was re-pinned two metres behind the defender every tick; when its pace carried it past the defender before the pin, the leaderboard swapped the roles of the pair, and the pin yanked the other car backwards. Cars teleported. Gluing the attacker alongside and freezing the roles for the duration of the duel fixed it. It would not be the last teleport.

At 16:00 I asked to save everything and prepare for a new session. The README got a milestone summary, the repository was clean, and I did not touch the project for two weeks.
