// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface Option {
	name: string;
	type: string;
}

export interface Menu {
	name: string;
	count: number;
	note?: string;
	options: Option[];
}

export interface Order {
	orderID?: string | number;
	table?: string | number;
	isDone: boolean;
	time: Date;
	menu: Menu[];
}

export interface AvailabilityEntry {
	available: boolean;
	/** type */
	type: 'วัตถุดิบ' | 'เมนู';
	/** group of type */
	group: string;
	/** Label to show */
	name: string;
	/** Sorting number */
	sort?: number;
	/** Id */
	id?: string;
}
