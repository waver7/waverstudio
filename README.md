# WaverStudio

Premium marketing site for **WaverStudio** — an AI automation and software
engineering studio serving businesses in Miamisburg, Ohio (45342) and the
greater Dayton area.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for entrance & workflow motion
- [Lucide](https://lucide.dev/) icons
- [Geist](https://vercel.com/font) font (bundled locally — no external fetch)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/                      Routes, metadata, sitemap & robots
  page.tsx                Homepage (assembles the sections)
  ai-agents/ …            SEO service pages
  miamisburg-oh/          Local landing page
components/
  layout/                 Header, Footer, PageShell
  sections/               Homepage & service-page sections
  workflows/              Animated workflow visuals
  forms/                  Multi-step contact wizard
  ui/                     Primitives (buttons, badges, cards, headings)
lib/                      Site config, content data, JSON-LD helpers
```

## Design system

Dark, restrained interface built on tokens defined in `tailwind.config.ts`:

- Backgrounds `#050608` → `#11141C`, hairline borders at low opacity
- Signature gradient `#FF2EA6 → #A855F7 → #3287FF`, used sparingly for
  highlights, active states and CTAs
- Monospace labels for statuses and workflow metadata

## Notes

- The contact form currently resolves to a success state without a backend.
  Wire `components/forms/ContactWizard.tsx` `submit()` to an email/CRM endpoint
  when ready.
- Example projects are labelled **Example Workflow** — there are no fabricated
  testimonials, statistics or customer claims anywhere on the site.
- All motion respects `prefers-reduced-motion`.
