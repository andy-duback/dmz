# DMZ Investment Club

Weekly stock pitch site for the DMZ Investment Club. Each week's pick gets its own page (financial highlights, thesis, risks, research reports, news, video/podcast) linked from the watchlist landing page.

## Structure

- `index.html` — watchlist landing page, links out to each week's pick
- `assets/` — shared JS: nav data, live price/financials/news fetchers
- `ibm/` — this week's pick (International Business Machines)
  - `index.html` — the pick's page
  - `assets/ibm-data.js` — all copy + data for the page
  - `assets/pdfs/` — supporting research reports

## Adding a new week

Duplicate the `ibm/` folder, rename it to the new ticker (lowercase), update its `assets/*-data.js` file with the new company's data, and add an entry to `assets/weeks-data.js` so it shows up on the landing page.

## Live data

Market cap, P/E, ROE, dividend, debt, price/change, and recent headlines refresh on page load from Yahoo Finance's public endpoints (via a chain of free CORS proxies, since GitHub Pages is a plain static host). If every proxy is temporarily down, the page falls back to the last successfully fetched values, cached locally in the browser — the static values in each page's `*-data.js` file are just the initial-paint / on-the-day snapshot.

## Hosting

Deployed via GitHub Pages, "Deploy from a branch" → `main` → `/ (root)`.
