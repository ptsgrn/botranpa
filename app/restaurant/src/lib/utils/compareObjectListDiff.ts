import type { AvailabilityEntry } from '$lib/types';

interface AvailabilityEntryDiff extends AvailabilityEntry {
	_diff: 'new' | 'deleted' | 'edited' | 'same';
}

/**
 * This function takes two arrays and returns the difference between them.
 * It will return a new array that
 * @param original original array of object that will be the base of the comparison
 * @param edited edited array of object that will be compared to the original array
 * @returns a new array with object that have new property called '_diff' with value of 'new', 'deleted', or 'edited'. The rest of the object will be the new value of the object. if the object is deleted, the object will be the original value of the object.
 *   if the object is edited, the object will be the edited value of the object.
 *   if the object is new, the object will be the new value of the object.
 *   if the object is the same, the object will be the original value of the object. with value 'same'
 * @example
 * const original = [
 * { id: 1, name: 'John', age: 20 },
 * { id: 2, name: 'Jane', age: 21 },
 * { id: 3, name: 'Jack', age: 22 },
 * { id: 4, name: 'Jill', age: 23 },
 * ];
 * const edited = [
 * { id: 1, name: 'John', age: 20 },
 * { id: 2, name: 'Jane', age: 21 },
 * { id: 3, name: 'Jack', age: 23 },
 * { id: 4, name: 'Jill', age: 23 },
 * { id: 5, name: 'Jill', age: 23 },
 * ];
 * const diff = deepDiffMappper(original, edited);
 * console.log(diff);
 * // [
 * //   { id: 1, name: 'John', age: 20, _diff: 'same' },
 * //   { id: 2, name: 'Jane', age: 21, _diff: 'same' },
 * //   { id: 3, name: 'Jack', age: 23, _diff: 'edited' },
 * //   { id: 4, name: 'Jill', age: 23, _diff: 'same' },
 * //   { id: 5, name: 'Jill', age: 23, _diff: 'new' },
 * // ]
 */
export function deepDiffMappper(original: AvailabilityEntry[], edited: AvailabilityEntry[]) {
	const originalMap = new Map();
	const editedMap = new Map();
	const diff: AvailabilityEntryDiff[] = [];
	original.forEach((item) => {
		originalMap.set(item.id, item);
	});
	edited.forEach((item) => {
		editedMap.set(item.id, item);
	});
	originalMap.forEach((value, key) => {
		if (editedMap.has(key)) {
			const editedValue = editedMap.get(key);
			if (JSON.stringify(sortObjectKeys(value)) === JSON.stringify(sortObjectKeys(editedValue))) {
				diff.push({ ...value, _diff: 'same' });
			} else {
				diff.push({ ...editedValue, _diff: 'edited' });
			}
		} else {
			diff.push({ ...value, _diff: 'deleted' });
		}
	});
	editedMap.forEach((value, key) => {
		if (!originalMap.has(key)) {
			diff.push({ ...value, _diff: 'new' });
		}
	});
	return diff;
}

// object key sorting
function sortObjectKeys(obj: Record<string, unknown>) {
	return Object.keys(obj)
		.sort()
		.reduce((result, key) => {
			result[key] = obj[key];
			return result;
		}, {});
}
