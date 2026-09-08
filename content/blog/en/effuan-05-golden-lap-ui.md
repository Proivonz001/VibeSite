---
title: Borrowing from Golden Lap, and finding 9,158 draw calls per frame
summary: A UI pass inspired by Golden Lap, tyre icons drawn to the pixel, a race strip that shows whether the fuel will last, and a stutter hunt that ended in the renderer instead of the physics.
date: 2026-08-12
written: 2026-09-08
project: effuan
step: 5
tags: [effuan, ui, svg, performance, godot]
---

Golden Lap is the reference for this project's look, and on 12 August I decided to borrow from it properly. How it shows tyre wear. How it shows weather, rain and wind. Vector icons for compounds. I asked for proposals before any implementation, and got a mockup with the reasoning behind each block.

## A tyre you can read at three sizes

The core piece is a single `TyreIcon` component: an SVG base with tread and rim, plus arcs drawn in code because wear has to animate. It is used at three sizes. In the timing tower it replaces the letter-and-percentage columns. On the driver card it replaces the progress ring. On the pit buttons it is a selector, so it draws no wear ring at all. The compound colour band sits inside, the wear ring outside drains from green to amber to red.

Then the details, which is where the honesty of measurement paid off again. I said the compound letter did not look centred. Instead of nudging by eye, Claude zoomed into a screenshot and measured: the letter was one pixel low on a 48-pixel icon, because the formula centred the font's em-box, which reserves space for descenders, instead of the cap height. And it was tiny, six by ten pixels inside a 48-pixel wheel. The first correction overshot by one pixel the other way; the real cap height of the font is 0.737 of the em, not 0.70. Then the letters broke out of the colour band at larger sizes, so the band radius got tied to the measured letter size. Centred to the pixel at every size, and larger.

The weather widget got a real weather system: deterministic wind direction and gusts, track temperature, and a forecast in laps. And the radio panel on the left of the HUD, which I never looked at, went away.

## The race strip

The feature I wanted most from Golden Lap was the chart of tyre wear and fuel over the race, with the fuel projection that tells you whether what you loaded will last. I asked for graphic examples to compare before choosing. Three approaches first, then four more when I said the first were too bare, each drawn at the exact size it would have on the card. I sent a reference image from Golden Lap, and the final design came from that: a strip for the whole race on one axis, from lap one to the chequered flag, with the past on the left in solid colour and the projection on the right in transparency.

One decision was mine and I still like it. The tyre line should start at 100 percent and go down, a descending sawtooth that jumps back to 100 at each stop, with every stint filled in the colour of its compound. It matches the wear ring that drains, so the two representations agree. Fuel is a wedge that thins out, and the part of the race the fuel does not cover is marked red, only that part, not the whole projection, because the first version was alarmist.

To verify the sawtooth we needed a pit stop, and the player's cars do not stop on their own in an automated race. A debug flag that lets the AI drive the player's team solved it. The chart says the truth: soft stint draining, a clean step up at the stop, medium stint after.

## The stutter was not in the physics

Between the icons and the charts, the recurring complaint came back: cars still stuttered enough to make the race ugly to watch. This time the instrumentation recorded every car's visual position and speed on every frame. Peaks of 10,000 pixels per second in a single frame: teleports of about 400 pixels.

The pattern told the story. The visual car fell behind its simulated position by up to 300 pixels, 62 metres, then crossed a safety threshold and jumped forward in one frame. Eight teleports per minute across five cars. The cause was architectural, and it was ours: since the simulation had started integrating a physical speed profile, braking and accelerating for real, the 2D car node still ran a second, independent kinematic model with its own braking. Two integrators fighting. Removing the second one made the visual follow the simulation directly, and the 99th percentile of lag dropped from 42 metres to 2.4.

But smaller, more frequent jumps appeared, and they hit all cars at the same timestamps. That is not a per-car glitch; that is a frame hitch. The game was running at about 30 frames per second, with 12 percent of frames over 50 milliseconds. Measuring where the frame time went, script versus rendering, pointed at the renderer: **9,158 draw calls per frame**, about 8,000 of them from the asphalt loop, which drew 2,013 segments in two passes as a line plus a circle each. A quick experiment with the asphalt disabled dropped the count to 1,119 and the frame rate stabilised. The asphalt ribbon became two triangle-strip meshes drawn in one call each. Frames over 50 milliseconds went from 13.8 percent to 0.2.

The simulation tests produced identical results before and after, 44 overtakes and a 55.3 second spread, because none of this touched the simulation. It only changed how the picture follows it.
