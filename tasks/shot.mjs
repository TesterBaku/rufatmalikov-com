import { chromium } from 'playwright';

const base = 'http://localhost:4327';
const outDir = process.argv[2] || 'tasks/shots';
import { mkdirSync } from 'node:fs';
mkdirSync(outDir, { recursive: true });

const shots = [
	{ url: '/en/', theme: 'light', file: 'home-light.png' },
	{ url: '/en/', theme: 'dark', file: 'home-dark.png' },
	{ url: '/en/about/', theme: 'light', file: 'about-light.png' },
	{ url: '/en/projects/', theme: 'light', file: 'projects-light.png' },
	{ url: '/resume/', theme: 'light', file: 'resume-light.png' },
];

const browser = await chromium.launch({ channel: 'chrome' });
for (const s of shots) {
	const ctx = await browser.newContext({
		viewport: { width: 1280, height: 900 },
		deviceScaleFactor: 2,
	});
	await ctx.addInitScript((theme) => {
		localStorage.setItem('starlight-theme', theme);
	}, s.theme);
	const page = await ctx.newPage();
	await page.goto(base + s.url, { waitUntil: 'networkidle' });
	await page.waitForTimeout(600); // let fonts settle
	await page.screenshot({ path: `${outDir}/${s.file}`, fullPage: true });
	console.log('shot', s.file);
	await ctx.close();
}
await browser.close();
console.log('done');
