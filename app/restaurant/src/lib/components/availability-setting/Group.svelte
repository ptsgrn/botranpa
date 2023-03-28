<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import CheckBoxEntry from '$lib/components/availability-setting/CheckBoxEntry.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { availabilities, availabilitiesEditingBuffer } from '$lib/stores/availability';
	import type { AvailabilityEntry } from '$lib/types';
	import { isEditing } from '$lib/stores/availability';
	import { onMount } from 'svelte';
	import { Edit, Save } from 'carbon-icons-svelte';
	export let type: string = '';
	export let group: string = '';

	let checkedAll: boolean = false;
	let checkAllCheckbox: HTMLInputElement;

	$: groupAvailabilities = $availabilities.filter((a) => a.type === type && a.group === group);
	$: groupAvailabilitiesEditingBuffer = $availabilitiesEditingBuffer.filter(
		(a) => a.type === type && a.group === group
	);

	$: groupAvailabilitiesData = $isEditing ? groupAvailabilitiesEditingBuffer : groupAvailabilities;

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
		fetch('/api/a', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				$availabilities
					.filter((a) => a.type === type && a.group === group)
					.map((a) => {
						return {
							id: a.id,
							name: a.name,
							available: checkedAll
						};
					})
			)
		})
			.then(async (res) => {
				if (res.status !== 200) {
					console.error(res);
				}
				const data = await res.json();
				$availabilities = data;
			})
			.catch((e) => {
				console.error(e);
			});
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
	function onAddNewEntry() {
		$availabilitiesEditingBuffer = [
			...$availabilitiesEditingBuffer,
			{
				id: Math.random().toString(36).substr(2, 9),
				type,
				group,
				name: `รายการใหม่ ${Math.random().toString(36).substr(2, 4)}`,
				available: true
			}
		];
	}
	let isEditingGroupTitle = false;
	let newGroupTitle = group;
</script>

<div
	class="card form-controlp-3 bg-gray-800 whitespace-nowrap break-inside-avoid transition-all duration-500 min-w-[clamp(0px,999*(300px-100%), 100%)] flex-grow max-w-xs"
>
	<div class="card-body px-4 pt-4 {$isEditing ? 'pb-1' : 'pb-4'}">
		<div class="flex flex-row">
			{#if !$isEditing}
				<h3 class="font-sans text-lg font-bold">
					{group}
				</h3>
			{:else}
				<input
					type="text"
					bind:value={newGroupTitle}
					on:change={() => {
						$availabilitiesEditingBuffer = $availabilitiesEditingBuffer.map((a) => {
							if (a.group === group && a.type === type) {
								a.group = newGroupTitle;
							}
							return a;
						});
						group = newGroupTitle;
					}}
					class="input input-bordered input-sm w-full"
				/>
			{/if}
		</div>
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
		{#each groupAvailabilitiesData as { available, type, group, name, id }, index}
			<CheckBoxEntry {toggleCheck} {index} {id} checked={available} {name} {group} {type} />
		{/each}
	</div>
	{#if $isEditing}
		<button
			on:click={onAddNewEntry}
			class="btn btn-ghost btn-sm mx-4 mb-4 mt-2 border-dashed bg-transparent  border-gray-700 border-2"
		>
			<Add width="20" height="20" /> เพิ่มรายการ
		</button>
	{/if}
</div>
