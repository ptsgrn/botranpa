<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script lang="ts">
	import { availabilities, isEditing } from '$lib/stores/availability';
	import { ChevronRight, Edit, TrashCan } from 'carbon-icons-svelte';
	export let toggleCheck: () => void;
	export let checked: boolean = false;
	export let index: number = 0;
	export let group: string = '';
	export let name: string = '';
	export let type: string = '';
	export let id: string = '';
	function onToggle() {
		const newAvailabilities = $availabilities.map((a) => {
			if (a.type === type && a.group === group && a.name === name) {
				return { ...a, available: !a.available };
			}
			return a;
		});
		$availabilities = newAvailabilities;
		toggleCheck();
	}

	function calculateSimpleUniqueHashString(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash.toString();
	}

	let isEdittingEntry = false;
	let isEditted = index == 1;
</script>

<label class="label cursor-pointer flex" for={`checkbox-${group}-${index}-${id}`}>
	<div class="justify-start flex gap-2 items-center">
		<input
			disabled={$isEditing}
			type="checkbox"
			id={`checkbox-${group}-${index}-${id}`}
			class="toggle toggle-primary"
			on:change={onToggle}
			bind:checked
		/>
		<span class="label-text font-serif flex items-center">{name}</span>
	</div>
	{#if $isEditing}
		<div class="flex gap-1">
			<button
				class="btn btn-sm tooltip tooltip-bottom indicator"
				data-tip="แก้ไข"
				on:click={() => {
					isEdittingEntry = true;
				}}
			>
				<Edit class="w-5 h-5 fill-blue-400" />
				{#if isEditted}
					<span class="indicator-item badge badge-accent border-1" />
				{/if}
			</button>
			<button class="btn btn-sm tooltip tooltip-bottom" data-tip="ลบออก">
				<TrashCan class="w-5 h-5 fill-red-400" />
			</button>
		</div>
	{/if}
</label>

<input type="checkbox" class="modal-toggle" bind:checked={isEdittingEntry} />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">แก้ไขรายการ</h3>
		<p class="py-4">
			<label class="label">
				<span class="label-text">ชื่อรายการ</span>
				<input type="text" class="input input-bordered max-w-xl" />
			</label>
			<label class="label">
				<span class="label-text">ชื่ออื่น</span>
				<textarea class="textarea input-bordered max-w-xl" />
			</label>
		</p>
		<div class="modal-action flex items-center">
			<span class="font-serif">
				กดบันทึกที่หน้าหลักหลังจากแก้ไขเสร็จสิ้น
			</span>
			<button class="btn btn-outline btn-secondary">ยกเลิก</button>
			<button
				on:click={() => {
					isEdittingEntry = false;
				}}
				class="btn btn-primary"
			>
				ปิด
			</button>
		</div>
	</div>
</div>
