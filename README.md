# Hakka Hydro Tirta — Marketing Website

Bilingual (EN / ID) marketing site for **PT Hakka Hydro Tirta**, built with Next.js 16, React 19, Tailwind CSS 4, and next-intl.

## Stack

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl (`/en`, `/id`)
- **Locale routing:** `src/proxy.ts` (Next.js 16 replaces `middleware.ts` with `proxy.ts`)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Lint/format:** Biome
- **Maps:** Leaflet (dynamic import on branch locator)

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/en` or `/id`.

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO / sitemap |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (digits only, with country code) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4 ID |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Biome lint + format check |
| `npm run typecheck` | TypeScript check |
| `npm run test:e2e` | Playwright smoke tests |

## Project structure

```
src/
  app/[locale]/     # Localized pages
  components/       # UI sections & navigation
  i18n/             # next-intl config + navigation helpers
  lib/              # WhatsApp, metadata, services helpers
  proxy.ts          # Locale proxy (Next.js 16)
messages/
  en/ id/           # Translation JSON per namespace
```

## Adding a service

1. Edit `messages/en/service.json` and `messages/id/service.json` under `all_services.items`.
2. Include a unique `slug` — the page is auto-generated at `/[locale]/service/[slug]`.
3. Rebuild to refresh static paths and sitemap.

## Adding a locale

1. Add the locale code to `src/i18n/config.ts` and `src/proxy.ts`.
2. Create `messages/<locale>/` with the same JSON files as `en/`.

## Deploy

Build and run on any Node.js host, or deploy to Vercel. Set environment variables in your hosting dashboard.
