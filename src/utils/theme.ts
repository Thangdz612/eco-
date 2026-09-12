import { ThemeMode } from '../types';

export const THEME_STORAGE_KEY = 'eco_app_theme_mode';

/**
 * Detect current system/device preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Get saved theme mode (system, light, dark), defaulting to 'system'
 */
export function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (e) {
    // ignore
  }
  return 'system';
}

/**
 * Persist theme mode preference
 */
export function setStoredThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (e) {
    // ignore
  }
}

/**
 * Resolves active theme ('light' | 'dark') based on chosen mode and system state
 */
export function resolveActiveTheme(mode: ThemeMode, systemTheme: 'light' | 'dark'): 'light' | 'dark' {
  if (mode === 'system') {
    return systemTheme;
  }
  return mode;
}

/**
 * Apply 'dark' class to html element
 */
export function applyThemeClass(activeTheme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (activeTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
