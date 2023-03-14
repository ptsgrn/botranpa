<script>
	import '../app.postcss';
	import "@fontsource/ibm-plex-sans-thai"
	import "@fontsource/ibm-plex-mono"
	import "@fontsource/sarabun"
	let isDrawerOpen = false;
	import OpenPanelLeft from 'carbon-icons-svelte/lib/OpenPanelLeft.svelte';
	import DrawerLink from '$lib/components/DrawerLink.svelte';
	import Home from 'carbon-icons-svelte/lib/Home.svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
	import Link from 'carbon-icons-svelte/lib/Link.svelte';
	import OperationsRecord from "carbon-icons-svelte/lib/OperationsRecord.svelte";
	import CollapseCategories from "carbon-icons-svelte/lib/CollapseCategories.svelte";
</script>

<div class="drawer" data-theme="botranpa">
	<input type="checkbox" id="side-drawer" class="drawer-toggle" bind:checked={isDrawerOpen} />
	<div class="drawer-content">
		<nav class="navbar border-b-2 border-b-gray-700 shadow-md">
			<div class="navbar-start flex gap-4">
				<div class="tooltip tooltip-right" data-tip="เปิดแผงนำทางด้านข้าง">
					<button
						class="btn btn-square btn-ghost bg-gray-800"
						on:click={() => {
							isDrawerOpen = !isDrawerOpen;
						}}
					>
						<OpenPanelLeft width="28" height="28" />
					</button>
				</div>
				<a href="/" class="text-xl font-bold">
					BotRanPa:&nbsp;Restaurant
				</a>
			</div>
		</nav>
		<main class="p-4">
			<slot />
		</main>
	</div>
	<div class="drawer-side">
		<label for="side-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-72 bg-base-100 shadow-md gap-2">
			<div class="text-xl font-bold p-4">บอตร้านป้า: ร้านอาหาร</div>
			<DrawerLink href="/">
				<Home width="20" height="20" /> หน้าหลัก
			</DrawerLink>
			<li class="menu-title">
				<span>ครัว</span>
			</li>
			<DrawerLink href="/orders">
				<CollapseCategories width="20" height="20" /> รายการสั่งอาหาร
			</DrawerLink>
			<DrawerLink href="/availability-setting">
				<OperationsRecord width="20" height="20" /> ตั้งค่าวัตถุดิบที่มีอยู่
			</DrawerLink>
			<li class="menu-title">
				<span>เกี่ยวกับ</span>
			</li>
			<DrawerLink href="/about">
				<Information width="20" height="20" /> เกี่ยวกับโครงการ
			</DrawerLink>
			<DrawerLink href="/contact">
				<Link width="20" height="20" />
				ติดต่อ
			</DrawerLink>
		</ul>
	</div>
</div>
