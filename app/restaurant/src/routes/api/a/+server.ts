import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import db from '$lib/db';

export const POST = (async ({ request }) => {
	const availabilities = await request.json().catch(() => {
		throw error(400, 'Invalid JSON');
	});
	const updateIds = availabilities.map((a) => a.id);
	const dbAvailabilities = await db.availableMenu
		.updateMany({
			where: {
				id: {
					in: updateIds
				}
			},
			data: {
				available: availabilities[0].available
			}
		})
		.catch((e) => {
			throw error(500, e);
		});

	return json(await db.availableMenu.findMany());
}) satisfies RequestHandler;
