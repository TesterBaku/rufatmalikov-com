import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		// progress.ts touches localStorage; happy-dom provides it without a full browser.
		environment: 'happy-dom',
		include: ['src/**/*.test.ts'],
	},
});
