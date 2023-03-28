<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import OrderCard from '$lib/components/OrderCard.svelte';
	import { orders, orderDone } from '$lib/stores/orders';
	import { onMount } from 'svelte';
	import type { PageData, Snapshot } from './$types';
	export let data: PageData;
	export const snapshot: Snapshot = {
		capture: () => {
			return {
				orderDone: $orderDone
			};
		},
		restore: (value) => {
			$orderDone = value.orderDone;
		}
	};
	$orders =
		data.orders?.map((a) => ({
			...a,
			isDone: $orderDone.includes(a.id),
			time: new Date(a.time)
		})) || [];
	$: $orders = $orders
		.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
		.sort((a, b) => (a.isDone ? 1 : -1))
		.map((a, i) => ({ ...a, isDone: $orderDone.includes(a.id || 'wtf') }));
	let countDown = 10;
	onMount(() => {
		let interval = setInterval(async () => {
			countDown--;
			if (countDown <= 0) {
				fetch(new URL('/api/orders', document.baseURI).href)
					.then((res) => res.json())
					.then((resData) => {
						if (!resData.order) return;
						$orders = resData.order.map((a) => ({
							...a,
							isDone: $orderDone.includes(a.id),
							time: new Date(a.time)
						}));
					})
					.catch((e) => {
						console.error(e);
					});
				countDown = 10;
			}
		}, 1000);
	});
</script>

<h1 class="text-2xl">รายการอาหารที่สั่ง</h1>
<div class="stats bg-gray-800 mt-5">
	<div class="stat">
		<div class="stat-title">เหลืออีก</div>
		<div class="stat-value text-primary">{$orders.filter((o) => !o.isDone).length}</div>
		<div class="stat-desc">ออเดอร์</div>
	</div>
</div>
<span class="countdown float-right mt-5 font-serif text-sm">
	รีโหลดครั้งต่อไปใน<span class="mx-2 font-mono" style="--value:{countDown};">{countDown}</span> วินาที
</span>
<div
	class="py-5 gap-4 snap-x snap-proximity flex flex-none flex-nowrap flex-row overflow-auto w-full scrollbar
  "
>
	{#each $orders as order, orderIndex}
		<OrderCard {order} {orderIndex} />
	{/each}
</div>

<style>
	.scrollbar::-webkit-scrollbar {
		height: 1.2rem;
	}
	.scrollbar::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 20px;
	}
	.scrollbar::-webkit-scrollbar-thumb {
		border-radius: 20px;
		background: rgb(34 197 94);
	}
	.scrollbar::-webkit-scrollbar-thumb:hover {
		background: #494500;
	}
</style>
