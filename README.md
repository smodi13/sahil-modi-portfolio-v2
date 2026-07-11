# Sahil Modi — Portfolio

A multi-page personal portfolio built with Next.js (App Router), Tailwind v4,
Framer Motion, and GSAP. Dark editorial design, corner-bracket accents, a
horizontal timeline, scroll-triggered reveals, and a Games section with six
playable interactive tools.

## Structure

- `/` — Home: hero with mouse-follow spotlight, positioning, timeline, featured work, skills, CTA
- `/projects` and `/projects/[slug]` — project index + detail writeups
- `/games` and `/games/[slug]` — six functional games (LBO speed-solve, reverse line movement, auctions, cap-table chess, market sizing, RPS vs a learning agent)
- `/resume` — embedded PDF viewer + download (`public/resume.pdf`)
- `/contact` — email, LinkedIn, GitHub

Content lives in `data/` (`content.ts`, `projects.ts`, `games.ts`). Shared
design tokens are in `app/globals.css`.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Updating the resume

The resume shown in the embedded viewer and download button is
`public/resume.pdf`. Replace that file with an updated export to change it — the
`/resume` page reads it directly.

## Removing the Vercel look (custom domain)

This project deploys to Vercel. To drop the `*.vercel.app` URL **and** remove the
Vercel badge, connect a custom domain:

1. Buy a domain (Vercel sells them directly, or use Namecheap / Cloudflare). `sahilmodi.com` is ideal if available.
2. In the Vercel dashboard, open this project → **Settings → Domains → Add**.
3. Enter your domain and follow the DNS instructions (either point nameservers to Vercel, or add the `A` / `CNAME` records Vercel shows).
4. Once verified, set it as the **Primary Domain**. The custom domain removes the `.vercel.app` URL and the Vercel badge, and Vercel provisions HTTPS automatically.

Default Next.js/Vercel template assets (favicon, `next.svg`, `vercel.svg`) have
already been removed; the favicon is the branded `app/icon.svg` monogram.
