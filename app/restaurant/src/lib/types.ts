// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
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
	type: string;
	/** group of type */
	group: string;
	/** Label to show */
	name: string;
	/** Sorting number */
	sort?: number;
	/** Id */
	id?: string;
}
