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
	await expect(page.locator('h1')).toContainText('Rəqəmlər və hesab');
});
