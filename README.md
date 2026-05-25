# The Green Griffin Tavern — Website

One-pager marketing site for The Green Griffin Tavern. Booking-focused, with brand/atmosphere up front. Built as plain HTML/CSS/JS, no build step, deployable as-is to GitHub Pages.

## Structure

```
/
├── index.html          One-page layout: hero, ruleset experience,
│                       about, taste, pricing, booking embed, footer
├── styles.css          All styling. Brand tokens at the top in :root.
├── script.js           Nav scroll-state, reveal-on-scroll, smooth-scroll
│                       with sticky-nav offset.
├── assets/
│   └── svg/
│       ├── crest.svg          Square crest lockup (logomark + wordmark)
│       ├── shield-white.svg   White shield hero lockup
│       ├── mark.svg           Single griffin character (ink)
│       ├── mark-green.svg     Same, recolored brand green — nav
│       ├── mark-cream.svg     Same, recolored cream — footer
│       └── griffin.svg        Bare griffin silhouette
└── .nojekyll           Tell GitHub Pages to skip Jekyll processing
```

## Brand tokens

All in `styles.css` under `:root`. Pulled from `Colours.svg`:

- Navy deep `#003049` — page background
- Navy mid `#006BA3` — supporting accent
- Ember `#F77F00`, gold `#FFB933`, red `#D62828` — fire palette
- Parchment `#FEEDCD`, cream `#F1E2D0`, bone `#FDFCF7` — card surfaces
- Green `#00B061` — primary CTA (the griffin)
- Green deep `#004124` — footer base

## Type

- Display (h1, h2): Averia Serif Libre
- Subhead (h3): Averia Sans Libre, bold
- Body / UI: Averia Sans Libre
- Loaded from Google Fonts in `index.html`

## Booking embed

Search `index.html` for `booking-embed__frame` — replace the placeholder div with whichever you go with:

**Calendly**
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/your-handle/session" style="min-width:320px;height:700px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

**Tally**
```html
<iframe src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1"
        width="100%" height="600" frameborder="0" title="Book a session"></iframe>
```

**Google Form**
```html
<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
        width="100%" height="800" frameborder="0">Loading…</iframe>
```

## Deploy

1. Create a new GitHub repo (e.g. `green-griffin-tavern`)
2. Push these files to `main`
3. Repo Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`
4. Site goes live at `https://<your-username>.github.io/<repo-name>/`

## TODO

- [ ] Replace barkeep portrait placeholder with real photo (`assets/images/`)
- [ ] Fill in actual session pricing once finalized
- [ ] Add real video/image content to the "A little taste" rail
- [ ] Plug in real booking embed (Calendly / Tally / Google Form)
- [ ] Write final copy passes — current copy is from the web comp draft
- [ ] Add favicon variants (apple-touch-icon, etc.)
- [ ] Set up custom domain if desired

## Notes

- The wood-beam dividers are pure CSS — no images. They use layered repeating-linear-gradients for grain and inline SVG for the burnt griffin brands.
- The hero hearth fire is also pure CSS — layered radial gradients with a subtle flicker animation. If a real fire/hearth photo becomes available, swap `.hero__hearth` for a `<img>` or `background-image`.
- The flicker animation respects `prefers-reduced-motion`.
