import { writable } from 'svelte/store';

// Store: { [sectionId: string]: boolean }
export const visibilityStore = writable<Record<string, boolean>>({});

export function setSectionVisible(id: string) {
  visibilityStore.update(store => {
    if (!store[id]) {
      return { ...store, [id]: true };
    }
    return store;
  });
} 