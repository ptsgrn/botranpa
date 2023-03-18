<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
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