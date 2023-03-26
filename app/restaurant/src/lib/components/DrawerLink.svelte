<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script>
  import { page } from '$app/stores';
	export let href = '';
</script>

<li class="menu-item">
	<a {href} class="menu-link {
    $page.url.pathname === href ? 'active' : ''
  }"><slot /></a>
</li>
