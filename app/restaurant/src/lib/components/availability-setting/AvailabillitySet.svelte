<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script lang="ts">
	import type { AvailabilityEntry } from '$lib/types';
	import { availabilities, availabilitiesEditingBuffer } from '$lib/stores/availability';
	import Group from './Group.svelte';
	import { isEditing } from '$lib/stores/availability';
	import { Add } from 'carbon-icons-svelte';
	export let typeName = 'เมนู';

	$: groups = $availabilities
		.filter((a) => a.type === typeName)
		.map((a) => a.group)
		.filter((v, i, a) => a.indexOf(v) === i);
	function onAddGroup() {
		$availabilitiesEditingBuffer.push({
			type: typeName,
			group: 'กลุ่มใหม่',
			entries: [],
		});
	}
</script>

<h2 class="text-xl font-bold mt-5">{typeName}</h2>
<div
	class="flex flex-wrap gap-4 items-stretch mt-4
"
>
	{#each groups as group}
		<Group type={typeName} {group} />
	{/each}
	{#if $isEditing}
		<button
			on:click={onAddGroup}
			class="btn btn-ghost h-auto card border-2 border-gray-700 border-dashed min-w-[clamp(0px,999*(600px-100%), 100%)] flex-grow max-w-xs"
		>
			<div class="card-body flex justify-center content-center text-center flex-col items-center">
				<Add class="fill-gray-500 w-8 h-8 inline" />
				<span class="text-gray-500">เพิ่มกลุ่มใหม่</span>
			</div>
		</button>
	{/if}
</div>
