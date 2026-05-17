<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Locale routing (Next.js 16)

This project uses **`src/proxy.ts`** for internationalization routing (next-intl). In Next.js 16, the Edge entry file is `proxy.ts` — do **not** rename it to `middleware.ts`.

## i18n

- Server messages: `src/i18n/request.ts` merges all `messages/<locale>/*.json` files.
- Client provider: `NextIntlClientProvider` in `src/app/[locale]/layout.tsx` uses `getMessages()` so client components receive the full message catalog.
- Links: use `@/i18n/navigation` (`Link`, `usePathname`, etc.), not `next/link` for internal routes.

## WhatsApp

Use `@/lib/whatsapp` (`whatsAppUrl`, `whatsAppLink`, `getWhatsAppNumber`) — never hardcode phone numbers.

## Content

- Services live in `messages/*/service.json` (`all_services.items`).
- Branch data: `src/components/branch-locations-data.ts`.
<!-- END:nextjs-agent-rules -->
