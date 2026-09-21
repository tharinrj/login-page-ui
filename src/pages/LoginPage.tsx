import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import OrDivider from '../components/OrDivider';
import ShowcasePanel from '../components/ShowcasePanel';
import SocialButtons from '../components/SocialButtons';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signingIn, error, clearError } = useAuth();
  const [notice, setNotice] = useState<string | null>(null);

  const handleGoogle = async () => {
    const signedIn = await signInWithGoogle();
    if (signedIn) navigate('/token', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        gap: 2.5,
        p: { xs: 0, md: 2.5 },
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="main"
        sx={{
          flex: '1 1 48%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6 },
          py: { xs: 6, md: 4 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 352 }}>
          <Typography variant="h1" component="h1">
            Welcome back!
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3.5 }}>
            Simplify your workflow and boost your productivity with{' '}
            <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Tuga&rsquo;s App
            </Box>
            . Get started for free.
          </Typography>

          <LoginForm
            onValidSubmit={() =>
              setNotice(
                'Password sign-in is not connected yet.',
              )
            }
          />

          <OrDivider />

          <SocialButtons
            onGoogle={handleGoogle}
            loading={signingIn}
            onUnavailable={(provider) =>
              setNotice(`${provider} sign-in is not part of this build.`)
            }
          />

          <Typography
            variant="caption"
            component="p"
            align="center"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            Not a member?{' '}
            <Link href="#" sx={{ color: 'success.main', fontWeight: 500 }}>
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      <ShowcasePanel />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={clearError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={clearError}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={4000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={notice}
      />
    </Box>
  );
}
