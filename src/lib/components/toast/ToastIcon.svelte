<script lang="ts">
	import Check from '../icon/Check.svelte';
	import Fire from '../icon/Fire.svelte';
	import Peace from '../icon/Peace.svelte';
	import Telegram from '../icon/Telegram.svelte';
	import Warning from '../icon/Warning.svelte';
	export let toastType = 'default';
	let toastTypes = [
		{ format: 'default', component: Telegram, style: 'color: rgb(115 115 115);' },
		{ format: 'brand', component: Peace, style: 'color: rgb(168 85 247);' },
		{ format: 'success', component: Check, style: 'color: rgb(34 197 94);' },
		{ format: 'warning', component: Warning, style: 'color: rgb(234 179 8);' },
		{ format: 'error', component: Fire, style: 'color: rgb(239 68 68);' }
	];
	let iconComponent = toastTypes.find((type) => type.format === toastType)?.component;
	let iconStyle = toastTypes.find((type) => type.format === toastType)?.style;
</script>

<svelte:component this={iconComponent} class="{iconStyle} h-6 w-6" />
