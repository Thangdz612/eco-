import { useState, useEffect } from 'react';
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

/**
 * Đồng bộ thanh trạng thái (Status Bar) trên thiết bị di động (Android / iOS) khi chạy APK Capacitor
 */
export async function applyNativeStatusBar(activeTheme: 'light' | 'dark'): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const isNative = Boolean((window as any).Capacitor?.isNativePlatform?.());
    if (isNative) {
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      const isDark = activeTheme === 'dark';
      await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
      const color = isDark ? '#0F172A' : '#0D47A1';
      await StatusBar.setBackgroundColor({ color });
    }
  } catch (err) {
    // Bọc try/catch, không làm hỏng khi chạy trên web hay iframe AI Studio
    console.warn('Native status bar sync notice:', err);
  }
}

/**
 * Hook trả về 'light' | 'dark' theo class `dark` trên <html>,
 * tự động cập nhật khi class thay đổi qua MutationObserver.
 */
export function useActiveTheme(): 'light' | 'dark' {
  const getTheme = (): 'light' | 'dark' => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    setTheme(getTheme());

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
