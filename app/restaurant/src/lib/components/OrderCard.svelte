<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import MenuOnOrderBoard from '$lib/components/MenuOnOrderBoard.svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { orders, orderDone } from '$lib/stores/orders';
	import type { Order } from '$lib/types';
	import { fade } from 'svelte/transition';
	export let order: Order = {
		isDone: false,
		menu: [],
		id: '',
		table: 0,
		time: new Date()
	};
	export let orderIndex: number = 0;

	let dateFormat = new Intl.DateTimeFormat('th-TH', {
		// year: 'numeric',
		// month: 'long',
		// day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
		// second: 'numeric'
	});
</script>

{#if orderIndex === $orders.filter((o) => !o.isDone).length && $orders.filter((o) => !o.isDone).length > 0}
	<div class="divider divider-horizontal">เรียบร้อย</div>
{/if}

<div
	class="border-4 border-green-500 rounded-lg flex-col shadow-lg w-60 flex-none snap-always snap-start {order.isDone
		? 'opacity-50'
		: ''}
"
>
	<div
		class="m-0 text-center py-2 bg-green-500 text-black font-semibold text-md flex flex-row justify-between px-3 font-mono"
		transition:fade
	>
		<span>#{`${order.id?.toString().slice(0, 4)}`.padStart(3, '0')}</span>
		{#if order.time}
			<span>
				{dateFormat.format(order.time)}
			</span>
		{/if}
	</div>
	<div class="p-2">
		<div class="h-80">
			{#each order.menu as menu, orderIndex}
				<MenuOnOrderBoard menuData={menu} />
			{/each}
		</div>
		<button
			on:click={() => {
				if (!$orderDone.includes(String(order.id))) $orderDone = [...$orderDone, String(order.id)];
				else $orderDone = $orderDone.filter((id) => id !== order.id);
			}}
			class="btn w-full box-border {!order.isDone ? 'btn-primary' : 'btn-outline'}"
		>
			<Checkmark width="20" height="20" />
			{order.isDone ? 'เสร็จแล้ว' : ''}
		</button>
	</div>
</div>
