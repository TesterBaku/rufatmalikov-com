// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://rufatmalikov.com',
	redirects: {
		// Root redirects to the default locale's homepage.
		// Browsers that send Accept-Language could be auto-routed in middleware later if desired.
		'/': '/en/',
	},
	integrations: [
		starlight({
			title: {
				en: 'Rufat Malikov',
				az: 'Rüfət Məlikov',
			},
			description: 'QA automation enthusiast and educator. Playwright training, engineering writing, and side projects.',
			customCss: ['./src/styles/brand.css'],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..600&family=Inter:wght@400;500;600;700&display=swap',
					},
				},
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
				{
					label: 'Course',
					translations: { az: 'Kurs' },
					items: [{ autogenerate: { directory: 'course' } }],
				},
				{
					label: 'BrauzerLab',
					items: [{ autogenerate: { directory: 'playwright' } }],
				},
				{
					label: 'Exam Helper',
					translations: { az: 'İmtahan Köməkçisi' },
					items: [{ autogenerate: { directory: 'exam-helper' } }],
				},
				{
					label: 'Projects',
					items: [{ autogenerate: { directory: 'projects' } }],
				},
				{ label: 'About', link: '/about/', translations: { az: 'Haqqında' } },
			],
			// Edit-this-page links — wire up once the repo is on GitHub.
			// editLink: { baseUrl: 'https://github.com/<user>/<repo>/edit/main/' },
		}),
	],
});
