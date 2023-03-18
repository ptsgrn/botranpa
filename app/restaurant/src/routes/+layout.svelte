<script>
	import '../app.postcss';
	import '@fontsource/ibm-plex-sans-thai';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/sarabun';
	let isDrawerOpen = false;
	import OpenPanelLeft from 'carbon-icons-svelte/lib/OpenPanelLeft.svelte';
	import DrawerLink from '$lib/components/DrawerLink.svelte';
	import Home from 'carbon-icons-svelte/lib/Home.svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
	import Link from 'carbon-icons-svelte/lib/Link.svelte';
	import OperationsRecord from 'carbon-icons-svelte/lib/OperationsRecord.svelte';
	import CollapseCategories from 'carbon-icons-svelte/lib/CollapseCategories.svelte';
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
				<a href="/" class="text-xl font-bold font-display"> BotRanPa:&nbsp;Restaurant </a>
			</div>
		</nav>
		<main class="p-4">
			<slot />
		</main>

		<footer class="footer p-10 bg-neutral text-neutral-content font-display">
			<div>
				<span class="footer-title">โครงการ</span>
				<a class="link link-hover" href="/about">เกี่ยวกับ</a>
				<a class="link link-hover flex gap-2" href="/about"
					>ซอร์สโค้ด <svg
						class="inline fill-gray-500"
						xmlns="http://www.w3.org/2000/svg"
						width="20px"
						height="20px"
						viewBox="0 0 32 32"
						><path
							d="M 8.382813 1.972656 L 4.078125 13.453125 L 3.835938 14.105469 L 1.796875 19.542969 L 16 29.875 L 30.203125 19.542969 L 28.164063 14.105469 L 23.613281 1.972656 L 19.882813 13.453125 L 12.117188 13.453125 Z M 8.25 8.027344 L 10.015625 13.453125 L 6.214844 13.453125 Z M 23.75 8.027344 L 25.785156 13.453125 L 21.984375 13.453125 Z M 5.464844 15.453125 L 10.664063 15.453125 L 14.09375 26.015625 L 4.203125 18.820313 Z M 12.765625 15.453125 L 19.234375 15.453125 L 16 25.402344 Z M 21.335938 15.453125 L 26.53125 15.453125 L 27.796875 18.820313 L 17.902344 26.015625 Z"
						/></svg
					></a
				>
			</div>
		</footer>
	</div>
	<div class="drawer-side">
		<label for="side-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-72 bg-base-100 shadow-md gap-2">
			<div class="text-xl font-bold p-4 font-display">บอตร้านป้า: ร้านอาหาร</div>
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
