import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { storageUtils } from '@/shared/storage';
import { darkTheme, lightTheme, type Theme, type ThemeMode } from './themes';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>('light');

  // Restore persisted mode on mount.
  useEffect(() => {
    storageUtils.getThemeMode().then((stored) => {
      if (stored === 'dark' || stored === 'light') setModeState(stored);
    });
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    storageUtils.saveThemeMode(next);
  }, []);

  const toggleTheme = useCallback(
    () => setMode(mode === 'dark' ? 'light' : 'dark'),
    [mode, setMode],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: mode === 'dark' ? darkTheme : lightTheme,
      mode,
      isDark: mode === 'dark',
      setMode,
      toggleTheme,
    }),
    [mode, setMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
