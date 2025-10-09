## Lockerlink Landing Experience

Lockerlink is a multi-language marketing site that introduces the brand’s luggage storage, transfer and partner solutions. The landing pages follow the provided PRD, offering Apple-style visuals, componentised content, analytics-friendly CTA hooks and fast static rendering suited for Vercel.

### Key features
- Four-locale support (zh / en / ja / ko) with client-side language persistence.
- Hero carousel, service grid, search form, interactive city map preview, how-it-works steps, testimonials slider and partner CTA banner.
- Reusable page shell powering `/`, `/storage`, `/delivery`, `/partner`, `/account`, plus legal pages.
- Responsive Tailwind styling with framer-motion micro-interactions and React Icons.
- Static export friendly and optimised for Vercel deployment.

### Tech stack
- [Next.js 15](https://nextjs.org/) (App Router, SSG)
- TypeScript, Tailwind CSS, Framer Motion
- Custom translation registry (`src/lib/i18n`)

### Project structure
```
src/
  app/
    (marketing)/       # Marketing routes: home, storage, delivery, partner, account
    (legal)/           # Privacy and terms routes
    globals.css        # Tailwind layer definitions and design tokens
    layout.tsx         # Root layout wiring LanguageProvider
  components/          # Shared layout, UI and section components
  features/marketing/  # Marketing page assembly (server + client components)
  hooks/               # Client hooks (analytics, i18n accessors)
  lib/i18n/            # Translation registry and language helpers
public/city_imgs/      # Hero + section imagery provided in PRD
docs/product-spec-prd.md  # Original Lockerlink PRD reference
```

### Getting started
Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the site. The language selector (top right) persists preference to `localStorage` and cookies.

### Available scripts
- `npm run dev` – start the local dev server.
- `npm run lint` – run ESLint checks.
- `npm run build` – generate the production build (SSG output).
- `npm start` – serve the production build.

### Deployment
The project is pre-configured for Vercel:
1. Push the repo to a Git provider.
2. Create a new Vercel project and import the repository.
3. Keep the default “Next.js” framework preset; no custom environment variables are required.
4. Deploy. Static assets (including `public/city_imgs`) are included automatically.

For self-hosting, run `npm run build` followed by `npm start` on your target infrastructure.

### Assets
High-resolution imagery referenced in the PRD lives in `public/city_imgs/`. Update or expand the set as needed; `<Image>` optimisations handle responsive delivery automatically.

### Analytics integration
CTA buttons call `useAnalytics().track(...)`, which currently pushes events into `window.dataLayer`. Replace the implementation in `src/hooks/useAnalytics.ts` with your preferred analytics sink (e.g., GTM, Segment) when ready.

---

Questions or improvements? Open an issue or submit a PR. Happy shipping!
