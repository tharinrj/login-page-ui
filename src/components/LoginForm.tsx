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
import { validateForm, type FormErrors } from '../utils/validation';

type Props = {
  onValidSubmit: () => void;
};

export default function LoginForm({ onValidSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [blurred, setBlurred] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  // revalidate on change only after the field has been touched
  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    else setPassword(value);

    if (!blurred[field]) return;
    const next = validateForm(
      field === 'email' ? value : email,
      field === 'password' ? value : password,
    );
    setErrors(next);
  };

  const handleBlur = (field: 'email' | 'password') => {
    setBlurred((prev) => ({ ...prev, [field]: true }));
    setErrors(validateForm(email, password));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validateForm(email, password);
    setErrors(next);
    setBlurred({ email: true, password: true });
    if (!next.email && !next.password) onValidSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={1.5}>
        <TextField
          fullWidth
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={Boolean(errors.password)}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword
                      ? <Visibility fontSize="small" sx={{ color: 'text.secondary' }} />
                      : <VisibilityOff fontSize="small" sx={{ color: 'text.secondary' }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
        <Link href="#" variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Forgot Password?
        </Link>
      </Box>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2.25 }}>
        Login
      </Button>
    </Box>
  );
}
