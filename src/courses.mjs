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
	groupLabel: 'Python for SDETs',
	// AZ pathnames (trailing slash) that have a real Azerbaijani translation.
	// Grow this list as each page is translated; everything else under
	// /az/python-sdet/ is treated as an EN fallback (noindex, no sitemap, no AZ nav).
	azReady: ['/az/python-sdet/'],
};

// Single predicate for "does this page have a real AZ translation?", used by every
// call site (sitemap filter, noindex, Course JSON-LD, AZ sidebar) so they can never
// disagree. Accepts a bare pathname, a full URL, or a sidebar href, and matches
// PYTHON_SDET.azReady after normalizing away the scheme/host and the trailing slash.
export function isAzReady(pathOrUrl) {
	if (!pathOrUrl) return false;
	let path = String(pathOrUrl);
	const scheme = path.indexOf('://');
	if (scheme !== -1) {
		const slash = path.indexOf('/', scheme + 3);
		path = slash === -1 ? '/' : path.slice(slash);
	}
	const norm = (p) => (p.endsWith('/') ? p : p + '/');
	return PYTHON_SDET.azReady.some((entry) => norm(path) === norm(entry));
}
