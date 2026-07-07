/*
 * Film Club poster theme — "Aurora" (the default look).
 * ----------------------------------------------------------------------------
 * A theme is a self-contained description of how the POSTER looks. The
 * generator itself (the form, sliders, export/print, save/load) lives in
 * index.html and does not need to change when you restyle.
 *
 * TO GIVE THE POSTER A NEW LOOK:
 *   1. Copy this file (e.g. to theme-noir.js) and restyle the css / render below.
 *   2. Point the <script src="theme.js"> tag in index.html at your new file.
 * That's it — nothing else needs touching.
 *
 * A theme provides:
 *   id      — a short name, for your own reference
 *   bgColor — solid colour behind the poster (used when exporting to JPEG/PDF)
 *   fonts   — array of stylesheet URLs to load (e.g. Google Fonts); may be []
 *   css     — CSS for the poster's insides, injected into the page
 *   render(el, data, seed, cfg, helpers) — fill `el` with the finished poster
 *
 * What render receives:
 *   el      — the <div class="poster"> element to fill (fixed 700×990 canvas)
 *   data    — { header, title, subtitle, time, venue,
 *               films: [ { date, name, director }, ... ] }
 *   seed    — the seed string from the Seed box
 *   cfg     — { count, size, spread, opacity } from the Background sliders
 *             (a theme is free to ignore these)
 *   helpers — { rng(seedStr), esc(str) }
 *             rng(seedStr) returns a seeded random function returning 0..1, so
 *             the same seed always produces the same background.
 *             esc(str) HTML-escapes user text — always use it around `data`.
 */
window.FilmClubTheme = {
  id: 'aurora',
  bgColor: '#151518',

  fonts: ['https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&display=swap'],

  css: `
    .poster {
      display: flex;
      flex-direction: column;
      font-family: 'Outfit', sans-serif;
      color: #fff;
    }
    .poster .bg-grad { position: absolute; inset: 0; z-index: 0; }
    .poster .streak  { position: absolute; z-index: 1; }
    .poster .panel {
      position: relative; z-index: 2;
      margin: 50px 45px; padding: 55px 50px;
      background: rgba(10,10,15,0.45);
      border: 1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(2px);
      flex: 1; display: flex; flex-direction: column;
    }
    .poster .header { margin-bottom: 50px; }
    .poster .college { font-size: 14px; font-weight: 300; letter-spacing: 5px; text-transform: uppercase; opacity: 0.75; margin-bottom: 16px; }
    .poster .title { font-size: 58px; font-weight: 700; letter-spacing: -1px; line-height: 1; margin-bottom: 6px; }
    .poster .subtitle { font-size: 15px; font-weight: 200; letter-spacing: 3px; text-transform: uppercase; opacity: 0.75; }
    .poster .films { display: flex; flex-direction: column; justify-content: space-evenly; flex: 1; }
    .poster .film { display: flex; align-items: baseline; gap: 24px; }
    .poster .film-date { font-size: 21px; font-weight: 300; letter-spacing: 1px; opacity: 0.7; white-space: nowrap; min-width: 100px; }
    .poster .film-details { display: flex; flex-direction: column; gap: 4px; }
    .poster .film-name { font-size: 44px; font-weight: 600; letter-spacing: -0.3px; line-height: 0.92; }
    .poster .film-director { font-size: 22px; font-weight: 200; opacity: 0.75; }
    .poster .sep { width: 30px; height: 1px; background: rgba(255,255,255,0.2); margin: 20px 0; }
    .poster .footer-line { font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; opacity: 0.7; line-height: 2; }
  `,

  // Colour palettes the background picks from (seeded). Each has darker "bases"
  // and brighter "accents"; the RGB triples become radial-gradient glows.
  palettes: [
    { bases: [[30,15,110],[15,25,140],[50,10,90],[20,40,120]], accents: [[80,180,255],[160,80,255],[40,220,200]] }, // indigo / cyan
    { bases: [[10,90,80],[15,110,90],[20,70,100],[10,80,120]], accents: [[30,240,190],[20,255,160],[60,210,230]] }, // teal / emerald
    { bases: [[120,15,30],[100,25,15],[140,40,20],[90,10,50]], accents: [[255,70,50],[230,130,30],[255,40,110]] }, // crimson / orange
    { bases: [[10,20,130],[20,30,150],[30,10,100],[15,50,140]], accents: [[70,130,255],[140,70,255],[50,170,255]] }, // cobalt / violet
    { bases: [[100,10,100],[120,20,70],[70,10,130],[90,5,110]], accents: [[255,70,230],[210,50,255],[255,100,190]] }, // magenta / pink
    { bases: [[130,70,10],[110,55,20],[150,80,10],[100,65,5]], accents: [[255,210,30],[230,170,50],[255,190,20]] }, // amber / gold
    { bases: [[15,50,110],[25,65,130],[10,35,90],[30,70,120]], accents: [[90,210,255],[150,235,255],[70,190,255]] }, // arctic blue
    { bases: [[20,90,20],[30,110,25],[15,75,35],[40,100,15]], accents: [[130,255,60],[180,240,50],[100,255,140]] }, // lime / neon green
  ],

  render(el, data, seed, cfg, helpers) {
    const { esc } = helpers;
    const rng = helpers.rng(seed);
    const palette = this.palettes[Math.floor(rng() * this.palettes.length)];

    // Background: layered radial-gradient glows.
    const gradients = [];
    for (let i = 0; i < cfg.count; i++) {
      const isAccent = i >= palette.bases.length;
      const colors = isAccent ? palette.accents : palette.bases;
      const c = colors[Math.floor(rng() * colors.length)];
      const baseOpacity = isAccent ? 0.5 + rng() * 0.35 : 0.6 + rng() * 0.4;
      const opacity = Math.min(1, baseOpacity * cfg.opacity);
      const shape = rng() > 0.4 ? 'ellipse' : 'circle';
      const sW = Math.floor((40 + rng() * 60) * cfg.size);
      const sH = Math.floor((30 + rng() * 50) * cfg.size);
      const pX = Math.floor(rng() * 100);
      const pY = Math.floor(rng() * 100);
      if (shape === 'ellipse') {
        gradients.push(`radial-gradient(ellipse ${sW}% ${sH}% at ${pX}% ${pY}%, rgba(${c},${opacity.toFixed(2)}) 0%, transparent ${cfg.spread}%)`);
      } else {
        gradients.push(`radial-gradient(circle at ${pX}% ${pY}%, rgba(${c},${opacity.toFixed(2)}) 0%, transparent ${cfg.spread}%)`);
      }
    }

    // Diagonal light streaks.
    let streaksHtml = '';
    const numStreaks = 1 + Math.floor(rng() * 3);
    for (let i = 0; i < numStreaks; i++) {
      const angle = -60 + Math.floor(rng() * 120);
      const w = 150 + Math.floor(rng() * 250);
      const h = 400 + Math.floor(rng() * 500);
      const top = -200 + Math.floor(rng() * 600);
      const left = -100 + Math.floor(rng() * 800);
      const alpha = 0.05 + rng() * 0.1;
      streaksHtml += `<div class="streak" style="width:${w}px;height:${h}px;top:${top}px;left:${left}px;transform:rotate(${angle}deg);background:linear-gradient(135deg,transparent,rgba(255,255,255,${alpha}),transparent);"></div>`;
    }

    const filmsHtml = (data.films || []).map(f => `
      <div class="film">
        <div class="film-date">${esc(f.date)}</div>
        <div class="film-details">
          <div class="film-name">${esc(f.name)}</div>
          <div class="film-director">${esc(f.director)}</div>
        </div>
      </div>`).join('');

    el.style.background = this.bgColor;
    el.innerHTML = `
      <div class="bg-grad" style="background:${gradients.join(', ')}"></div>
      ${streaksHtml}
      <div class="panel">
        <div class="header">
          <div class="college">${esc(data.header || '')}</div>
          <div class="title">${esc(data.title || '')}</div>
          <div class="subtitle">${esc(data.subtitle || '')}</div>
        </div>
        <div class="films">${filmsHtml}</div>
        <div class="sep"></div>
        <div class="footer-line">${esc(data.time || '')}</div>
        <div class="footer-line">${esc(data.venue || '')}</div>
      </div>`;
  }
};
