import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '$lib/db';

export const load = (async () => {
	return {
		availabilitiesData: await db.availableMenu.findMany()
	};
}) satisfies PageServerLoad;
