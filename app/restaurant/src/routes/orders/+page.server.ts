import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const orders = await db.order.findMany();
	if (!orders) {
		return error(404, 'Not found');
	}
	return {
		orders
	};
}) satisfies PageServerLoad;
