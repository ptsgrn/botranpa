// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

export const GET = (async () => {
	return json({
		order: await db.order.findMany()
	});
}) satisfies RequestHandler;
