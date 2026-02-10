# ENG 003 Parts Manual (Static Website)

This folder is a static, front-end website version of the ENG 003 parts manual PDF.

## Run locally

Because the site loads `data/manual.json`, you should run it with a local server:

```bash
cd eng003_parts_manual_site
python -m http.server 8000
```

Then open:

- http://localhost:8000/

## Files

- `index.html` — page shell
- `styles.css` — UI styling
- `app.js` — renderer, search, copy-to-clipboard
- `data/manual.json` — manual content extracted/mapped from the PDF
- `assets/pages/` — rendered page images from the source PDF
- `ENG_003_Draft.pdf` — original PDF (for reference)
