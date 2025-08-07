import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Zmienna dev - ustaw na true żeby zawsze pokazywać landing
const dev = false;

// Funkcja do obsługi ciasteczek
function getCookie(name: string): string | null {
  if (!browser) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, hours: number): void {
  if (!browser) return;
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Sprawdź czy landing page był już pokazany
function wasLandingShown(): boolean {
  if (dev) return false; // W trybie dev zawsze pokazuj
  return getCookie('landingShown') === 'true';
}

// Utwórz store z początkową wartością
const createLandingStore = () => {
  const { subscribe, set, update } = writable(!wasLandingShown());

  return {
    subscribe,
    hide: () => {
      if (!dev) { // W trybie dev nie zapisuj ciasteczka
        setCookie('landingShown', 'true', 1); // 1 godzina
      }
      set(false);
    },
    reset: () => set(!wasLandingShown()), // dla testów
    show: () => set(true) // dodatkowa funkcja do pokazania
  };
};

export const landingVisible = createLandingStore();