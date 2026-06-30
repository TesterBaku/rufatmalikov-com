import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { PYTHON_SDET } from './courses.mjs';

// The sidebar config is shared across locales, so per-locale adjustments (plus
// OG images and JSON-LD) happen here at request time. Two locale-scoped courses
// drive most of the logic below:
//
//  - Exam Helper is an Azerbaijani/Russian-only school exam-prep app; its sidebar
//    group is dropped from the English navigation so the EN site reads as
//    QA/testing-focused.
//  - "Python for SDETs" (Tier 2) is English-only — see src/courses.mjs (PYTHON_SDET,
//    the single source of truth) for the full scheme: shared OG card, Course JSON-LD
//    on the EN landing, noindex on non-EN fallbacks, and the group dropped from
//    non-EN nav. One per-locale `dropLabel` drives the pruning for both courses.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const pathname = context.url.pathname;
	const isPythonSdet = pathname.includes(PYTHON_SDET.segment);

	// OG image defaults. Starlight emits og:/twitter: tags + `twitter:card=
	// summary_large_image` from each page's frontmatter description, but no image —
	// so social cards render blank. Add a brand default image on every Starlight
	// route, with the Python course overriding it with its own card. Both are
	// 1200×630 (public/og/*.png, built by tasks/og/make-*-og.mjs). Done here so we
	// don't touch dozens of MDX files. (The standalone /resume page is not a
	// Starlight route and sets its own tags.)
	{
		// Both the Tier 1 Python course (/python/) and Tier 2 "Python for SDETs"
		// (/python-sdet/) share the Python OG card. A dedicated python-sdet card is
		// future polish; until then the python-course card beats the generic default.
		const isPython = pathname.includes('/python/') || isPythonSdet;
		const file = isPython ? '/og/python-course.png' : '/og/default.png';
		const img = new URL(file, context.site ?? context.url).href;
		// Tier 2 is EN-only, so its alt stays English even on /az/ fallback pages;
		// Tier 1 is bilingual and gets a locale-specific alt.
		let alt = 'Rufat Malikov — rufatmalikov.com';
		if (isPythonSdet) {
			alt = 'Python for SDETs — rufatmalikov.com';
		} else if (isPython) {
			alt = route.lang === 'az' ? 'Python Dərsləri — rufatmalikov.com' : 'Python course — rufatmalikov.com';
		}
		route.head.push(
			{ tag: 'meta', attrs: { property: 'og:image', content: img } },
			{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
			{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
			{ tag: 'meta', attrs: { name: 'twitter:image', content: img } },
			{ tag: 'meta', attrs: { name: 'twitter:image:alt', content: alt } }
		);
	}

	// Structured data (JSON-LD): Person + WebSite on the home pages, Person on
	// About, and a Course on the course/Python landing pages — the highest-ROI
	// schema for a personal site (knowledge panel + course rich results). Kept
	// here so it stays in one place and out of the MDX.
	{
		const path = pathname;
		const abs = (p: string) => new URL(p, context.site ?? context.url).href;
		const ld = (obj: object) =>
			route.head.push({ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify(obj) });
		const person = {
			'@type': 'Person',
			'@id': abs('/') + '#person',
			name: 'Rufat Malikov',
			url: abs('/'),
			jobTitle: 'QA Automation Engineer',
			sameAs: [
				'https://www.linkedin.com/in/rufat-malikov-295aab22',
				'https://github.com/TesterBaku',
				'https://www.youtube.com/@AIwithRufat',
			],
		};

		const isHome = path === '/' || path === '/en/' || path === '/az/';
		const isAbout = path.endsWith('/about/');
		const isCourseLanding =
			path === '/en/course/' ||
			path === '/az/course/' ||
			path === '/az/python/' ||
			path === '/en/python/' ||
			path === PYTHON_SDET.enLanding;

		if (isHome) {
			ld({
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'WebSite',
						'@id': abs('/') + '#website',
						url: abs('/'),
						name: 'Rufat Malikov',
						inLanguage: route.lang,
						publisher: { '@id': abs('/') + '#person' },
					},
					person,
				],
			});
		} else if (isAbout) {
			ld({ '@context': 'https://schema.org', ...person });
		}
		if (isCourseLanding) {
			ld({
				'@context': 'https://schema.org',
				'@type': 'Course',
				name: route.entry.data.title,
				description: route.entry.data.description ?? undefined,
				url: abs(path),
				inLanguage: route.lang,
				isAccessibleForFree: true,
				provider: { '@type': 'Person', name: 'Rufat Malikov', url: abs('/') },
			});
		}
	}

	// Starlight still builds /<non-en>/python-sdet/ fallback pages that render the EN
	// content. Mark those noindex so search engines don't index duplicate English
	// content under e.g. /az/ (the sitemap already omits them; noindex is the signal
	// that actually deindexes).
	if (route.lang !== 'en' && isPythonSdet) {
		route.head.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } });
	}

	// Per-locale sidebar pruning: hide the group whose content only exists in the
	// *other* locale, so each locale's nav stays free of empty groups / cross-locale
	// links. Exam Helper is AZ/RU-only (hidden in EN); "Python for SDETs" is EN-only
	// (hidden everywhere else). One mechanism, one label per locale.
	type Entry = (typeof route.sidebar)[number];
	const dropLabel = route.lang === 'en' ? 'Exam Helper' : PYTHON_SDET.groupLabel;
	const prune = (entries: Entry[]): Entry[] =>
		entries
			.filter((entry) => !(entry.type === 'group' && entry.label === dropLabel))
			.map((entry) => (entry.type === 'group' ? { ...entry, entries: prune(entry.entries) } : entry))
			.filter((entry) => !(entry.type === 'group' && entry.entries.length === 0));

	route.sidebar = prune(route.sidebar);
});
