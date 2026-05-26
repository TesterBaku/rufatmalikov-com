import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry',
		// Locally, drive the system Chrome (no Playwright browser download needed).
		// In CI, use the Playwright-managed chromium installed by `playwright install`.
		...(process.env.CI ? {} : { channel: 'chrome' }),
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `npm run build && npm run preview -- --port ${PORT}`,
		url: `http://localhost:${PORT}/en/`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
