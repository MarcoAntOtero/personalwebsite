# Performance + Reliability — Design

Sub-project 1 of 9 in the personal-website hardening effort (full list tracked in
conversation; remaining 8: legal/consent, security/hosting hygiene, SEO/sharing,
accessibility/responsiveness, forms + spam protection, analytics, CTA — each gets
its own spec later).

Original ask (verbatim, relevant portion): "compress the images. check page low
screen ... add a custom four zero four page, fix broken links"

## Context

Static HTML/CSS/JS site (no build tooling, no framework), hosted on AWS S3,
git repo `MarcoAntOtero/personalwebsite`, working tree clean at spec time.

## Scope

### 1. Image compression
- `assets/game1.png` (2.89MB, 2000×1422) and `assets/game2.png` (2.69MB,
  2004×1426) are raw screenshots rendered as small thumbnails on the page —
  by far the largest assets on the site. Resize to a max width appropriate
  to their largest on-page display size and recompress in place with `sips`
  (no new dependency).
- Spot-check the remaining raster assets (`route1.png`, `route2.png`,
  `route3.png`, both `Screenshot ... .png` files, `OIP.jpg`) for any easy
  additional savings; skip if gains are marginal (all are already under
  110KB).
- Out of scope: converting to WebP/AVIF or adding responsive `srcset` — not
  requested, and would need a fallback story for older browsers. Can be a
  future item if raised.

### 2. Broken links / malformed markup
- `assets/marco-otero-resume.pdf` is referenced by the "Download Resume"
  button but does not exist in the repo — confirmed dead link. **User will
  add the real PDF themselves**; no code change needed here beyond leaving
  the existing path as-is.
- Several `<img>` tags have a stray comma between attributes (e.g.
  `src="assets/route1.png", alt="routeSS2"`) — invalid HTML that browsers
  silently tolerate today but should be cleaned up. Fix every occurrence in
  `index.html`.
- No other broken internal links found; external links (LinkedIn, GitHub,
  mailto) are out of scope for automated verification in this pass.

### 3. Custom 404 page
- Add `404.html` at the repo root, visually consistent with `index.html`
  (same fonts/header style via `personal.css`), short "page not found"
  copy, and a link back to `/`.
- **Not in scope for this pass:** wiring it up as the S3 bucket's error
  document. That's a live AWS console change outside this repo — user will
  do it themselves.

## Testing / validation
- No build or test tooling in this repo; validate by opening `index.html`
  and `404.html` locally in a browser and confirming layout, and by
  checking `git diff --stat` for the image byte-size reduction.

## Out of scope (belongs to a later sub-project)
Low-screen/mobile responsiveness and color contrast are accessibility
concerns, not performance/reliability — deferred to the
accessibility/responsiveness sub-project so this batch stays focused.
