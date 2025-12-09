# Changelog

## [0.1.1] - 2025-12-09

### Added
* Implemented accessible Skip to Content feature using a keyboard-first SkipLink component.
* Added mobile navigation toggle with Escape-to-close behavior.
* Added shrink-on-scroll header behavior (dynamic padding + shadow).
* Added animated underline for active navigation items.
* Added centered underline positioning to maintain consistency when header shrinks.
* Added improved active state (pill background) for current navigation item.
* Added additional accessibility enhancements (ARIA attributes, focus handling).

### Changed
* Refactored Header.tsx into a full client component with controlled menu state.
* Updated navigation markup to support underline animation and scroll behavior.
* Cleaned up hero styling and improved text contrast.
* Improved DOM structure by placing SkipLink inside header.
* Updated global CSS with underline transitions, header transitions, and stacking context fixes.

### Fixed
* Removed visual glitch caused by skip-link sliver appearing in the top-left corner.
* Fixed underline not being visible after header scroll.
* Fixed active nav styling getting overwritten by layout changes.
* Fixed overlapping header spacing issues on scroll.
* Fixed mobile nav menu remaining open after navigation.



## [0.1.0] - 2025-12-09

### Added
* Initial MVP release (local-development ready):
    * Local WordPress setup instructions (LocalWP) and `teckstack.local` usage.
    * Example post created in local WP for testing (`react-hooks-cheat-sheet`).
    * `lib/wp.ts` for `getAllPosts()` and `getPostBySlug(slug)`.
    * Homepage (`app/page.tsx`) with hero and static category cards.
    * Blog post page (`app/posts/[slug]/page.tsx`) rendering WP HTML.
    * Client-side syntax highlighting via Prism and copy-to-clipboard for code blocks (`components/PostBodyClient.tsx`).
    * Tailwind v4 config with `@tailwindcss/typography` plugin and custom color tokens.
    * Basic global styles: .prose, code/pre styling, copy button styles.
    * Error/logging improvements on data fetches.
    * README (basic instructions) and this CHANGELOG.md.


### Fixed
* Local API connection debugging: environment variable support for WP_URL.
* 404 caused by unwrapped params.slug (fixed to const { slug } = await params;).

### Backlog
#### Dev
* (Home) Design Home page first with Tailwind CSS
* (Blog) Build /blog list page with PostCard components and pagination.
* (Single Post) Apply reading-time calculation and display under article meta.
* (Single Post - LESS IMP) Add Table of Contents component (client-side based on headings).
* (Single Post) Add Giscus/Utterances comments integration (temporary).
* (Common) Add sitemap.xml and robots.txt generation.
* (API) Harden server-side sanitation of WP HTML using sanitize-html.
* SEO Feature integration
* Add search functionality
* Create static pages

#### Medium Term
* Deploy Next.js to Vercel (connect repo, environment variables).
* Move WordPress from teckstack.local to cms.teckstack.com (production subdomain).
* Add analytics (GA4) and email capture (Mailchimp or ConvertKit).
* Implement search feature (Typesense/MeiliSearch)
* Prepare Sanity/Strapi migration plan (if this is the plan in mind).

#### Long Term
* Multi-author support & author pages.
* Custom comments system backed by Supabase / Postgres.
* Sponsorship workflow (sponsored posts, admin UI, sponsor records).
* A/B test open graph and SEO metadata.
* Accessibility audit & Lighthouse tuning.
