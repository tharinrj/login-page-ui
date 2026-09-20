import { useState, type FormEvent } from 'react';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {
  validateEmail,
  validatePassword,
  validateLogin,
  type LoginErrors,
} from '../utils/validation';

type Props = {
  /** Called once the form passes validation. No backend call is made. */
  onValidSubmit: () => void;
};

export default function LoginForm({ onValidSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const revalidate = (field: keyof LoginErrors, value: string) => {
    if (!touched[field]) return;
    const message =
      field === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  const handleBlur = (field: keyof LoginErrors, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const message =
      field === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    if (Object.keys(nextErrors).length === 0) onValidSubmit();
  };

  return (
    // noValidate hands validation to our own rules instead of the browser's.
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={1.5}>
        <TextField
          fullWidth
          type="email"
          name="email"
          placeholder="Username"
          autoComplete="username"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            revalidate('email', event.target.value);
          }}
          onBlur={(event) => handleBlur('email', event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          slotProps={{ htmlInput: { 'aria-label': 'Username' } }}
        />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            revalidate('password', event.target.value);
          }}
          onBlur={(event) => handleBlur('password', event.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          slotProps={{
            htmlInput: { 'aria-label': 'Password' },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? (
                      <Visibility fontSize="small" sx={{ color: 'text.secondary' }} />
                    ) : (
                      <VisibilityOff fontSize="small" sx={{ color: 'text.secondary' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
        <Link
          href="#"
          variant="caption"
          sx={{ color: 'text.primary', fontWeight: 500 }}
        >
          Forgot Password?
        </Link>
      </Box>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2.25 }}>
        Login
      </Button>
    </Box>
  );
}
