/**
 * Client-side progress store for the Python course (no accounts in v1).
 *
 * Persists XP, completed missions, and module badges to localStorage under a
 * single versioned key. All reads tolerate missing/corrupt/legacy data by
 * falling back to a fresh record, so a bad value can never break a lesson.
 *
 * Schema (rm-python-progress):
 *   { v: 1, xp: 120,
 *     missions: { "m01-l02-mission-1": { done: true, at: "2026-..." } },
 *     badges: ["module-01"] }
 */

export const STORAGE_KEY = 'rm-python-progress';
const VERSION = 1;

export interface MissionRecord {
	done: true;
	at: string;
}

export interface Progress {
	v: number;
	xp: number;
	missions: Record<string, MissionRecord>;
	badges: string[];
}

export interface ModuleStatus {
	done: number;
	total: number;
	complete: boolean;
	badge: boolean;
}

function fresh(): Progress {
	return { v: VERSION, xp: 0, missions: {}, badges: [] };
}

export function load(): Progress {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return fresh();
		const data = JSON.parse(raw);
		// Unknown/legacy version → start clean rather than trust a foreign shape.
		if (!data || data.v !== VERSION || typeof data.xp !== 'number') return fresh();
		return {
			v: VERSION,
			xp: data.xp,
			missions: data.missions && typeof data.missions === 'object' ? data.missions : {},
			badges: Array.isArray(data.badges) ? data.badges : [],
		};
	} catch {
		return fresh();
	}
}

export function save(p: Progress): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
	} catch {
		// Private-mode / quota / disabled storage — progress just won't persist.
	}
}

export function isDone(id: string): boolean {
	return load().missions[id]?.done === true;
}

export function totalXp(): number {
	return load().xp;
}

/**
 * Mark a mission complete. XP is awarded only on the first completion, so
 * re-running a solved mission never inflates the score. Returns whether this
 * was the first completion and the resulting total XP.
 */
export function completeMission(
	id: string,
	xp: number
): { firstTime: boolean; totalXp: number } {
	const p = load();
	if (p.missions[id]?.done) return { firstTime: false, totalXp: p.xp };
	p.missions[id] = { done: true, at: new Date().toISOString() };
	p.xp += Math.max(0, Math.trunc(xp) || 0);
	save(p);
	return { firstTime: true, totalXp: p.xp };
}

/**
 * Completion status for a module's missions. Awards the module badge
 * (`module-<moduleId>`) the first time every mission is done — badges are
 * earned wherever a <ModuleProgress> for the module is rendered.
 */
export function moduleStatus(moduleId: string, missionIds: string[]): ModuleStatus {
	const p = load();
	const done = missionIds.filter((id) => p.missions[id]?.done === true).length;
	const total = missionIds.length;
	const complete = total > 0 && done === total;
	const badgeId = `module-${moduleId}`;
	let badge = p.badges.includes(badgeId);
	if (complete && !badge) {
		p.badges.push(badgeId);
		badge = true;
		save(p);
	}
	return { done, total, complete, badge };
}
