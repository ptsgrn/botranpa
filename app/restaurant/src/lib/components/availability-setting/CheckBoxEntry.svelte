<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import { availabilities, isEditing, availabilitiesEditingBuffer } from '$lib/stores/availability';
	import { ChevronRight, Edit, TrashCan } from 'carbon-icons-svelte';
	export let toggleCheck: () => void;
	export let checked: boolean = false;
	export let index: number | string = 0;
	export let group: string = '';
	export let name: string = '';
	export let type: string = '';
	export let id: string = '';
	export let alias: string[] = [];
	let isSendingRequest = false;
	async function onToggle() {
		const newAvailabilities = $availabilities.map((a) => {
			if (a.id === id) {
				return { ...a, available: !a.available };
			}
			return a;
		});
		$availabilities = newAvailabilities;
		toggleCheck();

		fetch(`/api/a`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([
				{
					id: id,
					name,
					available: !!newAvailabilities.find((a) => a.id === id)?.available
				}
			])
		})
			.then((res) => {
				if (res.status !== 200) {
					console.error(res);
				}
			})
			.catch((e) => {
				console.error(e);
			});
	}

	let isEdittingEntry = false;
	$: isEditted = name !== editedBuffer.name || alias.join(',') !== editedBuffer.alias.join(',');
	function onRemoveEntry() {
		$availabilitiesEditingBuffer = $availabilitiesEditingBuffer.filter((a) => a.id !== id);
	}

	let editing = {
		name,
		alias
	};

	let editedBuffer = {
		name,
		alias
	};

	function onCloseEdit() {
		isEdittingEntry = false;
		editedBuffer = editing;
		$availabilitiesEditingBuffer = $availabilitiesEditingBuffer.map((a) => {
			if (a.type === type && a.group === group && a.name === name) {
				return { ...a, ...editing };
			}
			return a;
		});
	}

	function onDiscardEditing() {
		isEdittingEntry = false;
		editing = {
			name,
			alias
		};
		editedBuffer = editing;
		$availabilitiesEditingBuffer = $availabilitiesEditingBuffer.map((a) => {
			if (a.type === type && a.group === group && a.name === name) {
				return { ...a, ...editing };
			}
			return a;
		});
	}

	function onClickEdit() {
		isEdittingEntry = true;
		const { name: bufferName, alias: bufferAlias } = $availabilitiesEditingBuffer.find(
			(a) => a.id === id
		) || { name, alias };
		editedBuffer = {
			name: bufferName,
			alias: bufferAlias || []
		};
		editing = editedBuffer;
	}
</script>

<label class="label cursor-pointer flex" for={`checkbox-${index}-${id}`}>
	<div class="justify-start flex gap-2 items-center">
		<input
			disabled={$isEditing}
			type="checkbox"
			id={`checkbox-${index}-${id}`}
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
				on:click={onClickEdit}
			>
				<Edit class="w-5 h-5 fill-blue-400" />
				{#if isEditted}
					<span class="indicator-item badge badge-accent border-1" />
				{/if}
			</button>
			<button class="btn btn-sm tooltip tooltip-bottom" data-tip="ลบออก" on:click={onRemoveEntry}>
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
				<input type="text" bind:value={editing.name} class="input input-bordered w-xl" />
			</label>
			<label class="label">
				<span class="label-text">ชื่ออื่น</span>
				<textarea
					on:change|preventDefault={(e) => {
						editing.alias = e.target.value
							.split(',')
							.map((a) => a.trim())
							.filter((a) => a !== '');
					}}
					class="textarea input-bordered w-xl"
				/>
			</label>
		</p>
		<div class="modal-action flex items-center">
			<span class="font-serif"> กดบันทึกที่หน้าหลักหลังจากแก้ไขเสร็จสิ้น </span>
			<button on:click={onDiscardEditing} class="btn btn-outline btn-secondary">ยกเลิก</button>
			<button on:click={onCloseEdit} class="btn btn-primary"> ปิด </button>
		</div>
	</div>
</div>
