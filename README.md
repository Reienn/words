# Słowa

Personal writings portfolio — https://reienn.github.io/words/

All content lives in this repository, no backend required.

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
(`.github/workflows/deploy.yml`). Manual deploy is still possible with `npm run deploy`.

## Development

Requires Node 16 (see `.nvmrc`).

```sh
npm ci
npm start
```

### Image migration

`scripts/download-images.js` downloads the original images listed in
`scripts/image-sources.json` into `public/images/` (existing files are skipped):

```sh
node scripts/download-images.js
```
