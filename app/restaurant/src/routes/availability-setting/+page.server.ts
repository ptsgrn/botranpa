// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.

import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load = (async () => {
	return {
		availabilitiesData: await db.availableMenu.findMany()
	};
}) satisfies PageServerLoad;
