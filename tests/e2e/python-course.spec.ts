import { test, expect } from '@playwright/test';

/**
 * M3 — Python course section: pages load, the AZ sidebar lists lessons, the EN
 * stub points back to AZ, and the relative inter-lesson links resolve.
 */

const pythonPages = [
	'/az/python/',
	'/az/python/00-baslangic/proqramlasdirma-nedir/',
	'/az/python/00-baslangic/ilk-proqramin/',
	'/az/python/01-python-ile-danis/print-ve-metnler/',
	'/az/python/01-python-ile-danis/reqemler-ve-hesab/',
	'/az/python/01-python-ile-danis/deyisenler/',
	'/az/python/01-python-ile-danis/input/',
	'/az/python/sozluk/',
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
		'00-baslangic/proqramlasdirma-nedir',
		'00-baslangic/ilk-proqramin',
		'01-python-ile-danis/print-ve-metnler',
		'01-python-ile-danis/reqemler-ve-hesab',
		'01-python-ile-danis/deyisenler',
		'01-python-ile-danis/input',
		'sozluk',
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
	await expect(page).toHaveURL(/\/az\/python\/00-baslangic\/proqramlasdirma-nedir\/$/);

	// "Davam et →" chain inside module 01.
	await page.goto('/az/python/01-python-ile-danis/print-ve-metnler/');
	await page.getByRole('link', { name: /Davam et/ }).click();
	await expect(page).toHaveURL(/\/az\/python\/01-python-ile-danis\/reqemler-ve-hesab\/$/);
	await expect(page.locator('h1')).toContainText('Ədədlər və hesab');
});

test('ModuleProgress on a real lesson updates after a passing mission', async ({ page }) => {
	test.setTimeout(90_000);
	// Module 00 lesson 1; its first mission's starter already prints "Salam, Dünya!",
	// which passes the check on Run with no editing.
	await page.goto('/az/python/00-baslangic/proqramlasdirma-nedir/');

	const mod = page.locator('[data-modprog][data-module="00"]').first();
	await expect(mod.locator('[data-count]')).toHaveText('0 / 5');

	const mission = page.locator('[data-mission][data-id="m00-l01-m1"]');
	await mission.locator('[data-run]').click();

	await expect(mission.locator('[data-state]')).toBeVisible({ timeout: 45_000 });
	await expect(mod.locator('[data-count]')).toHaveText('1 / 5');
	await expect(mod.locator('[data-xp]')).toContainText('5');
});
