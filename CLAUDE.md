# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Jekyll static site** using the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) theme, deployed to GitHub Pages. It serves as an Arduino/electronics documentation site for UC Davis ENG 03 students.

## Local Development

```bash
bundle install
bundle exec jekyll serve
# Preview at http://127.0.0.1:4000
```

Deployment to GitHub Pages is automatic when changes are pushed to the `main` branch (via `.github/workflows/pages.yml`). The current working branch is `prod` — changes need to be merged to `main` to go live.

## Content Structure

All documentation lives in `docs/` as Markdown files. The nav hierarchy is defined via Jekyll front matter:

```yaml
---
title: Page Title
layout: page
nav_order: 2        # ordering within parent
parent: Parent Page # sets nesting in left nav
---
```

Top-level sections use `layout: home` or `layout: page` with no `parent`. Index pages for sections use `has_children: true` (implied by children pointing to them as `parent`).

## Adding a New Sensor Page

1. Place the `.md` file in the appropriate `docs/sensors/<Category>/` subfolder
2. Add front matter with `title`, `layout: page`, `nav_order`, and `parent` matching the category's index page title
3. Follow the standard page structure:
   - Component image via `figure.html` include
   - Pinout table
   - Wiring diagram via `figure.html` include
   - Example Arduino code block (use ` ```cpp ` for syntax highlighting)

## Figure Include

Use `_includes/figure.html` for all images — it adds lightbox zoom, drop shadow, and linked captions:

```liquid
{% include figure.html
   src="/assets/images/wiring/sensors/my_sensor.png"
   caption="Wiring diagram for My Sensor"
   width="60%"
   link="https://source-url.com"
   caption_prefix="Fig 1:" %}
```

Set `zoom="false"` to disable the lightbox on a specific image.

## Image Assets

Images are organized under `assets/images/` by type:
- `components/sensors/` — photos of the physical sensor
- `pinouts/sensors/` — pinout diagrams
- `wiring/sensors/` — wiring/breadboard diagrams

Motors and LCD have parallel subfolders under `components/`, `pinouts/`, and `wiring/`.

## Custom CSS & JS

All custom styles and scripts are loaded via `_includes/head_custom.html`. The CSS files in `assets/css/` each have a focused responsibility:

| File | Purpose |
|------|---------|
| `code.css` | Mac Terminal–style code blocks with Arduino IDE syntax colors |
| `nav.css` / `nav-indent.css` | Left navigation styling and indentation |
| `layout.css` | Page-level layout |
| `theme.css` | Color scheme (UC Davis Aggie Blue & Gold) |
| `image.css` | Lightbox and figure styles |
| `copy-btn.css` | Copy-to-clipboard button |

The `assets/js/arduino-highlight.js` script post-processes Rouge-highlighted code blocks to apply Arduino-specific function coloring (wraps known built-ins in `.arduino-fn` spans).

## Branch Workflow

- `main` — production branch; GitHub Actions deploys from here
- `prod` — active development branch
