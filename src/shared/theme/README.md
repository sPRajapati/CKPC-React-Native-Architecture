# theme

`ThemeProvider` holds light/dark mode (persisted via storage) and exposes
`useTheme()` → `{ theme, mode, isDark, setMode, toggleTheme }`. `Screen` and the
navigation container consume it.
