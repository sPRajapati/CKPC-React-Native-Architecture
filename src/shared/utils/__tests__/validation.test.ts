import { isRequired, isValidEmail, isValidPassword } from '../validation';

describe('validation', () => {
  it('validates email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('validates password length', () => {
    expect(isValidPassword('Password123')).toBe(true);
    expect(isValidPassword('short')).toBe(false);
  });

  it('validates required', () => {
    expect(isRequired('  x ')).toBe(true);
    expect(isRequired('   ')).toBe(false);
  });
});
