# ENG 03 Arduino Documentation Site

This repository contains the source code for the **ENG 03 Arduino Documentation Website**, a GitHub Pages site built to support UC Davis students learning electronics, sensors, and Arduino programming.

The site provides **step-by-step setup guides, sensor wiring diagrams, example Arduino code, and troubleshooting tips** in a clean, accessible format.

---

## 🌐 Live Site

Once GitHub Pages is enabled, the site is available at: https://blhuynh729.github.io/blhuynh729.github.io


---

## 📚 What This Site Includes

- **Getting Started**
  - Arduino IDE installation
  - Board and port selection
  - Breadboard basics
  - Serial Monitor & debugging

- **Sensors**
  - Movement & Location (Ultrasonic, PIR, Accelerometer, etc.)
  - Stuff in the Air (Gas, Dust, Humidity, Rain)
  - Water (Soil moisture, Flow, Level, TDS, pH)
  - Light (Photoresistor, UV, RGB)
  - Human Interface (Buttons, Encoders, Keypads)
  - Sound (Microphones)

- **Each sensor page includes**
  - Parts required
  - Wiring tables and diagrams
  - Example Arduino code
  - Common mistakes and fixes
  - Optional challenges

- **Troubleshooting**
  - Upload errors
  - Power issues
  - Floating inputs
  - Serial output problems

- **Reference**
  - Pinout cheat sheets
  - Digital vs analog
  - I2C / SPI / UART basics
  - Pull-up resistors

---

## 🎨 Design & UX Highlights

- UC Davis branding (Aggie Blue & Gold)
- Wide, readable content layout
- Textured paper-style background for readability
- Mac Terminal–style code blocks with language labels
- Clear left navigation with active-page highlighting
- Responsive and mobile-friendly

---

## 🛠 Built With

- **Jekyll**
- **Just the Docs** theme
- **GitHub Pages**
- Custom CSS for layout, navigation, and code styling

No backend or database required — this is a fully static site.

---

## 📁 Repository Structure




---

## ✏️ Editing Content

To add or edit pages:

1. Navigate to the `docs/` folder
2. Create or edit `.md` files
3. Commit changes
4. GitHub Pages rebuilds automatically

No local build is required for small edits.

---

## 💻 Local Development (Optional)

If you want to preview locally:

```bash
bundle install
bundle exec jekyll serve


## Licensing and Attribution

This repository is licensed under the [MIT License]. You are generally free to reuse or extend upon this code as you see fit; just include the original copy of the license (which is preserved when you "make a template"). While it's not necessary, we'd love to hear from you if you do use this template, and how we can improve it for future use!

The deployment GitHub Actions workflow is heavily based on GitHub's mixed-party [starter workflows]. A copy of their MIT License is available in [actions/starter-workflows].

----

[^1]: [It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll#creating-your-site).

[Jekyll]: https://jekyllrb.com
[Just the Docs]: https://just-the-docs.github.io/just-the-docs/
[GitHub Pages]: https://docs.github.com/en/pages
[GitHub Pages / Actions workflow]: https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
[Bundler]: https://bundler.io
[use this template]: https://github.com/just-the-docs/just-the-docs-template/generate
[`jekyll-default-layout`]: https://github.com/benbalter/jekyll-default-layout
[`jekyll-seo-tag`]: https://jekyll.github.io/jekyll-seo-tag
[MIT License]: https://en.wikipedia.org/wiki/MIT_License
[starter workflows]: https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml
[actions/starter-workflows]: https://github.com/actions/starter-workflows/blob/main/LICENSE
