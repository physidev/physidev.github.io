# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal website/blog for Pranav Padmanabhan, built as a static site with [Hugo](https://gohugo.io/) (no theme — all layouts are custom) and deployed to GitHub Pages via GitHub Actions. There is no JavaScript/Node build tooling beyond what Hugo Pipes provides natively (no `package.json`).

## Commands

- `hugo server -D` — run the local dev server with drafts included (default at `http://localhost:1313/`)
- `hugo` — build the production site into `public/` (gitignored)
- `hugo --gc --minify` — production build as used in CI (see `.github/workflows/hugo.yaml`)
- There are no lint or test commands/frameworks in this repo.

Requires Hugo extended (CI pins `HUGO_VERSION: 0.148.0`, `hugo.toml` sets a minimum of `0.146.0`).

## Architecture

**Content → Layouts pipeline.** Hugo renders Markdown files in `content/` using templates in `layouts/`, matched by content type/section per Hugo's standard lookup order:
- `layouts/baseof.html` is the base template (head, navbar, content block, footer) that all page types extend via `{{ block "main" . }}`.
- `layouts/home.html` — homepage: renders `content/_index.md` body, then lists `projects` and `posts` sections inline (not through `section.html`).
- `layouts/section.html` — list view for a section (used by `content/posts/_index.md` and `content/projects/_index.md`); respects a per-section `include_date` param to toggle date display in list items.
- `layouts/page.html` — single content page (blog post or project detail), shows title/date/content and renders tags via the `terms.html` partial.
- `layouts/taxonomy.html` / `layouts/term.html` — auto-generated tag index pages.
- `layouts/_partials/` — `head.html` (page `<head>`, delegates to `head/css.html` and `head/js.html`), `navbar.html`, `footer.html`, `menu.html` (generic recursive menu walker for `site.Menus`), `math.html` (loads MathJax, only included when a page sets `math = true` in front matter).

**Content structure.** Two sections: `content/posts/` (blog posts, e.g. `content/posts/entropy/index.md` — a page bundle with an accompanying image asset) and `content/projects/` (project cards on the homepage; each project's front matter has `params.external_link` pointing to an externally-hosted project rather than an in-site page — the homepage links directly to that URL). Both sections have an `_index.md` controlling section-level front matter (title, `include_date`).

**Front matter convention:** TOML (`+++` delimiters), not YAML. New content should follow `archetypes/default.md` (used by `hugo new`).

**Math rendering:** Set `math = true` in a page's front matter to load MathJax. Inline math uses `\( ... \)`, block math uses `\[ ... \]` or `$$ ... $$` — this passthrough delimiter config lives in `hugo.toml` under `markup.goldmark.extensions.passthrough` and must stay consistent with `layouts/_partials/math.html`'s MathJax config.

**Assets/CSS/JS:** `assets/css/main.css` is a single stylesheet (H5BP reset + custom styles) processed through Hugo Pipes (`resources.Get` → minify + fingerprint in production, unminified with sourcemaps in dev via `hugo.IsDevelopment`). `head/js.html` holds an unused `js.Build` pipeline for the same file; do not include it, since `js.Build` wraps the script and hides its global functions. `assets/js/main.js` (plain script, minified + fingerprinted but not run through `js.Build`, so its functions stay global for `onclick` handlers; loaded in `head.html`) provides the mobile nav toggle (`toggleMenu`/`closeMenu`) and the footer light/dark switch (`toggleTheme`).

**Deployment:** `.github/workflows/hugo.yaml` builds with Hugo and deploys `public/` to GitHub Pages on every push to `main`. There is no separate staging environment or PR preview.

## Working with content

- Draft files use the `.draft.md` / `.draft/` naming convention and are gitignored — use this for in-progress posts that shouldn't be committed yet.
- Blog posts with images should use page bundles (a directory with `index.md` + image files alongside), as in `content/posts/entropy/`.
