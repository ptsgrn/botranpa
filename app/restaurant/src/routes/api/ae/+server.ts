// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deepDiffMappper } from '$lib/utils/compareObjectListDiff';
import db from '$lib/db';

export const GET = (({ url }) => {
	return new Response('ok');
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { availabilities } = await request.json().catch(() => {
		throw error(400, 'Invalid JSON');
	});
	const dbAvailabilities = await db.availableMenu.findMany();
	const diff = deepDiffMappper(dbAvailabilities, availabilities);
	const errorMap = new Map<string, string | number | boolean>();
	for (const { _diff, id, available, group, name, type, alias } of diff) {
		if (_diff === 'same') continue;
		if (_diff === 'deleted') {
			await db.availableMenu
				.delete({
					where: {
						id
					}
				})
				.catch((e) => {
					errorMap.set(id, e);
				});
			continue;
		}
		if (_diff === 'new') {
			await db.availableMenu
				.create({
					data: {
						available: available ?? true,
						group,
						name,
						type,
						alias: alias ?? []
					}
				})
				.catch((e) => {
					errorMap.set(id, e);
				});
			continue;
		}
		if (_diff === 'edited') {
			await db.availableMenu
				.update({
					where: {
						id
					},
					data: {
						available,
						group,
						name,
						type,
						alias: alias ?? []
					}
				})
				.catch((e) => {
					errorMap.set(id, e);
				});
			continue;
		}
	}
	const availabilitiesAfterUpdate = await db.availableMenu.findMany();
	return json({
		error: errorMap.size > 0 ? errorMap : null,
		diff,
		availabilitiesAfterUpdate
	});
}) satisfies RequestHandler;
