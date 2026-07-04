// Single source of truth for locale-scoped course facts that several build
// inputs must agree on. Plain ESM so both astro.config.mjs and the TypeScript
// route middleware (src/starlightRouteData.ts) can import it without drift.

// "Python for SDETs" (Tier 2) is being translated to Azerbaijani incrementally.
// PYTHON_SDET_MODULES below (in sidebar order) is the SINGLE source for both the
// sidebar (EN + AZ labels, generated in astro.config.mjs) and which pages are
// translated to AZ. A page is AZ-ready exactly when its entry has an `az` label —
// so shipping a translation is ONE edit: fill in `az`. That one field adds the AZ
// sidebar label AND (via the derived `azReady` below) flips the page live
// everywhere — sitemap inclusion (astro.config.mjs), noindex removal + Course
// JSON-LD on the AZ landing + AZ sidebar link (starlightRouteData.ts) — so the two
// can't drift apart. Until a page is translated it stays an EN fallback: noindexed,
// out of the sitemap, hidden from the AZ nav. `slug: ''` is the Overview/landing.
export const PYTHON_SDET_MODULES = [
	{ slug: '', label: 'Overview', az: 'İcmal' },
	{ slug: 'module-0', label: '0 — Setup & first test', az: '0 — Quraşdırma və ilk test' },
	{ slug: 'module-1', label: '1 — pytest fundamentals', az: '1 — pytest əsasları' },
	{ slug: 'module-2', label: '2 — Fixtures & parametrize', az: '2 — Fixtures və parametrize' },
	{ slug: 'module-3', label: '3 — API testing with requests', az: '3 — requests ilə API testi' },
	{ slug: 'module-4', label: '4 — Negative & validation testing', az: '4 — Neqativ və validasiya testi' },
	{ slug: 'module-5', label: '5 — Test data setup & teardown', az: '5 — Test datası quraşdırma və söküş' },
	{ slug: 'module-6', label: '6 — UI automation with Playwright', az: '6 — Playwright ilə UI avtomatlaşdırma' },
	{ slug: 'module-7', label: '7 — Page Object Model', az: null },
	{ slug: 'module-8', label: '8 — Data-driven tests', az: null },
	{ slug: 'module-9', label: '9 — Reporting & suite structure', az: null },
	{ slug: 'module-10', label: '10 — CI with GitHub Actions', az: null },
	{ slug: 'module-11', label: '11 — Capstone project', az: null },
	{ slug: 'module-12', label: '12 — Database verification', az: null },
];

const SEGMENT = '/python-sdet/';
// Locale-prefixed page path for a module ('' slug = the landing).
const sdetPath = (locale, slug) => `/${locale}${SEGMENT}${slug ? slug + '/' : ''}`;
// Sidebar link for a module — no locale prefix (Starlight adds it per locale).
export const sdetLink = (slug) => `${SEGMENT}${slug ? slug + '/' : ''}`;

export const PYTHON_SDET = {
	segment: SEGMENT,
	enLanding: sdetPath('en', ''),
	groupLabel: 'Python for SDETs',
	// AZ pathnames with a real translation — DERIVED from the module list above.
	// A page is AZ-ready iff its entry has a (truthy) `az` label — the SAME test
	// the sidebar's translations spread uses, so the two can never disagree.
	azReady: PYTHON_SDET_MODULES.filter((m) => m.az).map((m) => sdetPath('az', m.slug)),
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
