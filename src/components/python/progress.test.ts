import { beforeEach, describe, expect, it } from 'vitest';
import {
	STORAGE_KEY,
	completeMission,
	isDone,
	load,
	moduleStatus,
	totalXp,
} from './progress';

beforeEach(() => {
	localStorage.clear();
});

describe('load — corruption tolerance', () => {
	it('returns a fresh record when nothing is stored', () => {
		expect(load()).toEqual({ v: 1, xp: 0, missions: {}, badges: [] });
	});

	it('falls back to fresh on non-JSON garbage', () => {
		localStorage.setItem(STORAGE_KEY, 'not json {{{');
		expect(load()).toEqual({ v: 1, xp: 0, missions: {}, badges: [] });
	});

	it('rejects a foreign/legacy version and starts clean', () => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ v: 999, xp: 500, missions: { x: { done: true, at: 'z' } }, badges: ['m'] })
		);
		expect(load()).toEqual({ v: 1, xp: 0, missions: {}, badges: [] });
	});

	it('rejects a record whose xp is not a number', () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, xp: 'lots', missions: {}, badges: [] }));
		expect(load().xp).toBe(0);
	});

	it('coerces malformed missions/badges fields to safe defaults', () => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ v: 1, xp: 10, missions: 'nope', badges: 'nope' })
		);
		const p = load();
		expect(p.xp).toBe(10);
		expect(p.missions).toEqual({});
		expect(p.badges).toEqual([]);
	});
});

describe('completeMission — first-completion XP guard', () => {
	it('awards XP and reports firstTime on first completion', () => {
		const res = completeMission('m01-l01', 10);
		expect(res).toEqual({ firstTime: true, totalXp: 10 });
		expect(isDone('m01-l01')).toBe(true);
		expect(totalXp()).toBe(10);
	});

	it('never inflates XP when re-running a solved mission', () => {
		completeMission('m01-l01', 10);
		const again = completeMission('m01-l01', 10);
		expect(again).toEqual({ firstTime: false, totalXp: 10 });
		expect(totalXp()).toBe(10);
	});

	it('accumulates XP across distinct missions', () => {
		completeMission('a', 10);
		completeMission('b', 15);
		expect(totalXp()).toBe(25);
	});

	it('clamps negative or non-integer xp to a safe value', () => {
		expect(completeMission('neg', -50).totalXp).toBe(0);
		expect(completeMission('frac', 7.9).totalXp).toBe(7);
	});
});

describe('moduleStatus — badge award on module completion', () => {
	const ids = ['m1', 'm2', 'm3'];

	it('reports partial progress without a badge', () => {
		completeMission('m1', 10);
		const s = moduleStatus('01', ids);
		expect(s).toMatchObject({ done: 1, total: 3, complete: false, badge: false });
	});

	it('awards the badge exactly when every mission is done', () => {
		ids.forEach((id) => completeMission(id, 10));
		const s = moduleStatus('01', ids);
		expect(s).toMatchObject({ done: 3, total: 3, complete: true, badge: true });
		expect(load().badges).toEqual(['module-01']);
	});

	it('does not duplicate the badge on repeated reads', () => {
		ids.forEach((id) => completeMission(id, 10));
		moduleStatus('01', ids);
		moduleStatus('01', ids);
		expect(load().badges).toEqual(['module-01']);
	});

	it('treats an empty module as not complete', () => {
		expect(moduleStatus('99', [])).toMatchObject({ complete: false, badge: false });
	});
});
