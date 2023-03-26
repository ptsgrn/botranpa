<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script lang="ts">
	import CheckBoxEntry from '$lib/components/availability-setting/CheckBoxEntry.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { availabilities } from '$lib/stores/availability';
	import type { AvailabilityEntry } from '$lib/types';
	import { isEditing } from '$lib/stores/availability';
	import { onMount } from 'svelte';
	import { Edit } from 'carbon-icons-svelte';
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

	let openCreateNew = false;
</script>

<div
	class="card form-controlp-3 bg-gray-800 whitespace-nowrap break-inside-avoid transition-all duration-500 min-w-[clamp(0px,999*(300px-100%), 100%)] flex-grow max-w-xs"
>
	<div class="card-body px-4 pt-4 {$isEditing ? 'pb-1' : 'pb-4'}">
		<h3 class="font-sans text-lg font-bold">
			{group}
			{#if $isEditing}
				<button class="btn btn-sm btn-ghost tooltip" data-tip={`เปลี่ยนชื่อหัวข้อ "${group}"`}>
					<Edit />
				</button>
			{/if}
		</h3>
		<div class="flex">
			<label class="label cursor-pointer gap-2" for={`checkbox-${group}-all`}>
				<input
					disabled={$isEditing}
					type="checkbox"
					id={`checkbox-${group}-all`}
					class="toggle toggle-primary"
					on:change={onToggleAll}
					bind:checked={checkedAll}
					bind:this={checkAllCheckbox}
				/>
				<span class="label-text font-serif">ทั้งหมด</span>
			</label>
		</div>
		{#each groupAvailabilities as { available, type, group, name }, index}
			<CheckBoxEntry {toggleCheck} {index} checked={available} {name} {group} {type} />
		{/each}
	</div>
	{#if $isEditing}
		<button
			class="btn btn-ghost btn-sm mx-4 mb-4 mt-2 border-dashed bg-transparent border-gray-700 border-2"
		>
			<Add width="20" height="20" /> เพิ่มรายการ
		</button>
	{/if}
</div>
