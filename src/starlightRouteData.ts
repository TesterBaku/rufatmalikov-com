import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// Exam Helper is an Azerbaijani/Russian-only school exam-prep app. It stays in
// the AZ sidebar, but we drop it from the English navigation so the EN site
// reads as QA/testing-focused. The sidebar config is shared across locales, so
// per-locale filtering has to happen here at request time.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	if (route.lang !== 'en') return;
	route.sidebar = route.sidebar.filter(
		(entry) => !(entry.type === 'group' && entry.label === 'Exam Helper')
	);
});
