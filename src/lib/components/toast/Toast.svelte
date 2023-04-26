<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toasts, removeToast } from '../../store/toasts';
	import Cancel from '../icon/Cancel.svelte';
	import ToastIcon from './ToastIcon.svelte';
	import ToastProgress from './ToastProgress.svelte';
</script>

{#if $toasts}
	<div class="toast-container">
		{#each $toasts as { id, title, message, type, timeout } (id)}
			<div in:fade animate:flip={{ duration: 300 }} role="alert" class="alert">
				<div class="alert-content">
					<div style="display: flex; align-items: center;">
						<ToastIcon toastType={type} />
						<div
							style="margin-left: 1rem; border-left: 1px solid #e2e8f0; padding-left: 1rem; font-size: 0.875rem;"
						>
							<p class="alert-title">{title}</p>
							<p class="alert-message">{message}</p>
						</div>
					</div>
					<button type="button" on:click={() => removeToast(id)} class="close-button">
						<Cancel /><span class="sr-only">Remove notification</span>
					</button>
				</div>
				<ToastProgress toastType={type} {timeout} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.toast-container {
		position: absolute;
		top: 3rem;
		right: 50%;
		z-index: 30;
		display: flex;
		width: 100%;
		max-width: 20rem;
		transform: translateX(50%);
		flex-direction: column-reverse;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.toast-container {
			top: 3rem;
			right: 2rem;
			transform: translateX(0);
		}
	}

	.alert {
		position: relative;
		overflow: hidden;
		border-radius: 0.375rem;
		background-color: #ffffff;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	.alert-content {
		padding: 1.5rem;
	}

	.alert-title {
		font-weight: 600;
		color: #1f2937; /* example neutral-900 color */
	}

	.alert-message {
		font-weight: 400;
		color: #475569; /* example neutral-700 color */
	}

	.close-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border-radius: 9999px;
		background-color: #ffffff;
		padding: 0.25rem;
		border: 0;
		line-height: 0px;
	}

	.close-button:hover {
		background-color: #e1e1e1; /* example neutral-100 color */
	}

	.close-button:focus-visible {
		background-color: #e1e1e1; /* example neutral-100 color */
		outline: 2px solid #222222; /* outline-neutral-900 with outline-2 */
		outline-offset: 2px;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
