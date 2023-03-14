<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<script lang="ts">
	import { availabilities } from '$lib/stores/availability';
	export let toggleCheck: () => void;
	export let checked: boolean = false;
	export let index: number = 0;
	export let group: string = '';
	export let name: string = '';
	export let type: string = '';
	function onToggle() {
		const newAvailabilities = $availabilities.map((a) => {
			if (a.type === type && a.group === group && a.name === name) {
				return { ...a, available: !a.available };
			}
			return a;
		});
		$availabilities = newAvailabilities;
		toggleCheck();
	}
</script>

<label class="label cursor-pointer justify-start gap-2" for={`checkbox-${group}-${index}`}>
	<input
		type="checkbox"
		id={`checkbox-${group}-${index}`}
		class="toggle toggle-primary"
		on:change={onToggle}
		bind:checked
	/>
	<span class="label-text">{name}</span>
</label>
