<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toasts, removeToast } from '../../store/toasts';
	import Cancel from '../icon/Cancel.svelte';
	import ToastIcon from './ToastIcon.svelte';
	import ToastProgress from './ToastProgress.svelte';
</script>

{#if $toasts}
	<div
		class="absolute top-4 right-1/2 z-30 flex w-full max-w-xs translate-x-1/2 flex-col-reverse gap-4 sm:top-8 sm:right-8 sm:translate-x-0"
	>
		{#each $toasts as { id, title, message, type } (id)}
			<div
				in:fade
				animate:flip={{ duration: 300 }}
				role="alert"
				style="position: relative; overflow: border-radius: 0.375rem;background-color: rgb(255 255 255);box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"
			>
				<div style="padding: 6px;">
					<div style="display: flex; justify-content: center">
						<ToastIcon toastType={type} />
						<div style="margin-left: 0.75rem;border-width: 1px; "class="ml-3 border-l border-neutral-200 pl-3 text-sm">
							<p class=" font-semibold text-neutral-900">{title}</p>
							<p class=" font-normal text-neutral-700">{message}</p>
						</div>
					</div>
					<button
						on:click={() => removeToast(id)}
						class="absolute top-2 right-2 rounded-full bg-white p-1 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
					>
						<Cancel class="text-neutral-900" /><span class="sr-only">Remove notification</span>
					</button>
				</div>
				<ToastProgress toastType={type} />
			</div>
		{/each}
	</div>
{/if}
