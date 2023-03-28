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
	import { Edit, Error, Reset, Save } from 'carbon-icons-svelte';
	import { Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { dev } from '$app/environment';

	export let data: PageData;
	$availabilities = data.availabilitiesData;
	$: setGroup = [
		...$availabilities.map((a) => a.type).filter((v, i, a) => a.indexOf(v) === i),
		'เมนู',
		'วัตถุดิบ'
	].filter((v, i, a) => a.indexOf(v) === i);
	$availabilitiesEditingBuffer = $availabilities;
	$: setGroupEditingBuffer = [
		...$availabilitiesEditingBuffer.map((a) => a.type).filter((v, i, a) => a.indexOf(v) === i),
		'เมนู',
		'วัตถุดิบ'
	].filter((v, i, a) => a.indexOf(v) === i);

	let isSaving = false;
	let isSavingError = false;
	async function onSave() {
		isSaving = true;
		await fetch('/api/ae', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				availabilities: $availabilitiesEditingBuffer
			})
		})
			.then(async (res) => {
				if (res.ok) {
					const { error, availabilitiesAfterUpdate, diff } = await res.json();
					$availabilities = availabilitiesAfterUpdate;
					$isEditing = false;
					$availabilitiesEditingBuffer = $availabilities;
					if (error) {
						isSavingError = true;
						console.error(error);
					}
					if (dev) {
						console.log('diff', diff);
					}
				}
			})
			.catch((e) => {
				isSavingError = true;
				console.error(e);
			})
			.finally(() => {
				isSaving = false;
			});
	}
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
	{#each setGroup as group, i}
		<AvailabillitySet typeName={`${group}`} />
		{#if i + 1 < setGroup.length}
			<hr class="my-4" />
		{/if}
	{:else}
		<div>- ยังไม่มีประเภทนี้ในตอนนี้ -</div>
	{/each}
{:else}
	{#each setGroupEditingBuffer as group, i}
		<AvailabillitySet typeName={`${group}`} />
		{#if i + 1 < setGroupEditingBuffer.length}
			<hr class="my-4" />
		{/if}
	{/each}
{/if}

<div class="flex justify-end mt-4 gap-2 items-center">
	{#if $isEditing}
		<span>อย่าลืมบันทึกการแก้ไข</span>
		<button
			class="btn btn-secondary btn-outline gap-3"
			disabled={isSaving}
			on:click={() => {
				$isEditing = false;
				$availabilitiesEditingBuffer = $availabilities;
			}}
		>
			<Reset class="inline-block w-6 h-6" />
			ยกเลิกการแก้ไขและออก
		</button>
		<button
			disabled={isSaving}
			class="btn btn-primary gap-3 {isSaving ? 'loading' : ''}"
			on:click={onSave}
		>
			<Save class="inline-block w-6 h-6" />
			บันทึก
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
<div class="toast toast-end hidden {isSavingError ? '' : 'hidden'}">
	<div class="alert alert-error shadow-lg flex-row items-center justify-center align-baseline">
		<div>
			<Error class="inline-block w-6 h-6" />
			<span>ไม่สามารถบันทึกการแก้ไขได้</span>
		</div>
		<div class="flex-none">
			<button
				class="btn btn-sm btn-primary"
				on:click={() => {
					$isEditing = true;
					isSaving = false;
					isSavingError = false;
				}}>ปิด</button
			>
		</div>
	</div>
</div>
