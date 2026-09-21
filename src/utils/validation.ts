const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FormErrors = { email?: string; password?: string };

export function validateForm(email: string, password: string): FormErrors {
  const errors: FormErrors = {};

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    errors.email = 'Enter your email';
  } else if (!EMAIL_RE.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Enter your password';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}
