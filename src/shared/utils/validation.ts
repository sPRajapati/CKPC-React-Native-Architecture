const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_RE.test(email);
export const isValidPassword = (password: string): boolean => password.length >= 8;
export const isRequired = (value: string): boolean => value.trim().length > 0;
