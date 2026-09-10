# Accessibility + Responsiveness — Design

Sub-project 5 of 9 in the personal-website hardening effort (sub-projects 1
and 2 merged to `main`; 3 legal/consent and 4 security/hosting hygiene
deferred by user — nothing to disclose yet / HTTPS setup is a manual AWS
console task). Remaining after this: forms + spam protection, analytics,
CTA.

## Context

Audited `index.html` and `personal.css` directly (no build tooling, no
component framework). Two concrete accessibility gaps found by reading the
markup; existing responsive breakpoints at 850px and 851–1250px already
cover phone/tablet/desktop, so responsiveness is a lighter touch than
originally implied by the sub-project name.

## Scope

### 1. Icon-only links have no accessible name
- `index.html:40-58`: the LinkedIn link (`<img class="linkedin-icon-img">`,
  no `alt`) and GitHub link (inline `<svg>` with a clipped `<image>`, no
  `<title>`/`aria-label`) read as blank links to a screen reader.
- `index.html:59-61`: the email `<img class="email-icon-img">` also has no
  `alt`.
- Fix: add `aria-label` to each `<a>` (`"LinkedIn"`, `"GitHub"`,
  `"Email"`), and `alt=""` on the LinkedIn/email `<img>` tags (decorative,
  since the link already carries the label) to avoid duplicate
  announcement. No visual change.

### 2. Non-descriptive alt text on project screenshots
- `index.html:69-71,84-85,97-98,127-128` use placeholder-style alt text
  (`alt="routeSS1"`, `alt="gameSS1"`, `alt="rpg1"`, etc.) — not descriptive
  of image content.
- Fix: replace with short descriptive alt text per image, e.g.
  `alt="Route word-ladder game screenshot showing the puzzle board"`,
  `alt="Space Shooter gameplay screenshot"`, `alt="Reddit bot dashboard
  screenshot"`, `alt="2D RPG environment work-in-progress screenshot"`
  (paired per project, distinguishing pic1/pic2 where both exist).

### 3. Heading hierarchy
- Confirmed `index.html` already runs a clean `h1 > h2 > h3` structure with
  one `h4` (`outside-links-caption`) nested inside the top container, not
  under a `h2`/`h3` — technically a hierarchy skip but low-impact (it's a
  caption, not a heading over content). Leaving as-is; not worth a DOM
  restructure for one non-critical caption.

### 4. Responsiveness
- Existing breakpoints (`personal.css:439` max-width 850px,
  `personal.css:553` 851–1250px) already handle phone/tablet/desktop.
  Spot-checked class usage; no additional breakpoint gaps identified from
  static reading. Out of scope: live device/browser testing (no headless
  browser tooling in this repo) — flagged as a manual follow-up if the user
  notices a specific breakage.

## Out of scope (belongs to a later sub-project or is a manual step)
- Color contrast audit — would need a contrast-checker tool run against
  the actual rendered gradient text colors; not done here since it wasn't
  in the original hardening list and needs visual verification.
- Reworking the `h4` caption's hierarchy — cosmetic DOM change with no
  accessibility payoff, skipped per above.
- Live responsive testing across real devices/browsers.

## Testing / validation
No build/test tooling. Validate by:
- `grep -n 'aria-label\|alt='` on the touched lines to confirm every
  icon link and image has non-empty accessible text (or explicit `alt=""`
  where intentionally decorative).
- Opening `index.html` in a browser and using Tab to confirm all three
  icon links are announced with a name (VoiceOver/browser dev tools
  accessibility inspector) and visually unchanged.
