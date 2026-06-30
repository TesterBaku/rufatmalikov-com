import { test, expect } from '@playwright/test';

/**
 * M3 — Python course section: pages load, the AZ sidebar lists lessons, the EN
 * stub points back to AZ, and the relative inter-lesson links resolve.
 */

const pythonPages = [
	'/az/python/',
	'/az/python/00-foundations/what-is-programming/',
	'/az/python/00-foundations/your-first-program/',
	'/az/python/01-talk-to-python/print-and-text/',
	'/az/python/01-talk-to-python/numbers-and-math/',
	'/az/python/01-talk-to-python/variables/',
	'/az/python/01-talk-to-python/input/',
	'/az/python/glossary/',
	'/en/python/',
];

for (const path of pythonPages) {
	test(`loads: ${path}`, async ({ page }) => {
		const resp = await page.goto(path);
		expect(resp?.status(), `HTTP status for ${path}`).toBeLessThan(400);
		await expect(page.locator('h1').first()).toBeVisible();
	});
}

test('AZ index sidebar lists every lesson', async ({ page }) => {
	await page.goto('/az/python/');
	const nav = page.locator('nav');
	for (const slug of [
		'00-foundations/what-is-programming',
		'00-foundations/your-first-program',
		'01-talk-to-python/print-and-text',
		'01-talk-to-python/numbers-and-math',
		'01-talk-to-python/variables',
		'01-talk-to-python/input',
		'glossary',
	]) {
		await expect(nav.locator(`a[href="/az/python/${slug}/"]`).first()).toBeVisible();
	}
});

test('EN stub links back to the AZ course', async ({ page }) => {
	await page.goto('/en/python/');
	await expect(page.locator('a[href="/az/python/"]').first()).toBeVisible();
});

test('relative inter-lesson links resolve (index → first lesson → next lesson)', async ({
	page,
}) => {
	await page.goto('/az/python/');
	await page.getByRole('link', { name: /İlk dərsdən başla/ }).click();
	await expect(page).toHaveURL(/\/az\/python\/00-foundations\/what-is-programming\/$/);

	// "Davam et →" chain inside module 01.
	await page.goto('/az/python/01-talk-to-python/print-and-text/');
	await page.getByRole('link', { name: /Davam et/ }).click();
	await expect(page).toHaveURL(/\/az\/python\/01-talk-to-python\/numbers-and-math\/$/);
	await expect(page.locator('h1')).toContainText('Ədədlər və hesab');
});

test('ModuleProgress on a real lesson updates after a passing mission', async ({ page }) => {
	test.setTimeout(90_000);
	// Module 00 lesson 1; its first mission's starter already prints "Salam, Dünya!",
	// which passes the check on Run with no editing.
	await page.goto('/az/python/00-foundations/what-is-programming/');

	const mod = page.locator('[data-modprog][data-module="00"]').first();
	await expect(mod.locator('[data-count]')).toHaveText('0 / 5');

	const mission = page.locator('[data-mission][data-id="m00-l01-m1"]');
	await mission.locator('[data-run]').click();

	await expect(mission.locator('[data-state]')).toBeVisible({ timeout: 45_000 });
	await expect(mod.locator('[data-count]')).toHaveText('1 / 5');
	await expect(mod.locator('[data-xp]')).toContainText('5');
});

test('Module 06 capstone m06-p1: typed if/elif solution passes and awards XP', async ({
	page,
	context,
}) => {
	test.setTimeout(90_000);
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/az/python/06-projects/calculator/');

	const mission = page.locator('[data-mission][data-id="m06-p1"]');
	// The if/elif calculator solution. Pre-filled inputs are 8, 2, * → "8 * 2 = 16".
	const solution = [
		'eded1 = int(input("a: "))',
		'eded2 = int(input("b: "))',
		'emel = input("op: ")',
		'if emel == "+":',
		'    print(f"{eded1} + {eded2} = {eded1 + eded2}")',
		'elif emel == "-":',
		'    print(f"{eded1} - {eded2} = {eded1 - eded2}")',
		'elif emel == "*":',
		'    print(f"{eded1} * {eded2} = {eded1 * eded2}")',
		'else:',
		'    print(f"{eded1} / {eded2} = {eded1 / eded2}")',
	].join('\n');

	// Replace the editor contents via clipboard paste — CodeMirror inserts pasted
	// text verbatim, which preserves the Python indentation (typing would trigger
	// auto-indent).
	const editor = mission.locator('.cm-content');
	await editor.click();
	await page.keyboard.press('ControlOrMeta+A');
	await page.evaluate((text) => navigator.clipboard.writeText(text), solution);
	await page.keyboard.press('ControlOrMeta+V');
	await expect(editor).toContainText('elif emel =='); // paste landed

	await mission.locator('[data-run]').click();

	await expect(mission.locator('[data-state]')).toBeVisible({ timeout: 45_000 });
	await expect(mission.locator('[data-feedback]')).toContainText('25'); // +25 XP awarded
});
