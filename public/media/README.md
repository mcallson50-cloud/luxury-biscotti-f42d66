# Video slots

Drop MP4 files in here with these exact names and they appear on the site
immediately — no code changes.

| File               | Where it plays                         | Suggested ratio |
| ------------------ | -------------------------------------- | --------------- |
| `hero.mp4`         | Home, full-screen hero behind the title | 16:10 or wider |
| `counter.mp4`      | Visit, under the address block         | 21:9            |

Until a file exists, each slot renders its photographic poster instead, so
nothing looks broken — the still is chosen in the route that uses it (see the
`poster` prop on `VideoPanel`).

## What to shoot

These are ambient loops, not films: they autoplay, they are muted, they loop
forever, and they carry no sound or narrative. Six to twelve seconds is plenty.
Steam off a cup, a hand steaming milk, fabric moving in the window light, the
room filling up.

- **Muted always.** They play with `muted playsInline`, which is what lets
  mobile browsers autoplay at all.
- **Keep them small.** Aim under 3 MB each; H.264 in an MP4 container, no audio
  track. `ffmpeg -i in.mov -an -vf scale=1600:-2 -crf 30 -movflags +faststart out.mp4`
  is a reasonable starting point.
- **No text or logos in frame.** The type on top is the design.
- **Loop cleanly** if you can — first and last frame roughly matching.

Anyone who has asked their browser to reduce motion never sees these; they get
the poster still.
