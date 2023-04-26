<script lang="ts">
	export let toastType = 'default';
	export let timeout;

	function changeAnimationDuration(newDuration: string) {
		document.documentElement.style.setProperty('--animation-duration', `${newDuration}s`);
	}
	changeAnimationDuration(timeout.toString());

	let toastTypes = [
		{
			format: 'default',
			bgStyle: 'background-color: #CFCFCF;',
			barStyle: 'background-color: #7E7E7E;'
		},
		{
			format: 'brand',
			bgStyle: 'background-color: #A081D9;',
			barStyle: 'background-color: #653CAD;'
		},
		{
			format: 'success',
			bgStyle: 'background-color: #A3D9A5;',
			barStyle: 'background-color: #3F9142;'
		},
		{
			format: 'warning',
			bgStyle: 'background-color: #F8E3A3;',
			barStyle: 'background-color: #E9B949;'
		},
		{
			format: 'error',
			bgStyle: 'background-color: #F29B9B;',
			barStyle: 'background-color: #BA2525;'
		}
	];
	let bgStyle = toastTypes.find((type) => type.format === toastType)?.bgStyle;
	let barStyle = toastTypes.find((type) => type.format === toastType)?.barStyle;
</script>

<div style="{bgStyle} height: 0.25rem;">
	<div style="{barStyle} height: 0.25rem;" class="progress-animation" />
</div>

<style>
	:root {
		--animation-duration: 2s;
	}
	@keyframes progress {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	.progress-animation {
		animation: progress var(--animation-duration) linear forwards;
	}
</style>
