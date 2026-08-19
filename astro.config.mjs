// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { PYTHON_SDET, PYTHON_SDET_MODULES, sdetLink, isAzReady } from './src/courses.mjs';
import { REDIRECTS } from './src/redirects.mjs';
import { cloudflareRedirects } from './src/integrations/cloudflare-redirects.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://rufatmalikov.com',
	vite: {
		server: {
			allowedHosts: ['host.docker.internal'],
		},
	},
	// Full map lives in src/redirects.mjs so the dev server and the generated
	// dist/_redirects (real 301s for Cloudflare) can never drift apart.
	redirects: REDIRECTS,
	integrations: [
		starlight({
			routeMiddleware: './src/starlightRouteData.ts',
			// Replace the default language <select> with a compact EN | AZ toggle
			// (two locales → a segmented toggle is clearer than a dropdown).
			components: {
				LanguageSelect: './src/components/LanguageToggle.astro',
			},
			title: {
				en: 'Rufat Malikov',
				az: 'Rüfət Məlikov',
			},
			description: 'Free, hands-on QA and coding courses in English and Azerbaijani — Playwright, Python, and test automation — plus free QA tools and study apps.',
			// Fonts are self-hosted via @fontsource-variable (bundled below), so there
			// is no render-blocking cross-origin Google Fonts request. fontsource CSS
			// comes first so the @font-face rules are defined before brand.css uses them.
			customCss: [
				'@fontsource-variable/fraunces/index.css',
				'@fontsource-variable/inter/index.css',
				'./src/styles/brand.css',
			],
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				az: { label: 'Azərbaycan dili', lang: 'az' },
			},
			social: [
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@AIwithRufat' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rufat-malikov-295aab22' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/TesterBaku' },
			],
			sidebar: [
				{ label: 'Choose a course', translations: { az: 'Kurs seç' }, link: '/courses/' },
				{
					// Explicit module links (not autogenerate) so the 14 flat module files
					// can be grouped into collapsible difficulty phases. Phases start
					// collapsed; Starlight auto-expands the one holding the active page.
					label: 'Playwright Course',
					translations: { az: 'Playwright Kursu' },
					// Collapse the whole course tree by default; Starlight auto-expands
					// it when the active page is inside, so non-active courses stay tidy.
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { az: 'İcmal' }, link: '/course/' },
						{ label: '0 — Roadmap & setup', translations: { az: '0 — Kurs xəritəsi və quraşdırma' }, link: '/course/module-0/' },
						{
							label: 'Fundamentals',
							translations: { az: 'Əsaslar' },
							collapsed: true,
							items: [
								{ label: '1 — JS/TS for QA', translations: { az: '1 — QA üçün JS/TS' }, link: '/course/module-1/' },
								{ label: '2 — Mastering locators', translations: { az: '2 — Lokatorlar ustası' }, link: '/course/module-2/' },
								{ label: '3 — Actions & interactions', translations: { az: '3 — Əməliyyatlar və interaksiya' }, link: '/course/module-3/' },
								{ label: '4 — Assertions', translations: { az: '4 — İddialar' }, link: '/course/module-4/' },
							],
						},
						{
							label: 'Intermediate',
							translations: { az: 'Orta səviyyə' },
							collapsed: true,
							items: [
								{ label: '5 — Auto-waiting & flaky tests', translations: { az: '5 — Avtomatik gözləmə və flaky testlər' }, link: '/course/module-5/' },
								{ label: '6 — Test runner & config', translations: { az: '6 — Test icraçısı və konfiqurasiya' }, link: '/course/module-6/' },
								{ label: '7 — Page Object Model', translations: { az: '7 — Səhifə Obyekt Modeli (POM)' }, link: '/course/module-7/' },
								{ label: '8 — Fixtures & test data', translations: { az: '8 — Fixtures və test məlumatları' }, link: '/course/module-8/' },
								{ label: '9 — API testing & networking', translations: { az: '9 — API testi və şəbəkə' }, link: '/course/module-9/' },
							],
						},
						{
							label: 'Advanced',
							translations: { az: 'Qabaqcıl' },
							collapsed: true,
							items: [
								{ label: '10 — Auth & storage state', translations: { az: '10 — Auth və saxlama vəziyyəti' }, link: '/course/module-10/' },
								{ label: '11 — Visual / Mobile / A11y', translations: { az: '11 — Vizual / Mobil / Əlçatımlılıq' }, link: '/course/module-11/' },
								{ label: '12 — CI, Docker, reports', translations: { az: '12 — CI, Docker, hesabatlar' }, link: '/course/module-12/' },
								{ label: '13 — Final project review', translations: { az: '13 — Yekun layihə icmalı' }, link: '/course/module-13/' },
								{ label: '14 — Database verification', translations: { az: '14 — Verilənlər bazasının yoxlanması' }, link: '/course/module-14/' },
							],
						},
					],
				},
				{
					// Explicit per-module groups so the module headings can be localized
					// in Azerbaijani (Starlight cannot localize autogenerated folder labels).
					// In EN these groups autogenerate nothing (lessons are AZ-only) and would
					// otherwise render empty; the route middleware (src/starlightRouteData.ts)
					// prunes empty groups + the AZ-only glossary link so the EN sidebar shows
					// only the Overview stub.
					label: 'Python Course',
					translations: { az: 'Python Kursu' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { az: 'Giriş' }, link: '/python/' },
						{
							label: '00 — Start here',
							translations: { az: '00 — Başlanğıc' },
							items: [{ autogenerate: { directory: 'python/00-foundations' } }],
						},
						{
							label: '01 — Talk to Python',
							translations: { az: '01 — Python ilə danış' },
							items: [{ autogenerate: { directory: 'python/01-talk-to-python' } }],
						},
						{
							label: '02 — Make decisions',
							translations: { az: '02 — Qərar ver' },
							items: [{ autogenerate: { directory: 'python/02-make-decisions' } }],
						},
						{
							label: '03 — Repeat',
							translations: { az: '03 — Təkrarla' },
							items: [{ autogenerate: { directory: 'python/03-repeat' } }],
						},
						{
							label: '04 — Collections',
							translations: { az: '04 — Kolleksiyalar' },
							items: [{ autogenerate: { directory: 'python/04-collections' } }],
						},
						{
							label: '05 — Functions',
							translations: { az: '05 — Funksiyalar' },
							items: [{ autogenerate: { directory: 'python/05-functions' } }],
						},
						{
							label: '06 — Projects',
							translations: { az: '06 — Layihə missiyaları' },
							items: [{ autogenerate: { directory: 'python/06-projects' } }],
						},
						{ label: 'Glossary', translations: { az: 'Sözlük' }, link: '/python/glossary/' },
					],
				},
				{
					// Tier 2 "Python for SDETs" — the sidebar (EN + AZ labels) is GENERATED
					// from PYTHON_SDET_MODULES (src/courses.mjs), the single source that also
					// derives which pages are AZ-translated. The group label comes from the
					// shared PYTHON_SDET constant so the middleware's label-based prune can't
					// drift; the middleware (src/starlightRouteData.ts) filters this group to
					// AZ-ready modules on non-EN routes and noindexes untranslated fallbacks.
					label: PYTHON_SDET.groupLabel,
					collapsed: true,
					// Generated from the single PYTHON_SDET_MODULES list (src/courses.mjs)
					// so an AZ label and the page's AZ-ready status can't drift apart.
					items: PYTHON_SDET_MODULES.map((m) => ({
						label: m.label,
						...(m.az ? { translations: { az: m.az } } : {}),
						link: sdetLink(m.slug),
					})),
				},
				{
					label: 'Reference',
					translations: { az: 'İstinad' },
					collapsed: true,
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'BrauzerLab — practice',
					translations: { az: 'BrauzerLab — məşq' },
					collapsed: true,
					items: [{ autogenerate: { directory: 'playwright' } }],
				},
				{
					label: 'Exam Helper',
					translations: { az: 'İmtahan Köməkçisi' },
					collapsed: true,
					items: [{ autogenerate: { directory: 'exam-helper' } }],
				},
				{
					label: 'Projects',
					collapsed: true,
					items: [{ autogenerate: { directory: 'projects' } }],
				},
				{ label: 'About', link: '/about/', translations: { az: 'Haqqında' } },
			],
			// Edit-this-page links — wire up once the repo is on GitHub.
			// editLink: { baseUrl: 'https://github.com/<user>/<repo>/edit/main/' },
		}),
		sitemap({
			// /python-demo/ is an internal M1 verification page — keep it out of the sitemap.
			// /<non-en>/python-sdet/ are Starlight locale-fallback pages that render EN content
			// under another locale — keep only the canonical /en/ ones, PLUS any /az/ page that
			// has a real translation (PYTHON_SDET.azReady). Locale-agnostic so a future /ru/ etc.
			// stays excluded automatically until translated (those fallbacks are noindexed too).
			filter: (page) =>
				!page.includes('/python-demo') &&
				(!(page.includes(PYTHON_SDET.segment) && !page.includes(PYTHON_SDET.enLanding)) ||
					isAzReady(page)),
		}),
		cloudflareRedirects(REDIRECTS),
	],
});
