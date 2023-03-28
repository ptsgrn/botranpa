import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import db from '$lib/server/db';

export const POST = (async ({ params, request }) => {
	const { id } = params;
	const { available } = await request.json();
	await db.availableMenu
		.update({
			where: { id },
			data: { available }
		})
		.catch((e) => {
			throw error(500, e.message);
		});
	return new Response('OK');
}) satisfies RequestHandler;
