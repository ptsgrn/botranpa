<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script lang="ts">
	import type { Menu } from '$lib/types';
	export let menuData: Menu = {
		name: '',
		count: 0,
		options: [],
	};

	export let menuIndex: number = 0;
	export let isDone: boolean = false;

	$: menuIndex = menuIndex <= 0 ? 1 : menuIndex;
</script>

<div class="order-[{menuIndex}] {isDone ? 'opacity-60': ''} border-b-2 border-gray-600 py-2 mb-2 relative font-serif">
	<span
		class="float-right pr-2 w-10 bg-green-500 inline-block text-black font-bold text-right translate-x-2 rounded-l-full font-mono"
		>x{menuData.count ?? 1}</span
	>
	<span class="font-semibold">{menuData.name}</span>
	<ul class="list-['-_'] list-outside ml-5 mt-2">
		{#each menuData.options.filter(({ type }) => type === 'remove') as option}
			<li>ไม่ใส่{option.name}</li>
		{/each}
	</ul>
	<ul class="list-['+_'] list-outside ml-5 mt-2">
		{#each menuData.options.filter(({ type }) => type === 'add') as option}
			<li>ใส่{option.name}</li>
		{/each}
  </ul>
</div>
