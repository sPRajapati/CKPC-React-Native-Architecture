const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{7,15}$/;

export const isValidEmail = (email: string): boolean => EMAIL_RE.test(email);
export const isValidPassword = (password: string): boolean => password.length >= 8;
export const isValidPhone = (phone: string): boolean => PHONE_RE.test(phone);
export const isRequired = (value: string): boolean => value.trim().length > 0;
export const minLength = (value: string, min: number): boolean => value.length >= min;
export const passwordsMatch = (password: string, confirm: string): boolean =>
  password === confirm;
