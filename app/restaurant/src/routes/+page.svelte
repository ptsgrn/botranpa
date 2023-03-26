<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->
<script lang="ts">
	import DrawerLink from '$lib/components/DrawerLink.svelte';
	import {
		Home,
		CollapseCategories,
		OperationsRecord,
		Information,
		Book
	} from 'carbon-icons-svelte';
</script>

<svelte:head>
	<title>บอตร้านป้า</title>
</svelte:head>

<article class="">
	<h2 class="text-center font-display font-bold text-2xl">ลิงก์ด่วน</h2>
	<ul class="menu p-4 w-72 bg-base-100 shadow-md text-center gap-2">
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
		<DrawerLink href="/manual">
			<Book width="20" height="20" />
			คู่มือการใช้งาน
		</DrawerLink>
	</ul>
</article>
