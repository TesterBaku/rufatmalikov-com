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

	// OG defaults for the Python course. Starlight emits og:/twitter: tags and a
	// `twitter:card=summary_large_image` from each page's frontmatter `description`,
	// but no image — so social cards render blank. Add a shared course OG image on
	// every /python/ route (asset: public/og/python-course.png, built by
	// tasks/og/make-python-og.mjs). Scoped here so we don't touch 25 MDX files.
	if (context.url.pathname.includes('/python/')) {
		const img = new URL('/og/python-course.png', context.site ?? context.url).href;
		route.head.push(
			{ tag: 'meta', attrs: { property: 'og:image', content: img } },
			{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
			{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
			{ tag: 'meta', attrs: { name: 'twitter:image', content: img } },
			{ tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Python Dərsləri — rufatmalikov.com' } }
		);
	}

	if (route.lang !== 'en') return;

	type Entry = (typeof route.sidebar)[number];
	const prune = (entries: Entry[]): Entry[] =>
		entries
			.filter((entry) => !(entry.type === 'group' && entry.label === 'Exam Helper'))
			.filter((entry) => !(entry.type === 'link' && entry.href.endsWith('/python/sozluk/')))
			.map((entry) => (entry.type === 'group' ? { ...entry, entries: prune(entry.entries) } : entry))
			.filter((entry) => !(entry.type === 'group' && entry.entries.length === 0));

	route.sidebar = prune(route.sidebar);
});
