# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # Turbopack dev server (NODE_OPTIONS max-old-space-size=2048)
npm run dev:webpack    # same, but --webpack (fallback when Turbopack misbehaves)
npm run build          # next build
npm run start          # production server
npm run lint           # eslint (flat config, eslint-config-next core-web-vitals + typescript)
npm test               # playwright test — auto-starts `npm run dev` on :3000
npx playwright test tests/home.spec.ts                       # single file
npx playwright test tests/home.spec.ts -g "hero"             # single test by title
npx playwright test --project=mobile-safari                  # one device project
npx prisma migrate dev     # apply/create migrations (reads prisma.config.ts, loads .env via dotenv)
npx prisma generate        # regenerate client after schema edits
```

Playwright projects: `chromium`, `mobile-safari` (iPhone SE), `tablet` (iPad). Note `tests/`, `playwright.config.ts`, and `playwright-report/` are gitignored — test files are local-only.

## Architecture

Next.js 16 App Router + React 19, TypeScript strict, Tailwind 3, Prisma 7 on PostgreSQL. Marketing/recruitment site for LIC agents & Bima Sakhi in Chandigarh Tricity. Single conversion funnel: page CTA → lead form → `POST /api/leads` → Postgres → WhatsApp deep link.

**Routes** — `/` (landing), `/about`, `/career-in-lic`, `/bima-sakhi`, `/mdrt`, `/apply`. `/contact` permanently redirects to `/apply` (`next.config.ts`). API: `POST /api/leads` (Zod-validated lead capture), `GET /api/settings` (health/env probe).

**Data layer** — `lib/prisma.ts` builds a `pg` `Pool` + `PrismaPg` driver adapter and caches both on `globalThis` in non-production (dev HMR). The single model is `Lead` (`prisma/schema.prisma`, table `leads`). `InterestType` enum values are `@map`ped to hyphenated DB values (`bima-sakhi`, `development-officer`), so the DB string and the TS member name differ — go through `interestMap` in [route.ts](app/api/leads/route.ts) rather than casting. The API accepts only `agent` | `bima-sakhi`; `development_officer` exists in the schema but no form emits it.

**Layout shell** — `app/layout.tsx` mounts `LenisProvider` → `GoogleAnalytics`, `Header`, page, `Footer`, `BottomNav`, `WhatsAppButton`. `Header` is `fixed`; the content wrapper compensates with `pt-[var(--site-header-offset)]` (`--site-header-offset: 6rem`, defined in `app/globals.css` and also used for `scroll-padding-top`). Change the header's height and that variable together.

**Component tiers** — `components/ui/` primitives (PremiumButton/Card, FadeInOnScroll, AnimatedStat), `components/sections/` reusable page sections, `components/landing/` landing-specific blocks (ConversationalLeadForm, IncomeCalculator, PersonaJourney, FAQAccordion). Landing page copy/config (personas, steps, FAQs) lives as typed const arrays at the top of `app/page.tsx`.

**Motion** — three stacked systems: Lenis smooth scroll (`LenisProvider` bails out on `prefers-reduced-motion` or coarse pointer, so it is desktop-only), Framer Motion variants in `lib/animationVariants.ts` + `hooks/useScrollAnimation.ts` (`useInView`), and Tailwind keyframe animations in `tailwind.config.ts`. `hooks/useResponsiveMotion.ts` returns `full` | `reduced` (<768px) | `minimal` (reduced-motion) and `getAnimationConfig` maps that to durations/stagger — use it instead of hardcoding new timings. `globals.css` also globally neutralizes animation/transition durations under `prefers-reduced-motion`.

**Styling** — Material-3-style token palette defined as Tailwind colors (`primary`, `surface-container-*`, `on-*`, …); prefer these tokens over raw hex. Fonts are `next/font` Sora (`font-headline`) and Manrope (`font-body`/`font-label`) via CSS variables. Shared utilities in `globals.css`: `.section-shell`, `.page-section`, `.glass`, `.hide-scrollbar`, `.pb-safe`.

**Analytics** — `lib/analytics.ts` `trackEvent`/`trackPageView` no-op unless `NEXT_PUBLIC_GA_ID` is set and `window.gtag` exists; CTAs and form steps already emit events (`cta_click`, `form_start`, …). Keep new CTAs consistent with the existing `{ location, cta_type, page }` shape.

**`public/sw.js`** is a self-unregistering kill-switch service worker (clears caches, unregisters, reloads clients) — not a real PWA worker; don't "fix" it into one.

## Environment

`.env` / `.env.local`: `DATABASE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, optional `NEXT_PUBLIC_GA_ID`. The WhatsApp number is read inline in ~9 files with a hardcoded `'+918872364673'` fallback; `wa.me` links strip the leading `+`.

Deployment is self-hosted (VPS + nginx + PM2 + certbot), documented in `VPS_DEPLOYMENT_GUIDE.md`, `DEPLOYMENT_QUICK_START.md`, and `NGINX_MULTISITE_GUIDE.md`. Site: tricitylifeinsurance.com.
