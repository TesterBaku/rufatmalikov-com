// Single source of truth for locale-scoped course facts that several build
// inputs must agree on. Plain ESM so both astro.config.mjs and the TypeScript
// route middleware (src/starlightRouteData.ts) can import it without drift.

// "Python for SDETs" (Tier 2) is being translated to Azerbaijani incrementally.
// Until a given page has a real AZ source file, Starlight serves /az/python-sdet/…
// as an English fallback; those fallbacks stay noindexed, out of the sitemap, and
// hidden from the AZ sidebar. As each page ships in AZ, add its /az/ pathname to
// `azReady` below — that one list flips it live everywhere: sitemap inclusion
// (astro.config.mjs), noindex removal + Course JSON-LD on the AZ landing + AZ
// sidebar link (starlightRouteData.ts). This object is the single source of truth
// for the sidebar group label, the segment, and both landings.
export const PYTHON_SDET = {
	segment: '/python-sdet/',
	enLanding: '/en/python-sdet/',
	azLanding: '/az/python-sdet/',
	groupLabel: 'Python for SDETs',
	// AZ pathnames (trailing slash) that have a real Azerbaijani translation.
	// Grow this list as each page is translated; everything else under
	// /az/python-sdet/ is treated as an EN fallback (noindex, no sitemap, no AZ nav).
	azReady: ['/az/python-sdet/'],
};
