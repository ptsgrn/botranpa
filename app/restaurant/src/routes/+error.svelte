<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
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
