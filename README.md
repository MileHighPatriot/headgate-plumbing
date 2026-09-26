# Headgate Plumbing & Drain (concept)

A portfolio concept site by [5280 Web Solutions](https://5280webs.com): a fictional Denver-metro plumbing company for homes and commercial buildings. People, reviews, license numbers and prices are illustrative.

## Features
- **Dispatch board hero**: next open two-hour arrival window (Denver time), live overnight low from Open-Meteo, symptom shortcuts
- **Triage** (`/help`): symptom → urgency, next-five-minutes steps, typical prices
- **Whose pipe is it?** (`/tools/whose-pipe`): interactive cutaway based on Denver Water's homeowner-responsibility rules
- **Water heater age** (`/tools/water-heater-age`): serial-number date decoding for Rheem/Ruud, A.O. Smith/State, Bradford White
- **Freeze Watch** (`/tools/freeze-watch`): 7-day lows with freeze nights flagged + saved checklist
- **Price book** (`/pricing`), **arrival-window booking** (`/book`), **backflow due-date tool** (`/commercial`), **Care Plan calculator** (`/plans`), ZIP service-area checker

## Develop
```bash
npm install
npm run dev
```

## Publish (GitHub Pages)
`npm run pages` builds a static export into `docs/` with the `/headgate-plumbing` base path. GitHub Pages serves `docs/` on `main`.

Business details live in `data/site.ts`; content in `data/*.ts`.

Photos are public domain (CC0) from StockSnap, Rawpixel and the USDA.
