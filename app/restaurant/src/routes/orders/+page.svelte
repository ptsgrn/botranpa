<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script>
	import OrderCard from '$lib/components/OrderCard.svelte';
	import { orders } from '$lib/stores/orders';
	$orders = [
		{
			orderID: 1,
			table: 1,
			isDone: false,
			time: new Date(),
			menu: [
				{
					name: 'เส้นเล็กต้มยำ',
					count: 1,
					options: [
						{
							name: 'ไข่',
							type: 'add'
						},
						{
							name: 'หมู',
							type: 'remove'
						}
					],
					note: 'หวานๆ'
				},
				{
					name: 'บะหมี่แห้งน้ำใส',
					count: 1,
					options: []
				}
			]
		},
		{
			orderID: 2,
			table: 1,
			isDone: false,
			time: new Date(),
			menu: [
				{
					name: 'เส้นเล็กต้มยำ',
					count: 1,
					options: [
						{
							name: 'ไข่',
							type: 'add'
						},
						{
							name: 'หมู',
							type: 'remove'
						}
					],
					note: 'หวานๆ'
				},
				{
					name: 'บะหมี่แห้งน้ำใส',
					count: 1,
					options: []
				}
			]
		},
		{
			orderID: 3,
			table: 1,
			isDone: false,
			time: new Date(),
			menu: [
				{
					name: 'เส้นเล็กต้มยำ',
					count: 1,
					options: [
						{
							name: 'ไข่',
							type: 'add'
						},
						{
							name: 'หมู',
							type: 'remove'
						}
					],
					note: 'หวานๆ'
				},
				{
					name: 'บะหมี่แห้งน้ำใส',
					count: 1,
					options: []
				}
			]
		},
		{
			orderID: 4,
			table: 1,
			isDone: false,
			time: new Date(),
			menu: [
				{
					name: 'เส้นเล็กต้มยำ',
					count: 1,
					options: [
						{
							name: 'ไข่',
							type: 'add'
						},
						{
							name: 'หมู',
							type: 'remove'
						}
					],
					note: 'หวานๆ'
				},
				{
					name: 'บะหมี่แห้งน้ำใส',
					count: 1,
					options: []
				}
			]
		},
		{
			orderID: 5,
			table: 1,
			isDone: false,
			time: new Date(),
			menu: [
				{
					name: 'เส้นเล็กต้มยำ',
					count: 1,
					options: [
						{
							name: 'ไข่',
							type: 'add'
						},
						{
							name: 'หมู',
							type: 'remove'
						}
					],
					note: 'หวานๆ'
				},
				{
					name: 'บะหมี่แห้งน้ำใส',
					count: 1,
					options: []
				}
			]
		}
	];
	$: $orders = $orders.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).sort((a, b)=> a.isDone? 1: -1);
</script>

<h1 class="text-2xl">รายการอาหารที่สั่ง</h1>
<div class="stats bg-gray-800 mt-5">
	<div class="stat">
		<div class="stat-title">เหลืออีก</div>
		<div class="stat-value text-primary">{$orders.filter(o=>!o.isDone).length}</div>
		<div class="stat-desc">ออเดอร์</div>
	</div>
</div>
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