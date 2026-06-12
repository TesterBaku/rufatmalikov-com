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
