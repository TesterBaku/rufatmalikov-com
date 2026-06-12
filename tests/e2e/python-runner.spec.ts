import { test, expect } from '@playwright/test';

/**
 * M1 runtime-core + M2 mission e2e, exercised on the REAL course lesson pages
 * (the standalone /python-demo/ verification page was removed in M5). Each path
 * maps to a runnable example or mission that already lives in the AZ lessons:
 *
 *   happy path        → 00/proqramlasdirma-nedir  #ex-salam
 *   runtime error     → 04/indeks-ve-dilim         mission m04-l02-m3 (IndexError)
 *   timeout + recycle → 03/while-dovru             #ex-sonsuz (infinite loop)
 *   syntax error      → 00/ilk-proqramin           #ex-xeta (unterminated string)
 *   passing mission   → 00/proqramlasdirma-nedir   mission m00-l01-m1
 *   failing mission   → 00/proqramlasdirma-nedir   mission m00-l01-m2
 *
 * Pyodide is loaded from the jsDelivr CDN on first Run, so these tests need
 * network access and the first load takes several seconds — hence the generous
 * per-test timeouts. Labels in the output are Azerbaijani on these pages
 * ("sətir" = line), unlike the old EN-locale demo page.
 */

test.describe('Python runtime (M1)', () => {
	test('happy path: print() output reaches the panel', async ({ page }) => {
		test.setTimeout(60_000);
		await page.goto('/az/python/00-baslangic/proqramlasdirma-nedir/');

		const runner = page.locator('#ex-salam');
		await runner.locator('[data-run]').click();

		await expect(runner.locator('[data-output]')).toContainText('Salam! Mən Python-am', {
			timeout: 45_000,
		});
		await expect(runner.locator('[data-run]')).toBeEnabled();
	});

	test('error path: runtime error shows type + line and highlights the editor line', async ({
		page,
	}) => {
		test.setTimeout(60_000);
		// m04-l02-m3 starter is `print(oyunlar[10])` on line 2 → IndexError. The line
		// number comes from the traceback frame (not .lineno) — that's the path under test.
		await page.goto('/az/python/04-kolleksiyalar/indeks-ve-dilim/');

		const runner = page.locator('[data-mission][data-id="m04-l02-m3"]');
		await runner.locator('[data-run]').click();

		const output = runner.locator('[data-output]');
		await expect(output).toContainText('IndexError', { timeout: 45_000 });
		await expect(output).toContainText('2. sətir'); // AZ line label, traceback-frame line
		await expect(runner.locator('.py-error-line')).toBeVisible();
	});

	test('timeout path: infinite loop is killed and a second run still works (recycle)', async ({
		page,
	}) => {
		test.setTimeout(120_000);
		await page.goto('/az/python/03-tekrarla/while-dovru/');

		const runner = page.locator('#ex-sonsuz');
		const output = runner.locator('[data-output]');
		const run = runner.locator('[data-run]');

		// First run: the loop never increments i, so it is auto-stopped at the 5s limit.
		await run.click();
		await expect(output).toContainText('dayandırıldı', { timeout: 45_000 });
		await expect(run).toBeEnabled();

		// Second run: the worker was terminated, so this recreates it. Reaching the
		// stop message again proves the recycle path works.
		await run.click();
		await expect(output).toContainText('dayandırıldı', { timeout: 45_000 });
		await expect(run).toBeEnabled();
	});

	test('syntax error: line comes from .lineno when there is no traceback frame', async ({
		page,
	}) => {
		test.setTimeout(60_000);
		// #ex-xeta is `print("Salam, dostum!` — an unterminated string → SyntaxError
		// on line 1, with no <proqram> traceback frame, so the line is the .lineno fallback.
		await page.goto('/az/python/00-baslangic/ilk-proqramin/');

		const runner = page.locator('#ex-xeta');
		await runner.locator('[data-run]').click();

		const output = runner.locator('[data-output]');
		await expect(output).toContainText('SyntaxError', { timeout: 45_000 });
		await expect(output).toContainText('1. sətir'); // .lineno fallback
		await expect(runner.locator('.py-error-line')).toBeVisible();
	});
});

test.describe('Python missions (M2)', () => {
	const mission = (page: import('@playwright/test').Page, id: string) =>
		page.locator(`[data-mission][data-id="${id}"]`);

	test('passing mission: completes, awards XP, and survives reload', async ({ page }) => {
		test.setTimeout(90_000);
		// m00-l01-m1's starter already prints "Salam, Dünya!", which passes its check
		// on Run with no editing.
		await page.goto('/az/python/00-baslangic/proqramlasdirma-nedir/');

		const mod = page.locator('[data-modprog][data-module="00"]').first();
		await expect(mod.locator('[data-count]')).toHaveText('0 / 5');
		await expect(mod.locator('[data-badge]')).toBeHidden();

		const m = mission(page, 'm00-l01-m1');
		await m.locator('[data-run]').click();

		// Mission marked complete + XP feedback.
		await expect(m.locator('[data-state]')).toBeVisible({ timeout: 45_000 });
		await expect(m.locator('[data-feedback]')).toContainText('XP');

		// Module progress updates live.
		await expect(mod.locator('[data-count]')).toHaveText('1 / 5');
		await expect(mod.locator('[data-xp]')).toContainText('5');

		// localStorage survives a reload — no re-running needed.
		await page.reload();
		await expect(mission(page, 'm00-l01-m1').locator('[data-state]')).toBeVisible();
		await expect(
			page.locator('[data-modprog][data-module="00"]').first().locator('[data-count]')
		).toHaveText('1 / 5');
	});

	test('failing mission: shows the AZ hint and does not complete', async ({ page }) => {
		test.setTimeout(60_000);
		// m00-l01-m2's starter prints the default sentence verbatim; its check asserts
		// the text was changed, so an unedited Run fails the check and shows the hint.
		await page.goto('/az/python/00-baslangic/proqramlasdirma-nedir/');

		const m = mission(page, 'm00-l01-m2');
		await m.locator('[data-run]').click();

		await expect(m.locator('[data-feedback]')).toContainText('💡', { timeout: 45_000 });
		await expect(m.locator('[data-feedback]')).toContainText('dəyiş');
		await expect(m.locator('[data-state]')).toBeHidden();
	});
});
