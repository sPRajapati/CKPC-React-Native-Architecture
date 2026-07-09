export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
    error: string;
    white: string;
  };
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    primary: '#4C1D95',
    error: '#DC2626',
    white: '#FFFFFF',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#0B0B0F',
    surface: '#1F2937',
    text: '#F9FAFB',
    muted: '#9CA3AF',
    border: '#374151',
    primary: '#A78BFA',
    error: '#F87171',
    white: '#FFFFFF',
  },
};
