import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// The sidebar config is shared across locales, so per-locale adjustments happen
// here at request time.
//
//  - Exam Helper is an Azerbaijani/Russian-only school exam-prep app; drop it
//    from the English navigation so the EN site reads as QA/testing-focused.
//  - The Python course is Azerbaijani-first (EN has only a stub). Its explicit
//    per-module groups autogenerate nothing in EN, and the glossary has no EN
//    page, so we prune empty groups and the AZ-only glossary link to keep the EN
//    sidebar free of empty groups and dead links.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;

	// OG image defaults. Starlight emits og:/twitter: tags + `twitter:card=
	// summary_large_image` from each page's frontmatter description, but no image —
	// so social cards render blank. Add a brand default image on every Starlight
	// route, with the Python course overriding it with its own card. Both are
	// 1200×630 (public/og/*.png, built by tasks/og/make-*-og.mjs). Done here so we
	// don't touch dozens of MDX files. (The standalone /resume page is not a
	// Starlight route and sets its own tags.)
	{
		const isPython = context.url.pathname.includes('/python/');
		const file = isPython ? '/og/python-course.png' : '/og/default.png';
		const img = new URL(file, context.site ?? context.url).href;
		const alt = isPython
			? route.lang === 'az'
				? 'Python Dərsləri — rufatmalikov.com'
				: 'Python course — rufatmalikov.com'
			: 'Rufat Malikov — rufatmalikov.com';
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
		const path = context.url.pathname;
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
			path === '/en/course/' || path === '/az/course/' || path === '/az/python/' || path === '/en/python/';

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

	if (route.lang !== 'en') return;

	type Entry = (typeof route.sidebar)[number];
	const prune = (entries: Entry[]): Entry[] =>
		entries
			.filter((entry) => !(entry.type === 'group' && entry.label === 'Exam Helper'))
			.filter((entry) => !(entry.type === 'link' && entry.href.endsWith('/python/glossary/')))
			.map((entry) => (entry.type === 'group' ? { ...entry, entries: prune(entry.entries) } : entry))
			.filter((entry) => !(entry.type === 'group' && entry.entries.length === 0));

	route.sidebar = prune(route.sidebar);
});
