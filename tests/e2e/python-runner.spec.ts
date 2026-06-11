import { test, expect } from '@playwright/test';

/**
 * M1 runtime-core e2e. Exercises the /python-demo/ verification page.
 * Pyodide is loaded from the jsDelivr CDN on first Run, so these tests need
 * network access and the first load takes several seconds — hence the generous
 * per-test timeouts.
 */

test.describe('Python runtime (M1)', () => {
	test('happy path: print() output reaches the panel', async ({ page }) => {
		test.setTimeout(60_000);
		await page.goto('/python-demo/');

		const runner = page.locator('#demo-hello');
		await runner.locator('[data-run]').click();

		await expect(runner.locator('[data-output]')).toContainText('Salam, Dünya!', {
			timeout: 45_000,
		});
		await expect(runner.locator('[data-run]')).toBeEnabled();
	});

	test('error path: shows error type + line and highlights the editor line', async ({ page }) => {
		test.setTimeout(60_000);
		await page.goto('/python-demo/');

		const runner = page.locator('#demo-error');
		await runner.locator('[data-run]').click();

		const output = runner.locator('[data-output]');
		await expect(output).toContainText('NameError', { timeout: 45_000 });
		await expect(output).toContainText('3. line'); // EN labels on the standalone demo page
		await expect(runner.locator('.py-error-line')).toBeVisible();
	});

	test('timeout path: infinite loop is killed and a second run still works (recycle)', async ({
		page,
	}) => {
		test.setTimeout(120_000);
		await page.goto('/python-demo/');

		const runner = page.locator('#demo-loop');
		const output = runner.locator('[data-output]');
		const run = runner.locator('[data-run]');

		// First run: while True is auto-stopped at the 5s limit.
		await run.click();
		await expect(output).toContainText('stopped', { timeout: 45_000 });
		await expect(run).toBeEnabled();

		// Second run: the worker was terminated, so this recreates it. Reaching
		// the stop message again proves the recycle path works.
		await run.click();
		await expect(output).toContainText('stopped', { timeout: 45_000 });
		await expect(run).toBeEnabled();
	});

	test('syntax error: line comes from .lineno when there is no traceback frame', async ({
		page,
	}) => {
		test.setTimeout(60_000);
		await page.goto('/python-demo/');

		const runner = page.locator('#demo-syntax');
		await runner.locator('[data-run]').click();

		const output = runner.locator('[data-output]');
		await expect(output).toContainText('SyntaxError', { timeout: 45_000 });
		await expect(output).toContainText('2. line'); // .lineno fallback (no <proqram> frame)
		await expect(runner.locator('.py-error-line')).toBeVisible();
	});
});

test.describe('Python missions (M2)', () => {
	const mission = (page: import('@playwright/test').Page, id: string) =>
		page.locator(`[data-mission][data-id="${id}"]`);

	test('passing mission: completes, awards XP/badge, and survives reload', async ({ page }) => {
		test.setTimeout(90_000);
		await page.goto('/python-demo/');

		const mod = page.locator('[data-modprog][data-module="demo"]');
		await expect(mod.locator('[data-count]')).toHaveText('0 / 1');
		await expect(mod.locator('[data-badge]')).toBeHidden();

		const m = mission(page, 'demo-m-pass');
		await m.locator('[data-run]').click();

		// Mission marked complete + XP feedback.
		await expect(m.locator('[data-state]')).toBeVisible({ timeout: 45_000 });
		await expect(m.locator('[data-feedback]')).toContainText('XP');

		// Module progress + badge update live.
		await expect(mod.locator('[data-count]')).toHaveText('1 / 1');
		await expect(mod.locator('[data-badge]')).toBeVisible();
		await expect(mod.locator('[data-xp]')).toContainText('10');

		// localStorage survives a reload — no re-running needed.
		await page.reload();
		await expect(mission(page, 'demo-m-pass').locator('[data-state]')).toBeVisible();
		await expect(
			page.locator('[data-modprog][data-module="demo"] [data-count]')
		).toHaveText('1 / 1');
		await expect(
			page.locator('[data-modprog][data-module="demo"] [data-badge]')
		).toBeVisible();
	});

	test('failing mission: shows the AZ hint and does not complete', async ({ page }) => {
		test.setTimeout(60_000);
		await page.goto('/python-demo/');

		const m = mission(page, 'demo-m-fail');
		await m.locator('[data-run]').click();

		await expect(m.locator('[data-feedback]')).toContainText('salam', { timeout: 45_000 });
		await expect(m.locator('[data-state]')).toBeHidden();
	});
});
