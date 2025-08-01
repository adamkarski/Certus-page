import { writable } from 'svelte/store';

export const activePage = writable<string>('home');
// Store: { [sectionId: string]: boolean }
export const visibilityStore = writable<Record<string, boolean>>({});
export const windowWidth = writable<number>(0);
export const resetHeroSwiper = writable(false);
export const activeCategoryStore = writable(null);
export const activeMachineStore = writable(null);
export const expandedViewStore = writable(false);
export function setSectionVisible(id: string) {
  visibilityStore.update(store => {
    if (!store[id]) {
      return { ...store, [id]: true };
    }
    return store;
  });
} 