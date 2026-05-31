import { test, expect } from '@playwright/test';

const pagesThatLoad = [
	{ path: '/en/', name: 'home (en)' },
	{ path: '/az/', name: 'home (az)' },
	{ path: '/en/about/', name: 'about (en)' },
	{ path: '/az/about/', name: 'about (az)' },
	{ path: '/en/projects/', name: 'projects (en)' },
	{ path: '/az/projects/', name: 'projects (az)' },
	{ path: '/en/playwright/', name: 'playwright (en)' },
	{ path: '/en/course/', name: 'course overview (en)' },
	{ path: '/az/course/', name: 'course overview (az)' },
	{ path: '/en/course/module-0/', name: 'course module 0 (en)' },
	{ path: '/az/course/module-0/', name: 'course module 0 (az)' },
	{ path: '/resume/', name: 'resume' },
];

for (const p of pagesThatLoad) {
	test(`${p.name} loads with content`, async ({ page }) => {
		const resp = await page.goto(p.path);
		expect(resp?.status(), `HTTP status for ${p.path}`).toBeLessThan(400);
		await expect(page.locator('h1').first()).toBeVisible();
	});
}

test('apex redirects to a locale home', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/(en|az)\//);
});

test('home hero CTA links to the course overview', async ({ page }) => {
	await page.goto('/en/');
	const cta = page.getByRole('link', { name: /start the playwright course/i });
	await expect(cta).toHaveAttribute('href', '/en/course/');
});

test('projects page lists all entries in importance order', async ({ page }) => {
	await page.goto('/en/projects/');
	const headings = await page.locator('.sl-markdown-content h2').allInnerTexts();
	const expectedOrder = [
		'BrauzerLab',
		'Exam Helper',
		'Universal Appliances Repair',
		'SDET Interview Trainer',
		'Study Quiz',
		'Grade 5 Math',
		'Quiz Formatter',
		'RMC Tow',
	];
	expect(headings).toHaveLength(expectedOrder.length);
	expectedOrder.forEach((name, i) => {
		expect(headings[i]).toContain(name);
	});
});

test('no "launching soon" copy remains (en + az projects)', async ({ page }) => {
	await page.goto('/en/projects/');
	await expect(page.getByText(/launching soon/i)).toHaveCount(0);
	await page.goto('/az/projects/');
	await expect(page.getByText(/tezliklə işə düşür/i)).toHaveCount(0);
});

test('blog is hidden from navigation', async ({ page }) => {
	await page.goto('/en/about/');
	await expect(page.locator('a[href$="/blog/"]')).toHaveCount(0);
});
