import { goto } from '$app/navigation';

export const updateSearchParams = (key: string, value: string) => {
	const searchParams = new URLSearchParams(document.location.search);
	searchParams.set(key, value);
	goto(`?${searchParams.toString()}`);
};
