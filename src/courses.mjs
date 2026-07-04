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
// The Python-for-SDETs pages, in sidebar order — the SINGLE source for both the
// sidebar (EN + AZ labels, generated in astro.config.mjs) and which pages are
// translated to AZ. A page is AZ-ready exactly when it has an `az` label, so
// shipping a translation is one edit here: fill in `az`. That one field adds the
// AZ sidebar label AND (via `azReady` below) makes the page indexed, in the
// sitemap, and visible in the AZ nav — the two can't drift apart. `slug: ''` is
// the Overview/landing.
export const PYTHON_SDET_MODULES = [
	{ slug: '', label: 'Overview', az: 'İcmal' },
	{ slug: 'module-0', label: '0 — Setup & first test', az: '0 — Quraşdırma və ilk test' },
	{ slug: 'module-1', label: '1 — pytest fundamentals', az: null },
	{ slug: 'module-2', label: '2 — Fixtures & parametrize', az: null },
	{ slug: 'module-3', label: '3 — API testing with requests', az: null },
	{ slug: 'module-4', label: '4 — Negative & validation testing', az: null },
	{ slug: 'module-5', label: '5 — Test data setup & teardown', az: null },
	{ slug: 'module-6', label: '6 — UI automation with Playwright', az: null },
	{ slug: 'module-7', label: '7 — Page Object Model', az: null },
	{ slug: 'module-8', label: '8 — Data-driven tests', az: null },
	{ slug: 'module-9', label: '9 — Reporting & suite structure', az: null },
	{ slug: 'module-10', label: '10 — CI with GitHub Actions', az: null },
	{ slug: 'module-11', label: '11 — Capstone project', az: null },
	{ slug: 'module-12', label: '12 — Database verification', az: null },
];

const azPath = (slug) => '/az/python-sdet/' + (slug ? slug + '/' : '');

export const PYTHON_SDET = {
	segment: '/python-sdet/',
	enLanding: '/en/python-sdet/',
	groupLabel: 'Python for SDETs',
	// AZ pathnames (trailing slash) with a real translation — DERIVED from the
	// module list above (a page is AZ-ready iff it has an `az` label). Everything
	// else under /az/python-sdet/ is an EN fallback (noindex, no sitemap, no AZ nav).
	azReady: PYTHON_SDET_MODULES.filter((m) => m.az != null).map((m) => azPath(m.slug)),
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
