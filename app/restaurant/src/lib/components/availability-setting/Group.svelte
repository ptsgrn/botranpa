<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script lang="ts">
	import CheckBoxEntry from '$lib/components/availability-setting/CheckBoxEntry.svelte';
	import { availabilities } from '$lib/stores/availability';
	import type { AvailabilityEntry } from '$lib/types';
	import { onMount } from 'svelte';
	export let type: string = '';
	export let group: string = '';

	let checkedAll: boolean = false;
	let checkAllCheckbox: HTMLInputElement;

	$: groupAvailabilities = $availabilities.filter((a) => a.type === type && a.group === group);

	onMount(() => {
		toggleCheck();
	});

	function onToggleAll() {
		checkedAll = !checkedAll;
		$availabilities = $availabilities.map((a) => {
			if (a.type === type && a.group === group) {
				a.available = checkedAll;
			}
			return a;
		});
		toggleCheck();
	}

	export function toggleCheck() {
		if (!checkAllCheckbox) return;
		const gAvailabilities = $availabilities.filter((a) => a.type === type && a.group === group);
		if (gAvailabilities.every((a) => a.available)) {
			checkAllCheckbox.checked = true;
			checkAllCheckbox.indeterminate = false;
		} else if (gAvailabilities.some((a) => a.available)) {
			checkAllCheckbox.checked = false;
			checkAllCheckbox.indeterminate = true;
		} else {
			checkAllCheckbox.checked = false;
			checkAllCheckbox.indeterminate = false;
		}
	}
</script>

<div class="card form-controlp-3 bg-gray-800 whitespace-nowrap break-inside-avoid ">
	<div class="card-body">
		<h3 class="font-sans text-lg font-bold">
			{group}
		</h3>
		<label class="label cursor-pointer justify-start gap-2" for={`checkbox-${group}-all`}>
			<input
				type="checkbox"
				id={`checkbox-${group}-all`}
				class="toggle toggle-primary"
				on:change={onToggleAll}
				bind:checked={checkedAll}
				bind:this={checkAllCheckbox}
			/>
			<span class="label-text">ทั้งหมด</span>
		</label>
		{#each groupAvailabilities as { available, type, group, name }, index}
			<CheckBoxEntry {toggleCheck} {index} checked={available} {name} {group} {type} />
		{/each}
	</div>
</div>
