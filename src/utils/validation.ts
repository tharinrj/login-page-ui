/**
 * Form validation for the login page.
 *
 * Note on the "Username" field: the design labels it Username, but the brief
 * asks for email-format validation, so the value is validated as an email
 * address while keeping the placeholder from the design. See README.
 */

// Deliberately permissive: catches typos without rejecting valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 6;

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your username';
  if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address';
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Enter your password';
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
}

export type LoginFields = { email: string; password: string };
export type LoginErrors = Partial<Record<keyof LoginFields, string>>;

export function validateLogin(fields: LoginFields): LoginErrors {
  const errors: LoginErrors = {};
  const email = validateEmail(fields.email);
  const password = validatePassword(fields.password);
  if (email) errors.email = email;
  if (password) errors.password = password;
  return errors;
}
