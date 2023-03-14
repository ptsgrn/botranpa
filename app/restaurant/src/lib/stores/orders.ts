// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { Order } from '$lib/types'
import { writable } from 'svelte/store';

export const orders = writable<Order[]>([]);
