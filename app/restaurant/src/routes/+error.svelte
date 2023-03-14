<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script>
  import { page } from '$app/stores';
</script>

<h1 class="text-2xl text-primary">
  {$page.error?.message || 'Page not found'}
</h1>
{#if $page.error?.status === 404}
  <p class="prose font-serif mt-2">
    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
  </p>
{/if}
