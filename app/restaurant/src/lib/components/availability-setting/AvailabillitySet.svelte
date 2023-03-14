<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script lang="ts">
  import type { AvailabilityEntry } from '$lib/types'
  import { availabilities } from '$lib/stores/availability'
  import Group from './Group.svelte';
  export let typeName = 'เมนู'

  $: groups = $availabilities.filter((a) => a.type === typeName).map(a=>a.group).filter((v, i, a) => a.indexOf(v) === i)
</script>
<h2 class="text-xl font-bold mt-5">{typeName}</h2>
<div class="columns-2 lg:columns-4 xl:columns-5">
	{#each groups as group}
    <Group type={typeName} {group} />
	{/each}
</div>
