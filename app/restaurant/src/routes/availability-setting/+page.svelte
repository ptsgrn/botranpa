<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import type { AvailabilityEntry } from '$lib/types';
	import CheckBoxEntry from '$lib/components/availability-setting/CheckBoxEntry.svelte';
	import AvailabillitySet from '$lib/components/availability-setting/AvailabillitySet.svelte';
	import { availabilities, availabilitiesEditingBuffer } from '$lib/stores/availability';
	import { isEditing } from '$lib/stores/availability';
	import { Add, Edit, Reset, Save } from 'carbon-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$availabilities = data.availabilitiesData;
	$: setGroup = $availabilities.map((a) => a.type).filter((v, i, a) => a.indexOf(v) === i);
	$availabilitiesEditingBuffer = $availabilities;
</script>

<svelte:head>
	<title>ตั้งค่าวัตถุดิบและเมนูประจำวัน</title>
</svelte:head>

<h1 class="text-2xl font-bold">ตั้งค่าวัตถุดิบและเมนูประจำวัน</h1>
<p class="prose font-serif mt-2">
	หน้าสำหรับการตั้งค่าวัตถุดิบและเมนูว่ามีอยู่ในร้านหรือไม่ประจำวัน
	จะนำไปใช้ในการตอบกลับลูกค้าโดยแชตบอต
</p>

{#if !$isEditing}
	(not editing mode) {JSON.stringify($availabilities)}
	{#each setGroup as group, i}
		<AvailabillitySet typeName={`${group}`} />
		{#if i + 1 < setGroup.length}
			<hr class="my-4" />
		{/if}
	{/each}
{:else}
	(editing mode) {JSON.stringify($availabilitiesEditingBuffer)}
	{#each $availabilitiesEditingBuffer.map((a) => a.type).filter((v, i, a) => a.indexOf(v) === i) as group, i}
		<AvailabillitySet typeName={`${group}`} />
		{#if i + 1 < $availabilitiesEditingBuffer.length}
			<hr class="my-4" />
		{/if}
	{/each}
{/if}

<div class="flex justify-end mt-4 gap-2 items-center">
	{#if $isEditing}
		<span>อย่าลืมบันทึกการแก้ไข</span>
		<button
			class="btn btn-secondary btn-outline gap-3"
			on:click={() => {
				$isEditing = false;
			}}
		>
			<Reset class="inline-block w-6 h-6" />
			ยกเลิกการแก้ไขและออก
		</button>
		<button class="btn btn-primary gap-3">
			<Save class="inline-block w-6 h-6" /> บันทึก
		</button>
	{:else}
		<button
			class="btn btn-outline my-8 mx-auto btn-wide gap-3"
			on:click={() => {
				$isEditing = !$isEditing;
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					$isEditing = !$isEditing;
				}
			}}
		>
			<Edit class="inline-block w-6 h-6" />
			แก้ไขรายละเอียดรายการ
		</button>
	{/if}
</div>
