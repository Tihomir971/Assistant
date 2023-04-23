import { writable, type Writable } from 'svelte/store';

type Toast = {
	id: string;
	title: string;
	message: string;
	type: string;
};
export const toasts: Writable<Toast[]> = writable([]);

export const addToast = (title: string, message: string, type: string) => {
	function randomId(): string {
		return Array.from({ length: 9 }, () => Math.random().toString(36).charAt(2)).join('');
	}
	const id: string = randomId();

	toasts.update((currentToasts) => {
		return [...currentToasts, { id, title, message, type }];
	});

	setTimeout(() => removeToast(id), 5000);
};

export const removeToast = (id: string) => {
	toasts.update((currentToasts) => {
		return currentToasts.filter((toast) => toast.id !== id);
	});
};
