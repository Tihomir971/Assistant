import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface Notification {
	id: string;
	type: string;
	message: string;
	timeout: number;
}
export type ExtendedNotifications = ReturnType<typeof createNotificationStore> & {
	[Symbol.iterator](): Iterator<Notification>;
};

const TIMEOUT = 3000;

function createNotificationStore(timeout: number) {
	const _notifications: Writable<Notification[]> = writable([]);

	function send(message: string, type = 'default', timeout: number) {
		_notifications.update((state) => {
			return [...state, { id: id(), type, message, timeout }];
		});
	}

	// let timers: ReturnType<typeof setTimeout>[] = [];

	const notifications = derived(
		_notifications,
		($notifications: Notification[], set: (value: Notification[]) => void) => {
			set($notifications);
			if ($notifications.length > 0) {
				const timer = setTimeout(() => {
					_notifications.update((state) => {
						state.shift();
						return state;
					});
				}, $notifications[0].timeout);
				return () => {
					clearTimeout(timer);
				};
			}
		}
	);
	const { subscribe } = notifications;

	return {
		subscribe,
		send,
		default: (msg: string, timeout: number) => send(msg, 'default', timeout),
		danger: (msg: string, timeout: number) => send(msg, 'danger', timeout),
		warning: (msg: string, timeout: number) => send(msg, 'warning', timeout),
		info: (msg: string, timeout: number) => send(msg, 'info', timeout),
		success: (msg: string, timeout: number) => send(msg, 'success', timeout)
	};
}

function id(): string {
	return Array.from({ length: 9 }, () => Math.random().toString(36).charAt(2)).join('');
}

export const notifications = createNotificationStore(TIMEOUT);
