<!-- 
  Copyright 2022 The Bot Ran Pa Team

  This software is licensed under the MIT License. See the LICENSE file at
  the root of the repository for more information.
 -->

<script>
	let isAlternate = false;
	function onKeyDown(event) {
    if (event.key === 'Alt') {
      event.preventDefault();
			isAlternate = true;
		}
    if (event.key === 'Escape') {
      event.preventDefault();
      isAlternate = false;
    }
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if isAlternate}
  <slot/>
{:else}
  <slot name="not-alt"/>
{/if}