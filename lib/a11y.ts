// Visitor accessibility settings: classes on <html>, remembered in localStorage.

export const A11Y_OPTIONS = [
  { key: "still", label: "עצירת אנימציות" },
  { key: "big", label: "הגדלת טקסט" },
  { key: "links", label: "הדגשת קישורים" },
] as const;

export type A11yKey = (typeof A11Y_OPTIONS)[number]["key"];
export type A11ySettings = Record<A11yKey, boolean>;

export const DEFAULT_SETTINGS: A11ySettings = { still: false, big: false, links: false };

const STORAGE_KEY = "a11y-settings";
const EVENT = "a11y-change";

// The settings as a JSON string, so useSyncExternalStore gets a stable snapshot.
// Kept in memory too, so the toggles still work when storage is blocked.
let current: string | null = null;

export function readSettingsRaw(): string {
  if (current === null) {
    try {
      current = localStorage.getItem(STORAGE_KEY) ?? "{}";
    } catch {
      current = "{}";
    }
  }
  return current;
}

export function parseSettings(raw: string): A11ySettings {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function applySettings(settings: A11ySettings) {
  for (const { key } of A11Y_OPTIONS) document.documentElement.classList.toggle(`a11y-${key}`, settings[key]);
}

export function saveSettings(settings: A11ySettings) {
  current = JSON.stringify(settings);
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {}
  applySettings(settings);
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeSettings(listener: () => void) {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
