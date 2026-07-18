// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { PYTHON_SDET, PYTHON_SDET_MODULES, sdetLink, isAzReady } from './src/courses.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://rufatmalikov.com',
	vite: {
		server: {
			allowedHosts: ['host.docker.internal'],
		},
	},
	redirects: {
		// Root redirects to the default locale's homepage.
		// Browsers that send Accept-Language could be auto-routed in middleware later if desired.
		'/': '/en/',
		// Python course slugs were anglicized (AZ → English dir/file names) for the
		// English-audience SEO. Redirect the old live AZ URLs to the new ones.
		'/az/python/00-baslangic/proqramlasdirma-nedir/': '/az/python/00-foundations/what-is-programming/',
		'/az/python/00-baslangic/ilk-proqramin/': '/az/python/00-foundations/your-first-program/',
		'/az/python/01-python-ile-danis/print-ve-metnler/': '/az/python/01-talk-to-python/print-and-text/',
		'/az/python/01-python-ile-danis/deyisenler/': '/az/python/01-talk-to-python/variables/',
		'/az/python/01-python-ile-danis/reqemler-ve-hesab/': '/az/python/01-talk-to-python/numbers-and-math/',
		'/az/python/01-python-ile-danis/input/': '/az/python/01-talk-to-python/input/',
		'/az/python/02-qerar-ver/if-egar/': '/az/python/02-make-decisions/if-statements/',
		'/az/python/02-qerar-ver/muqayise-ve-elif/': '/az/python/02-make-decisions/comparisons-and-elif/',
		'/az/python/02-qerar-ver/ve-veya-deyil/': '/az/python/02-make-decisions/and-or-not/',
		'/az/python/03-tekrarla/for-dovru/': '/az/python/03-repeat/for-loops/',
		'/az/python/03-tekrarla/while-dovru/': '/az/python/03-repeat/while-loops/',
		'/az/python/03-tekrarla/dovrle-hesabla/': '/az/python/03-repeat/counting-with-loops/',
		'/az/python/04-kolleksiyalar/siyahilar/': '/az/python/04-collections/lists/',
		'/az/python/04-kolleksiyalar/siyahi-metodlari/': '/az/python/04-collections/list-methods/',
		'/az/python/04-kolleksiyalar/indeks-ve-dilim/': '/az/python/04-collections/index-and-slice/',
		'/az/python/04-kolleksiyalar/lugetler/': '/az/python/04-collections/dictionaries/',
		'/az/python/05-funksiyalar/ilk-funksiyan/': '/az/python/05-functions/your-first-function/',
		'/az/python/05-funksiyalar/parametrler/': '/az/python/05-functions/parameters/',
		'/az/python/05-funksiyalar/return/': '/az/python/05-functions/return/',
		'/az/python/06-layihe-missiyalari/kalkulyator/': '/az/python/06-projects/calculator/',
		'/az/python/06-layihe-missiyalari/eded-tap-oyunu/': '/az/python/06-projects/number-guessing-game/',
		'/az/python/06-layihe-missiyalari/sezar-sifresi/': '/az/python/06-projects/caesar-cipher/',
		'/az/python/06-layihe-missiyalari/viktorina/': '/az/python/06-projects/quiz/',
		'/az/python/sozluk/': '/az/python/glossary/',
		// Stale /en/ URLs with the old AZ slugs: before anglicization the language
		// toggle swapped only the /az/↔/en/ prefix, so /az/python/<az-slug>/ linked to
		// /en/python/<az-slug>/ — pages that never existed (EN always used English
		// slugs). Google crawled those links and still holds them as 404s. Mirror the
		// AZ redirects on /en/ so those historical URLs 301 to the real English pages.
		'/en/python/00-baslangic/proqramlasdirma-nedir/': '/en/python/00-foundations/what-is-programming/',
		'/en/python/00-baslangic/ilk-proqramin/': '/en/python/00-foundations/your-first-program/',
		'/en/python/01-python-ile-danis/print-ve-metnler/': '/en/python/01-talk-to-python/print-and-text/',
		'/en/python/01-python-ile-danis/deyisenler/': '/en/python/01-talk-to-python/variables/',
		'/en/python/01-python-ile-danis/reqemler-ve-hesab/': '/en/python/01-talk-to-python/numbers-and-math/',
		'/en/python/01-python-ile-danis/input/': '/en/python/01-talk-to-python/input/',
		'/en/python/02-qerar-ver/if-egar/': '/en/python/02-make-decisions/if-statements/',
		'/en/python/02-qerar-ver/muqayise-ve-elif/': '/en/python/02-make-decisions/comparisons-and-elif/',
		'/en/python/02-qerar-ver/ve-veya-deyil/': '/en/python/02-make-decisions/and-or-not/',
		'/en/python/03-tekrarla/for-dovru/': '/en/python/03-repeat/for-loops/',
		'/en/python/03-tekrarla/while-dovru/': '/en/python/03-repeat/while-loops/',
		'/en/python/03-tekrarla/dovrle-hesabla/': '/en/python/03-repeat/counting-with-loops/',
		'/en/python/04-kolleksiyalar/siyahilar/': '/en/python/04-collections/lists/',
		'/en/python/04-kolleksiyalar/siyahi-metodlari/': '/en/python/04-collections/list-methods/',
		'/en/python/04-kolleksiyalar/indeks-ve-dilim/': '/en/python/04-collections/index-and-slice/',
		'/en/python/04-kolleksiyalar/lugetler/': '/en/python/04-collections/dictionaries/',
		'/en/python/05-funksiyalar/ilk-funksiyan/': '/en/python/05-functions/your-first-function/',
		'/en/python/05-funksiyalar/parametrler/': '/en/python/05-functions/parameters/',
		'/en/python/05-funksiyalar/return/': '/en/python/05-functions/return/',
		'/en/python/06-layihe-missiyalari/kalkulyator/': '/en/python/06-projects/calculator/',
		'/en/python/06-layihe-missiyalari/eded-tap-oyunu/': '/en/python/06-projects/number-guessing-game/',
		'/en/python/06-layihe-missiyalari/sezar-sifresi/': '/en/python/06-projects/caesar-cipher/',
		'/en/python/06-layihe-missiyalari/viktorina/': '/en/python/06-projects/quiz/',
		'/en/python/sozluk/': '/en/python/glossary/',
	},
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
	],
});
