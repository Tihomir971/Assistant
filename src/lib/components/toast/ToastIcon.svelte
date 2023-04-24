<script>
	import Check from '../icon/Check.svelte';
	import Fire from '../icon/Fire.svelte';
	import Peace from '../icon/Peace.svelte';
	import Telegram from '../icon/Telegram.svelte';
	import Warning from '../icon/Warning.svelte';

	export let toastType = 'default';

	let toastTypes = [
		{ format: 'default', component: Telegram, style: 'color: #7E7E7E;' },
		{ format: 'brand', component: Peace, style: 'color: #653CAD;' },
		{ format: 'success', component: Check, style: 'color: #48bb78;' },
		{ format: 'warning', component: Warning, style: 'color: #E9B949;' },
		{ format: 'error', component: Fire, style: 'color: #BA2525;' }
	];

	let iconComponent = toastTypes.find((type) => type.format === toastType)?.component;

	let iconStyle = toastTypes.find((type) => type.format === toastType)?.style;
</script>

<svelte:component this={iconComponent} style="{iconStyle} height: 1.5rem; width: 1.5rem;" />
