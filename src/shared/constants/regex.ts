export const Regex = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[0-9\s-]{7,15}$/,
  PASSWORD: /^.{8,}$/,
} as const;
