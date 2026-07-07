# Darwin Film Club — Poster Generator

Make a poster for the term's film schedule, right in your browser. No software to install.

**👉 Open it here: https://mbeavitt.github.io/film_club/**

## How to use it

1. Open the link above in any web browser.
2. Fill in the fields on the left — the event details at the top, then each film's date, title and director. The poster updates live as you type.
   - Tip: type the **first** film's date (e.g. `22 Mar`) and the other dates auto-fill one week apart. You can still edit them by hand.
3. Tweak the look if you like (all optional):
   - **Seed** — a number that picks the background design. Same number = same background; hit **Random** for a different one.
   - **Background** sliders (Count / Size / Spread / Opacity) — adjust the coloured glow blobs behind the text. Hover over each for a hint.
4. Save your poster:
   - **Export JPEG** — a shareable image for socials, email, WhatsApp, etc.
   - **Print PDF** — an A4 sheet with two copies side-by-side, ready to print and cut into A5 flyers.

## Sharing a poster with someone else

Your work is remembered only in *your own* browser, so it isn't automatically shared. To hand a poster to another person (or move it to another computer):

- **Save JSON** downloads a small file with all your text and settings.
- The other person opens the site and uses **Load JSON** to pick up exactly where you left off.

## Notes

- Everything runs in your browser — nothing is uploaded, and there's no login.
- It needs an internet connection to load (fonts and export tools come from the web).

---

### For whoever maintains this

The whole app is a single self-contained file, [`index.html`](index.html). It's hosted for free on **GitHub Pages** from the `main` branch. To change anything, edit `index.html`, commit, and push — the live site updates within a minute. No build step, no server.

`past_posters/` holds previously generated schedules for reference.
