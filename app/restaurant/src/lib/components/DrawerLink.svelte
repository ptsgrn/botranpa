<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
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
