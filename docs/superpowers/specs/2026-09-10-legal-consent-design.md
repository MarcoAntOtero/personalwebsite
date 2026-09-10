# Legal/Consent — Design

Sub-project 3 of 9 in the personal-website hardening effort. Originally
deferred this session ("nothing to disclose yet — no forms/cookies/
analytics exist"); user asked to pick it back up as the next-easiest item.

## Context

Site currently collects zero data: no forms, no cookies, no analytics, no
tracking of any kind (confirmed by grep across `index.html`/`main.js` —
the only outbound interaction is a `mailto:` link that hands off to the
visitor's own email client). Forms+spam protection and analytics are both
still-deferred future sub-projects; when either lands, this page will need
a follow-up update.

## Scope

### 1. Minimal privacy page
- Create `privacy.html`, reusing the same visual language as `404.html`
  (`.title`/`.bio` classes, same `<head>` boilerplate, "Back to Home"
  button).
- Content is a short, factual statement of the current true state — no
  cookie/consent banner (nothing sets a cookie), no fabricated legal
  boilerplate:
  - This site does not use cookies, analytics, or tracking.
  - Contacting via the email link opens the visitor's own email client;
    nothing is collected or stored by this site.
  - A note that this page will be updated if that changes.
- `<meta name="robots" content="noindex">` — not useful for search, same
  reasoning as `404.html`.

### 2. Link to it from the footer
- `index.html:134-137` footer currently has only copyright + "Made with
  ❤️" lines. Add a small `<a href="privacy.html">Privacy</a>` link there.

## Out of scope
- Cookie consent banner — there's nothing to consent to; adding one would
  be a fabricated UI pattern with no function.
- GDPR/CCPA-style formal legal text — no data processing occurs, so
  boilerplate here would be inaccurate, not more compliant.
- Updating this page for forms/analytics — deferred until those
  sub-projects actually ship.

## Testing / validation
- `open privacy.html` — confirm visual consistency with `404.html` and
  that the "Back to Home" button works.
- `open index.html` — confirm the new footer link is present and
  navigates correctly.
