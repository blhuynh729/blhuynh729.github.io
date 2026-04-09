# Contributing to ENG 03 Parts Manual

This guide explains how the project is structured and how to add new content.

---

## Project Overview

This is a **Jekyll** site using the **Just the Docs** theme, hosted on GitHub Pages. It serves as a sensor and parts documentation site for ENG 03 at UC Davis.

---

## Directory Structure

```
blhuynh729.github.io/
├── index.md                        # Home page
├── _config.yml                     # Jekyll site configuration
├── Gemfile                         # Ruby dependencies
├── _includes/                      # Custom HTML partials
│   ├── figure.html                 #   Image/figure with caption and lightbox
│   ├── head_custom.html            #   Custom CSS/JS/font imports
│   └── title.html                  #   Site logo + title in sidebar
├── assets/
│   ├── css/                        # Custom stylesheets
│   ├── js/                         # Custom JavaScript
│   └── images/                     # All images, organized by category
├── docs/
│   ├── Setup/                      # Getting started / help section
│   ├── Common_Parts/               # Motors, LCDs, relays, etc.
│   └── sensors/                    # All sensor documentation
│       ├── Environmental-Sensing/
│       │   ├── Atmosphere/
│       │   ├── Acoustic/
│       │   ├── Optical/
│       │   └── Liquid-and-Soil/
│       ├── Motion-and-position-sensing/
│       │   ├── Motion-Detection/
│       │   ├── Orientation-and-Navigation/
│       │   └── Proximity-and-Presence/
│       └── Human-Sensing-and-Controls/
│           ├── Biometrics/
│           └── Inputs/
└── _site/                          # Generated output (do not edit)
```

---

## How Navigation Works

The sidebar navigation is **automatically generated** from frontmatter in each Markdown file. There are no manual nav config files — the hierarchy is defined entirely by these frontmatter fields:

| Field           | Purpose                                                    |
| :-------------- | :--------------------------------------------------------- |
| `title`         | Page name shown in the sidebar                             |
| `layout`        | Use `page` for all content pages, `home` for the home page |
| `nav_order`     | Sort position among siblings (1, 2, 3...)                  |
| `has_children`  | Set to `true` if this page has child pages beneath it      |
| `parent`        | Must **exactly match** the parent page's `title`           |
| `grand_parent`  | Must **exactly match** the grandparent's `title`           |
| `nav_exclude`   | Set to `true` to hide from sidebar                         |

### Navigation Hierarchy

The site supports up to 4 levels of nesting:

```
Level 1 — Top-level sections  (e.g., "Common Components")
  Level 2 — Subsections       (e.g., "Environmental Sensing")
    Level 3 — Categories      (e.g., "Atmosphere")
      Level 4 — Leaf pages    (e.g., "Ambient Temperature Sensor")
```

---

## Creating a New Page

### Step 1: Choose Where It Goes

Determine where your page fits in the hierarchy. The folder you place it in should match its parent section.

### Step 2: Create the Markdown File

Create a `.md` file in the appropriate folder. Use the frontmatter templates below depending on the level.

### Step 3: Add Images (if any)

Place images in `assets/images/` under a descriptive subfolder (e.g., `assets/images/environmental_sensors/your_sensor/`).

---

## Frontmatter Templates

### Adding a leaf page to an existing category

This is the most common case — adding a new sensor or component page.

**Example:** Adding a new sensor under `Atmosphere`

File: `docs/sensors/Environmental-Sensing/Atmosphere/your_sensor.md`

```yaml
---
title: Your Sensor Name
layout: page
nav_order: 5
parent: Atmosphere
grand_parent: "Environmental Sensing"
---
```

**Example:** Adding a new component under `Common Components`

File: `docs/Common_Parts/your_component.md`

```yaml
---
title: Your Component Name
layout: page
nav_order: 6
parent: Common Components
---
```

### Adding a new category (with child pages)

If you need a new grouping, create a folder with an `index.md`.

**Example:** Adding a new category under `Environmental Sensing`

File: `docs/sensors/Environmental-Sensing/NewCategory/index.md`

```yaml
---
title: New Category
has_children: true
layout: page
nav_order: 5
parent: "Environmental Sensing"
---
```

Then add child pages inside that folder:

File: `docs/sensors/Environmental-Sensing/NewCategory/some_sensor.md`

```yaml
---
title: Some Sensor
layout: page
nav_order: 1
parent: New Category
grand_parent: "Environmental Sensing"
---
```

### Adding a new top-level section

File: `docs/NewSection/index.md`

```yaml
---
title: New Section
has_children: true
layout: page
nav_order: 7
---
```

---

## Page Content Guide

Each sensor/component page typically follows this structure:

```markdown
# Sensor Name
Brief description of what the sensor does and common use cases.

{% include figure.html src="/assets/images/category/sensor/photo.png" caption="Sensor photo" caption_prefix="Fig 1:" width="60%" %}

## Pinout

{% include figure.html src="/assets/images/category/sensor/pinout.png" caption="Pinout diagram" caption_prefix="Fig 2:" width="60%" %}

| Sensor Pin | Connect to Arduino | Description          |
| :--------- | :----------------- | :------------------- |
| VCC        | 5V                 | Power supply         |
| GND        | GND                | Ground               |
| OUT        | Digital/Analog Pin | Signal output        |

## Wiring

{% include figure.html src="/assets/images/category/sensor/wiring.png" caption="Wiring diagram" caption_prefix="Fig 3:" width="80%" %}

Description of how to wire the sensor.

## Example Code

```cpp
// Arduino code here
```
```

### Including Images

Use the custom `figure.html` include for all images:

```liquid
{% include figure.html
   src="/assets/images/folder/image.png"
   caption="Description of image"
   caption_prefix="Fig 1:"
   width="60%"
%}
```

| Parameter        | Required | Description                                |
| :--------------- | :------- | :----------------------------------------- |
| `src`            | Yes      | Path to image in `/assets/images/`         |
| `caption`        | No       | Caption text below the image               |
| `caption_prefix` | No       | Text before caption (e.g., "Fig 1:")       |
| `width`          | No       | Image width, defaults to 100%              |
| `alt`            | No       | Alt text for accessibility                 |
| `zoom`           | No       | Enable lightbox zoom, defaults to true     |

---

## Common Pitfalls

- **`parent` must exactly match the parent's `title`** — including spaces, capitalization, and any trailing whitespace. If the nav link doesn't appear, check this first.
- **Don't forget `grand_parent`** for pages 3+ levels deep.
- **Don't edit files in `_site/`** — that folder is auto-generated by Jekyll.
- **Use `has_children: true`** only on pages that have child pages beneath them.

---

## Running Locally

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://127.0.0.1:4000`.

---

## Forking / Rebranding for a Different Course

If you are adapting this site for a different course or institution, update the following files:

### 1. `_config.yml`

Update the site title, description, and URL:

```yaml
title: YOUR COURSE Parts Manual
description: Sensor and Parts documentation site for YOUR COURSE.
url: https://YOUR-USERNAME.github.io
```

### 2. `index.md`

Update the welcome text, course name, and professor:

```markdown
# Welcome to YOUR COURSE!

Welcome to the documentation site for **YOUR COURSE**.

**Course:** YOUR COURSE
**Professor:** Your Name
```

### 3. `_includes/title.html`

Replace the logo image path and alt text:

```html
<img src="{{ '/assets/images/your-logo.png' | relative_url }}" alt="Your Institution" class="site-logo-img">
{{ site.title }}
```

### 4. `assets/images/`

- Replace `ucd-eng-logo.png` with your own logo
- Replace `favicon.ico` with your own favicon

### 5. `assets/css/nav.css` — Brand Colors

Update the color variables at the top of the file to match your institution's branding:

```css
:root {
  --ucd-blue:         #022851;   /* Primary background color */
  --ucd-blue-light:   #0B3D74;   /* Lighter variant */
  --ucd-gold:         #FFBF00;   /* Accent color */
  --ucd-gold-soft:    #FFD54F;   /* Soft accent */
}
```

### 6. `README.md`

Update all references to ENG 03, UC Davis, and the site URL.

### 7. `CONTRIBUTING.md`

Update the title and description at the top of this file.

---

Everything else — the sensor/component documentation, theme infrastructure, layouts, CSS, and JavaScript — is reusable as-is.
