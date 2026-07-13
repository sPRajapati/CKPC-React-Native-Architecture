export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US',
): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

export const formatNumber = (value: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale).format(value);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
