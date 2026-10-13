# Słowa

Personal writings portfolio — https://reienn.github.io/words/

All content lives in this repository, no backend required. Built with Vite, React and React Router.

## Content

- **Writings:** `src/data/writings.json` — an array of entries:

  ```json
  {
    "slug": "url-of-the-entry",
    "title": "Title",
    "type": "poem",
    "created": "2024-01-31T12:00:00Z",
    "image": "url-of-the-entry.jpg",
    "content": "First line<br>second line<br><br>Next stanza"
  }
  ```

  - `type` is `poem` (Poezja) or `story` (Proza).
  - `content` is HTML (`<br>`, `<p>`, `<i>`, `<h3>` are used).
  - Within each type, entries are listed newest first by `created`.
- **Images:** `public/images/` — `image` is a file name in that folder
  (a full `https://` URL also works). `homepage.svg` is the home page illustration.
  SVG images are displayed without the photo filter.

To add a writing: add an image to `public/images/`, add an entry to `writings.json`
and push to `master` (it can be done directly in the GitHub web editor).

## Deployment

Every push to `master` builds the site and publishes it to the `gh-pages` branch
(`.github/workflows/deploy.yml`). To redeploy without a change, run the **Deploy**
workflow manually from the Actions tab.

## Development

Requires Node 22+ (see `.nvmrc`).

```sh
npm ci
npm run dev       # dev server at http://localhost:5173/words/
npm test
npm run build     # production build in dist/
npm run preview   # serve the production build
```

### URLs

Each writing has its own URL, e.g. `/words/bezmiary-bezwladu`. GitHub Pages has no
URL rewrites, so the build writes `dist/<slug>/index.html` for every writing (with its
own `<title>`) plus a `404.html` fallback. Old links like `/words/#/slug` are
redirected to the new form on load.

### Image migration

`scripts/download-images.js` downloads the original images listed in
`scripts/image-sources.json` into `public/images/` (existing files are skipped):

```sh
node scripts/download-images.js
```
