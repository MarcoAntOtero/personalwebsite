# Performance + Reliability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shrink the two oversized image assets, clean up malformed `<img>` markup, and add a custom 404 page — the first of nine hardening sub-projects for the personal website.

**Architecture:** No build tooling exists (plain HTML/CSS/JS, static assets). Each task edits files directly and commits; "tests" are file-size checks (`ls -la`) and manual verification by opening the HTML files in a browser, since there is no test runner in this repo.

**Tech Stack:** HTML, CSS, vanilla JS, `sips` (macOS built-in image tool) for recompression. No new dependencies.

## Global Constraints

- No new dependencies or build steps — this repo intentionally has none (spec: "Context").
- Resume PDF (`assets/marco-otero-resume.pdf`) stays referenced as-is; user is adding that file themselves — do not touch the button's `href`/`onclick` target (spec: "Broken links").
- Wiring `404.html` into S3 as the bucket error document is explicitly out of scope — user handles it in the AWS console (spec: "Custom 404 page").
- Out of scope for this plan: WebP/AVIF conversion, `srcset`, mobile/contrast fixes (spec: "Out of scope").

---

### Task 1: Compress the oversized game screenshots

**Files:**
- Modify: `assets/game1.png` (2000×1422, 2,888,566 bytes)
- Modify: `assets/game2.png` (2004×1426, 2,686,437 bytes)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: same filenames, same relative path — `index.html` references
  (`assets/game1.png`, `assets/game2.png` at `index.html:117-118`) need no
  changes.

- [ ] **Step 1: Record current sizes as the baseline**

Run: `ls -la assets/game1.png assets/game2.png`
Expected output (current state):
```
-rw-r--r--  1 marcootero  staff  2888566 ... assets/game1.png
-rw-r--r--  1 marcootero  staff  2686437 ... assets/game2.png
```

- [ ] **Step 2: Resize both images to max width 900px, preserving aspect ratio**

These render as small thumbnails (`.learning-image` class) — 900px wide is
generous headroom for any screen. `sips` preserves aspect ratio when only
one dimension is given.

Run:
```bash
sips -Z 900 assets/game1.png
sips -Z 900 assets/game2.png
```
Expected: `sips` prints one summary line per file with the new pixel
dimensions (e.g. `pixelWidth: 900`).

- [ ] **Step 3: Verify the size reduction**

Run: `ls -la assets/game1.png assets/game2.png`
Expected: both files now well under 500KB (down from ~2.7-2.9MB).

- [ ] **Step 4: Visually confirm no quality regression**

Open `index.html` in a browser (`open index.html` on macOS), scroll to the
"Currently Exploring" section, and confirm both images still look sharp at
their displayed thumbnail size.

- [ ] **Step 5: Commit**

```bash
git add assets/game1.png assets/game2.png
git commit -m "$(cat <<'EOF'
Compress oversized game screenshot images

game1.png and game2.png were raw 2000px+ screenshots displayed as small
thumbnails, accounting for ~5.5MB of page weight for two images.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01GyonQ2wBLhG6JAnjALmE3E
EOF
)"
```

---

### Task 2: Fix malformed `<img>` attribute syntax in index.html

**Files:**
- Modify: `index.html:60-61` (project3 images)
- Modify: `index.html:75` (project1 image)
- Modify: `index.html:88` (project2 image)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing consumed by later tasks — pure cleanup.

- [ ] **Step 1: Confirm the exact malformed lines**

Run: `grep -n '",' index.html`
Expected output (4 matches, the stray comma right after a `src="..."`
value and before the next attribute):
```
60:						<img src = "assets/route1.png", alt="routeSS2" class = "project3-pic2">
61:						<img src = "assets/route3.png", alt="routeSS3" class = "project3-pic3">
75:						<img src = "assets/Screenshot 2025-06-06 at 11.50.57 AM.png", alt="gameSS2" class = "project1-pic2">
76:						<img src = "assets/Screenshot 2025-06-06 at 11.50.57 AM.png", alt="redditSS2" class = "project2-pic2">
```
(Line numbers for the project1/project2 duplicate-screenshot lines may
read 75/88 depending on exact match — use the grep output as ground
truth, not the numbers above.)

- [ ] **Step 2: Remove the stray comma from each match**

Edit each line found in Step 1, changing `src = "PATH",` to `src = "PATH"`
(delete the comma, keep everything else identical). Example for line 60:

Before:
```html
					<img src = "assets/route1.png", alt="routeSS2" class = "project3-pic2">
```
After:
```html
					<img src = "assets/route1.png" alt="routeSS2" class = "project3-pic2">
```

Apply the same fix to the other 3 matches from Step 1's grep output.

- [ ] **Step 3: Verify no stray commas remain**

Run: `grep -n '",' index.html`
Expected: no output (no matches).

- [ ] **Step 4: Visually confirm the page still renders correctly**

Run: `open index.html`
Expected: all project screenshots still display (this was a silent
browser-tolerated bug, so visual output should be unchanged).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Fix malformed img attribute syntax in index.html

Several <img> tags had a stray comma between the src and alt
attributes (e.g. src="...", alt="..."), which browsers silently
tolerated but is invalid HTML.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01GyonQ2wBLhG6JAnjALmE3E
EOF
)"
```

---

### Task 3: Add a custom 404 page

**Files:**
- Create: `404.html`

**Interfaces:**
- Consumes: existing `personal.css` classes `.title` and `.bio` (defined at
  `personal.css:27-46`) for visual consistency — no CSS changes needed.
- Produces: nothing consumed by later tasks. Note left for the user: S3
  error-document wiring is a manual console step, not part of this task.

- [ ] **Step 1: Create 404.html reusing the existing visual language**

```html
<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>Page Not Found — Marco Otero</title>
	<link rel="stylesheet" href="personal.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
</head>

<body>
	<main>
		<div class="general">
			<div class="top-container">
				<h1 class="title">
					404
				</h1>
				<div class="bio">
					This page doesn't exist. Let's get you back to somewhere that does.
				</div>
				<div class="contact">
					<button onclick="window.location.href='/';" class="resume-button" type="button">Back to Home</button>
				</div>
			</div>
		</div>
	</main>
</body>
</html>
```

- [ ] **Step 2: Verify it renders correctly**

Run: `open 404.html`
Expected: page shows the same gradient "404" title styling as the main
page's "Marco Otero" title, the message text, and a working "Back to
Home" button styled like the existing resume-download button.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "$(cat <<'EOF'
Add custom 404 page

Matches the main page's visual style. Note: wiring this up as the S3
bucket's error document is a manual AWS console step, not covered here.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01GyonQ2wBLhG6JAnjALmE3E
EOF
)"
```
