# Add About and Services pages with working navigation

## What this builds
- A dedicated `/services` page describing the company's offerings.
- A dedicated `/about` page introducing the company.
- A shared, sticky header in the root layout so navigation works on every route.

## How
1. Move the sticky header out of `src/routes/index.tsx` and into a shared `Header` component rendered inside `src/routes/__root.tsx`.
2. Replace the header's hash-anchor links (`#what-we-do`, `#contact`, etc.) with TanStack `<Link>` components pointing to `/`, `/services`, and `/about`.
3. Create `src/routes/services.tsx` with route-specific `head()` metadata and content styled with the existing design tokens (`hero-backdrop`, `surface-card`, `text-gradient-headline`, etc.).
4. Create `src/routes/about.tsx` with route-specific `head()` metadata and matching visual style.
5. Remove the duplicated header markup from `src/routes/index.tsx`.

## Result
The top navigation will route to real pages instead of scrolling to homepage sections.
