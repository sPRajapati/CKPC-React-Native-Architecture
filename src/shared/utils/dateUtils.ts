export const formatDate = (
  date: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string => new Intl.DateTimeFormat(locale, options).format(new Date(date));

export const isToday = (date: Date | string | number): boolean => {
  const current = new Date();
  const target = new Date(date);
  return current.toDateString() === target.toDateString();
};
