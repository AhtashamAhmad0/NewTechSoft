# New Tech Softs — Website Frontend Redesign

A complete, production-ready React frontend redesign of **newtechsofts.com** — a software house in Islamabad offering Web Development, App Development, and AI Solutions — built to the attached PRD using a **Glass Morphism** design system.

This README is written to double as interview prep: every section explains not just *what* was built, but *why* each tool and decision was chosen, so you can defend every line if asked.

---

## 1. Live Preview

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. For a production build:

```bash
npm run build
npm run preview
```

---

## 2. Tech Stack — and why each piece was chosen

This matches the PRD's "Technology Stack" table exactly. Nothing was added that wasn't asked for; nothing required was skipped.

| Technology | Purpose | Why this, specifically |
|---|---|---|
| **React 18** | UI library | Component reuse across 9 pages with shared sections (Hero, CTA, Team, Process appear on 3+ pages). Function components + hooks keep state logic colocated and testable. |
| **Vite** | Build tool | Native ESM dev server → instant startup and hot-module-reload, versus Webpack/CRA's bundle-then-serve model. Also produces smaller, better-optimized production bundles via Rollup. |
| **Tailwind CSS** | Styling | Utility classes let a full glassmorphism *design system* (colors, blur, spacing, radii) live in one config file (`tailwind.config.js`) instead of scattered CSS files — critical for a UI this consistent across 9 pages. |
| **React Router DOM** | Routing | Client-side routing for a 9-page SPA without full page reloads; `<Outlet />` pattern keeps Navbar/Footer mounted once instead of remounting per page. |
| **Framer Motion** | Animation | Declarative `initial` / `whileInView` / `animate` props instead of manually wiring IntersectionObserver + CSS keyframes for every scroll reveal. Also powers the shared page-transition and the mobile drawer's height animation. |
| **Lucide React** | Icons | Tree-shakeable, consistent 1.5px-stroke icon set that matches the thin, modern lines of a glass UI (versus a heavier filled icon set). |
| **React CountUp** | Counters | Animates the stats block (`120+ Projects`, `85+ Clients`...) — used *with* Framer Motion's `useInView`, not instead of it, so the count only fires once, the first time it scrolls into view. |
| **Swiper.js** | Carousels | Used for the Portfolio preview and Testimonials sections. Chosen over building a custom carousel because it handles touch/swipe, autoplay, and accessibility (ARIA roles, keyboard nav) out of the box. |
| **React Hook Form** | Forms | Uncontrolled-input form state (no `useState` per field) → fewer re-renders and built-in validation via `register()` rules, used on the Contact page. |
| **Axios** | HTTP client | Wraps the Contact form's POST request; chosen over raw `fetch` for automatic JSON handling and simpler error branching. |

---

## 3. Design System — the "why" behind the visuals

The PRD specified **Modern Glass Morphism**. Rather than defaulting to a generic dark-mode-plus-gradient-blob template, the palette and type system were chosen deliberately for a *software house* brand — technical, premium, and a little bit "control room."

### Color tokens (`tailwind.config.js` → `theme.extend.colors`)

| Token | Hex | Role |
|---|---|---|
| `deep` | `#0A0E1A` | Primary background — near-black navy, not pure black, so glass panels have somewhere to catch light |
| `deep.panel` | `#10152A` | Slightly raised panel background |
| `violet` | `#7C5CFF` | Primary brand accent |
| `cyan` | `#2DD4FF` | Secondary accent, paired with violet in the signature gradient |
| `amber` | `#FFB020` | Warm highlight for status/CTA emphasis — keeps the palette from feeling one-note |
| `ink.primary` / `ink.muted` / `ink.faint` | `#F5F7FF` / `#9AA3C7` / `#5C6488` | Three-step text hierarchy instead of relying on opacity alone |

### Typography

- **Space Grotesk** (display/headings) — a geometric, slightly technical sans that reinforces "software," not a generic system font.
- **Inter** (body) — high legibility at small sizes for long-form content (blog, service descriptions).
- **JetBrains Mono** (eyebrows/labels, e.g. `SERVICES`, the terminal in the Hero) — a direct, literal nod to code, used sparingly so it stays a signature rather than noise.

### The signature element

The homepage Hero doesn't use a generic gradient blob. Instead it renders a **typing "glass terminal"** (`src/components/home/Hero.jsx` → `GlassTerminal`) that cycles through `npm run build`, `flutter build`, and `python train.py` — literally showing the three services (Web / App / AI) as commands a developer would run. This is the one deliberately "loud" element; everything else (cards, nav, footer) stays quiet and consistent around it, per the "spend your boldness in one place" principle.

### Glass utility classes (`src/index.css` → `@layer components`)

```css
.glass        /* base frosted panel: bg-white/5, backdrop-blur-xl, border, shadow */
.glass-hover  /* lift + brighten on hover, used on every clickable card */
.glass-panel  /* .glass + rounded-2xl, the default panel shape */
.glass-nav    /* solid-ish frosted state for the sticky navbar once scrolled */
```

Centralizing these in `@layer components` (rather than repeating `bg-white/5 backdrop-blur-xl border border-white/10...` inline on 40+ elements) means the entire visual language can be re-tuned from one place.

---

## 4. Project Structure

```
newtechsofts-redesign/
├── index.html                  # Vite entry HTML, Google Fonts preconnect
├── vite.config.js              # Dev server + manual chunk splitting for prod
├── tailwind.config.js          # Design tokens: colors, fonts, shadows, keyframes
├── postcss.config.js
├── package.json
├── .env.example                # VITE_CONTACT_FORM_ENDPOINT
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # ReactDOM root + BrowserRouter
    ├── App.jsx                  # <Routes> — all 9 pages wired here
    ├── index.css                # Tailwind layers + glass utility classes
    ├── data/
    │   └── siteData.js          # ALL copy/content — nav, services, team,
    │                             #  testimonials, FAQs, portfolio, blog, etc.
    ├── hooks/
    │   ├── useScrolled.js        # navbar glass-on-scroll trigger
    │   └── ScrollToTop.jsx       # resets scroll position on route change
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx        # sticky, glass, mobile drawer, active-pill
    │   │   ├── Footer.jsx
    │   │   └── Layout.jsx        # Navbar + <Outlet/> + Footer + page transition
    │   ├── ui/                   # generic, content-agnostic primitives
    │   │   ├── GlassCard.jsx
    │   │   ├── Button.jsx        # renders <Link> or <button> depending on props
    │   │   ├── SectionHeading.jsx
    │   │   ├── PageHero.jsx      # compact hero used on all inner pages
    │   │   ├── StatCounter.jsx   # react-countup + framer-motion useInView
    │   │   └── Icon.jsx          # string -> lucide icon resolver
    │   └── home/                 # section components, composed on Home.jsx
    │       ├── Hero.jsx          # + the GlassTerminal signature element
    │       ├── Technologies.jsx  # marquee
    │       ├── WhyChooseUs.jsx
    │       ├── ServicesOverview.jsx
    │       ├── PortfolioPreview.jsx  # Swiper carousel
    │       ├── Team.jsx
    │       ├── Process.jsx
    │       ├── Testimonials.jsx      # Swiper carousel
    │       ├── FAQs.jsx              # accordion
    │       └── CTA.jsx               # reusable, reused on 5 pages
    └── pages/
        ├── Home.jsx           # composes all components/home/* sections
        ├── About.jsx          # Hero, Mission, Team, Process, CTA
        ├── Services.jsx       # Hero, Service Categories, CTA
        ├── Portfolio.jsx      # Hero, filterable Projects grid, CTA
        ├── Products.jsx       # Hero, Products, Process, CTA
        ├── Blog.jsx           # searchable/filterable post grid
        ├── BlogDetails.jsx    # Banner, article body, Related Posts, CTA
        ├── Contact.jsx        # react-hook-form + axios, Office Details, Socials
        └── NotFound.jsx       # 404 with inline SVG illustration
```

### Why this structure (interview talking point)

- **`data/siteData.js` is the single source of truth for content.** No component hardcodes copy. This means swapping in a real CMS/API later only touches one file — every page/component already just maps over this data.
- **`components/ui/` vs `components/home/` vs `components/layout/`** separates *generic reusable primitives* (Button, GlassCard) from *page-specific sections* (Hero, Testimonials) from *app shell* (Navbar, Footer). This is a common, interview-friendly answer to "how do you organize a React project."
- **Route-level code stays thin.** Every file in `pages/` is mostly composition — it imports section components and lays them out. Logic lives in the components/hooks, not the route files.

---

## 5. How it was built — process

1. **Read the PRD** (`PRD.docx`) to extract the required tech stack, page list, sections per page, breakpoints, and deliverables.
2. **Reviewed the live site** (newtechsofts.com) to confirm brand context — a Pakistan-based software house offering Web/App/AI services — so copy and structure would be grounded in the real business, not generic placeholder text.
3. **Designed the visual system before writing components**: picked the color tokens, type pairing, and the "glass terminal" signature element, then encoded them into `tailwind.config.js` and `index.css` so every component pulls from the same tokens instead of inventing new colors ad hoc.
4. **Built bottom-up**: UI primitives (`Button`, `GlassCard`, `SectionHeading`) → layout shell (`Navbar`, `Footer`, `Layout`) → home page sections → inner pages, reusing home sections (`CTA`, `Process`, `Team`) wherever the PRD listed the same section twice.
5. **Wired routing last**, once every page component existed, via `react-router-dom`'s nested `<Route element={<Layout />}>` pattern so the shell renders once and only `<Outlet />` swaps.
6. **Verified the production build** with `npm run build`, caught a large-bundle warning caused by a wildcard `lucide-react` import, and fixed it by switching to an explicit icon map (see Performance Notes below) — a good example of profiling → root-causing → fixing.

---

## 6. Performance Notes (good interview material)

- **Icon tree-shaking bug, on purpose left visible in git history logic:** the first pass imported icons with `import * as Icons from 'lucide-react'` and looked them up by string (`Icons[name]`). This defeats tree-shaking — Rollup can't prove which icons are unused, so it bundled the *entire* icon library, pushing the main chunk to ~950 KB minified. Fixing it by importing only the ~10 icons actually referenced (`src/components/ui/Icon.jsx`) dropped the main chunk to ~190 KB. **Takeaway for the interview:** dynamic property access on a wildcard import is a classic way to accidentally disable tree-shaking.
- **Manual chunk splitting** (`vite.config.js` → `build.rollupOptions.output.manualChunks`) separates `react`, `framer-motion`, and `swiper` into their own vendor chunks so browsers cache them independently of app code that changes more often.
- **`useInView` + `once: true`** on the Hero stats and every `GlassCard`/`SectionHeading` ensures scroll animations fire once, not on every scroll position change, avoiding unnecessary re-renders.
- **`prefers-reduced-motion`** is respected globally (`src/index.css` → `@media (prefers-reduced-motion: reduce)`), collapsing all animation durations to near-zero for users who've asked for it.

---

## 7. Accessibility

- Visible focus rings on every interactive element (`:focus-visible` in `index.css`), not just mouse hover states.
- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`.
- All icon-only buttons (mobile menu toggle, social links) have `aria-label`.
- Form inputs use associated `<label htmlFor>` pairs, not placeholder-only labeling.
- Color contrast: `ink.primary` (#F5F7FF) on `deep` (#0A0E1A) and `deep.panel` exceeds WCAG AA for body text.

---

## 8. Responsive Breakpoints

Matches the PRD's five target sizes using Tailwind's default breakpoint scale:

| PRD Target | Tailwind prefix | Width |
|---|---|---|
| Mobile | (default, unprefixed) | < 640px |
| Tablet | `sm:` | ≥ 640px |
| Laptop | `lg:` | ≥ 1024px |
| Desktop | `xl:` | ≥ 1280px |
| Large Desktop | content capped at `max-w-7xl`, centered | ≥ 1536px+ |

---

## 9. Wiring up a real API with Axios

`src/data/siteData.js` currently holds static content. To connect a real backend:

1. Replace the relevant export (e.g. `PORTFOLIO`) with a `useEffect` + `axios.get()` call inside the page component, or better, a small custom hook (`useFetch`) if you add more than one.
2. The **Contact form already talks to a real endpoint shape** — see `src/pages/Contact.jsx`. It reads the POST URL from `import.meta.env.VITE_CONTACT_FORM_ENDPOINT` (set in `.env`, copy from `.env.example`), so swapping Formspree for your own API is a one-line env change, not a code change.

---

## 10. Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check-free production build to `dist/` (with vendor chunk splitting) |
| `npm run preview` | Serve the production build locally to sanity-check before deploy |

---

## 11. What's intentionally left as a placeholder

- **Contact form endpoint** — points at a placeholder Formspree URL via `.env.example`; swap for a real endpoint before going live.
- **Team avatars / project screenshots** — rendered as gradient/initial placeholders rather than stock photography, so there's nothing to license or replace with real assets when you have them.
- **Blog article bodies** — the listing and detail page structure (banner, related posts, CTA) is fully built; the paragraph copy on `BlogDetails.jsx` is placeholder text clearly marked in a comment, ready to be swapped for real posts or a CMS feed.
#   N e w T e c h S o f t  
 