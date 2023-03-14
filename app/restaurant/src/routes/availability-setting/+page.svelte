<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script lang="ts">
	import type { AvailabilityEntry } from '$lib/types';
	import CheckBoxEntry from '$lib/components/availability-setting/CheckBoxEntry.svelte';
	import AvailabillitySet from '$lib/components/availability-setting/AvailabillitySet.svelte';
	import { availabilities } from '$lib/stores/availability';

	$availabilities = [
		{
			type: 'เมนู',
			group: 'เมนูหลัก',
			name: 'ข้าวผัดไข่เจียว',
			available: true
		},
		{
			type: 'วัตถุดิบ',
			group: 'ผัก',
			name: 'ผักกาดหอม',
			available: true
		},

		{
			type: 'วัตถุดิบ',
			group: 'ผัก',
			name: 'กวางตุ้ง',
			available: false
		}
	];

	$: setGroup = $availabilities.map((a) => a.type).filter((v, i, a) => a.indexOf(v) === i);
</script>

<h1 class="text-2xl font-bold">ตั้งค่าวัตถุดิบและเมนูประจำวัน</h1>
<p class="prose font-serif mt-2">
	หน้าสำหรับการตั้งค่าวัตถุดิบและเมนูว่ามีอยู่ในร้านหรือไม่ประจำวัน
	จะนำไปใช้ในการตอบกลับลูกค้าโดยแชตบอต
</p>

{#each setGroup as group}
	<AvailabillitySet typeName={`${group}`} />
{/each}
