// Single source of truth for locale-scoped course facts that several build
// inputs must agree on. Plain ESM so both astro.config.mjs and the TypeScript
// route middleware (src/starlightRouteData.ts) can import it without drift.

// "Python for SDETs" (Tier 2) is English-only. It has no Azerbaijani translation,
// so Starlight serves /<non-en>/python-sdet/ as English fallback pages. This one
// object drives: the sidebar group label (astro.config.mjs), the sitemap
// exclusion of non-EN fallbacks (astro.config.mjs), and the OG card / Course
// JSON-LD / noindex / sidebar-prune logic (starlightRouteData.ts).
//
// ASSUMPTION: the course stays EN-only under /<locale>/python-sdet/. If an AZ
// translation is ever added, revisit the locale-keyed noindex and the
// group-label drop in the middleware (and the sitemap filter).
export const PYTHON_SDET = {
	segment: '/python-sdet/',
	enLanding: '/en/python-sdet/',
	groupLabel: 'Python for SDETs',
};
