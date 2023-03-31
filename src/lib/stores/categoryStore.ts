import { writable } from 'svelte/store';

interface UOM {
    id: number;
    uomsymbol: string | null;
    name: string;
  }

export const activeId = writable(4798);
export const UOMs = writable<UOM[]>([]);