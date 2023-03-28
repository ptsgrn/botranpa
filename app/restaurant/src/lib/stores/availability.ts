// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.

import type { AvailabilityEntry } from '$lib/types';
import { writable } from 'svelte/store';

export const availabilities = writable<AvailabilityEntry[]>([]);
export const isEditing = writable<boolean>(false);

export const availabilitiesEditingBuffer = writable<AvailabilityEntry[]>([]);