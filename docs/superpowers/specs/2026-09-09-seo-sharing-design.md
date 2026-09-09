# SEO + Sharing — Design

Sub-project 2 of 9 in the personal-website hardening effort (sub-project 1,
performance + reliability, is merged to `main`). Remaining after this:
legal/consent, security/hosting hygiene, accessibility/responsiveness,
forms + spam protection, analytics, CTA.

Original ask (verbatim, relevant portion): "meta titles, and descriptions,
social preview image, ... robots.txt" (plus, decomposed elsewhere in the
original request, a sitemap — grouped into this batch as the natural
companion to robots.txt).

## Context

Static HTML/CSS/JS site, no build tooling, hosted on AWS S3 at
`http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/` (HTTP
only — no custom domain or CloudFront yet). Currently `index.html` has only
a bare `<title>Marco Otero</title>` and no meta description, no Open Graph
or Twitter Card tags, no `robots.txt`, no `sitemap.xml`.

**Known caveat:** the site URL is HTTP-only today. All absolute URLs added
in this batch (canonical, `og:url`, sitemap `<loc>`) will use
`http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/` as-is.
When the security/hosting-hygiene sub-project sets up HTTPS (likely via a
CloudFront custom domain), those URLs will need a follow-up update — noted
here so it isn't lost.

## Scope

### 1. Title + description (index.html `<head>`)
- Replace `<title>Marco Otero</title>` with
  `<title>Marco Otero — Computer Science Student & Developer</title>`.
- Add `<meta name="description" content="Marco Otero is a Computer Science
  sophomore at Georgetown University building 2D games, PC hardware, and
  software at the intersection of the two.">`.
- Both approved verbatim by the user; not to be reworded further without
  asking.

### 2. Open Graph + Twitter Card tags (index.html `<head>`)
Add, using the title/description above and the site URL:
- `og:type` = `website`
- `og:url` = `http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/`
- `og:title`, `og:description` = same text as tags in section 1
- `og:image` = `http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/assets/social-preview.jpg`
- `twitter:card` = `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image` = mirror the `og:*` values above

**Dependency:** `assets/social-preview.jpg` does not exist yet — the user
is providing this file themselves (a photo). Meta tags reference the path;
no placeholder/fabricated image is created in its place. If the file isn't
present when this ships, the `og:image`/`twitter:image` tags will point at
a 404 until the user adds it — that's expected and acceptable, same
pattern as the resume PDF in sub-project 1.

### 3. `robots.txt` (repo root)
Allow-all, pointing to the sitemap:
```
User-agent: *
Allow: /

Sitemap: http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/sitemap.xml
```

### 4. `sitemap.xml` (repo root)
Single-entry sitemap (this is a one-page site):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://marco-otero-portfolio.s3-website.us-east-2.amazonaws.com/</loc>
  </url>
</urlset>
```

### 5. `404.html` — noindex
Add `<meta name="robots" content="noindex">` to `404.html`'s `<head>` so
search engines don't index the error page. No other change to that file.

## Out of scope (belongs to a later sub-project)
- Actually enabling HTTPS / a custom domain — security/hosting hygiene.
- Any content/copy changes beyond the title and description above.
- A favicon — not requested; can be raised separately if wanted.

## Testing / validation
No build/test tooling. Validate by:
- Opening `index.html` and viewing source to confirm all tags present and
  well-formed.
- Validating `sitemap.xml` is well-formed XML (`xmllint --noout sitemap.xml`
  if available, otherwise visual inspection).
- Confirming `robots.txt` and `sitemap.xml` are both plain-text/XML files
  reachable at the repo root (so they resolve to `/robots.txt` and
  `/sitemap.xml` once deployed).
