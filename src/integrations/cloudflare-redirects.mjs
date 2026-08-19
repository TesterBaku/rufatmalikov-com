import { appendFile, readFile } from 'node:fs/promises';

/**
 * Writes dist/_redirects so Cloudflare Pages serves genuine 301s.
 *
 * Astro's `redirects` option on a static build only emits a 200 HTML stub with
 * a <meta http-equiv="refresh">. Search engines treat those as duplicate pages,
 * not redirects. Cloudflare evaluates _redirects before serving a matching
 * static asset ("Redirects are always followed, regardless of whether or not an
 * asset matches the incoming request"), so these rules shadow the stubs.
 *
 * Both the trailing-slash and bare forms are emitted: rules match the path
 * literally, so without the bare form `/old` would first hit Cloudflare's
 * trailing-slash normalisation and only then redirect — an extra hop.
 *
 * @param {Record<string, string>} redirects
 */
export function cloudflareRedirects(redirects) {
	return {
		name: 'cloudflare-redirects',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const lines = [];
				for (const [from, to] of Object.entries(redirects)) {
					lines.push(`${from} ${to} 301`);
					if (from !== '/' && from.endsWith('/')) {
						lines.push(`${from.slice(0, -1)} ${to} 301`);
					}
				}

				const target = new URL('_redirects', dir);
				// public/_redirects is copied verbatim by Astro; append rather than
				// overwrite so any hand-authored rules there keep their precedence.
				let existing = '';
				try {
					existing = await readFile(target, 'utf8');
				} catch {
					// No hand-authored file — the generated rules stand alone.
				}
				const prefix = existing && !existing.endsWith('\n') ? '\n' : '';
				await appendFile(target, `${prefix}${lines.join('\n')}\n`);

				logger.info(`wrote ${lines.length} redirect rules to _redirects`);
			},
		},
	};
}
