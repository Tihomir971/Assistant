import { writable, type Writable } from 'svelte/store';

type Toast = {
	id: string;
	title: string;
	message: string;
	type: string;
	timeout: number;
};
export const toasts: Writable<Toast[]> = writable([]);

export const addToast = (title: string, message: string, type: string, timeout = 3) => {
	console.log('timeout', timeout);

	function randomId(): string {
		return Array.from({ length: 9 }, () => Math.random().toString(36).charAt(2)).join('');
	}
	const id: string = randomId();

	toasts.update((currentToasts) => {
		return [...currentToasts, { id, title, message, type, timeout }];
	});

	setTimeout(() => removeToast(id), timeout * 1000);
};

export const removeToast = (id: string) => {
	toasts.update((currentToasts) => {
		return currentToasts.filter((toast) => toast.id !== id);
	});
};
