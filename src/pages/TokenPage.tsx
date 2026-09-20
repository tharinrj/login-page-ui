import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuth } from '../hooks/useAuth';

export default function TokenPage() {
  const navigate = useNavigate();
  const { user, accessToken, signOut } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!accessToken) return;
    await navigator.clipboard.writeText(accessToken);
    setCopied(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        px: 3,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 640,
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
          <Avatar src={user?.photoURL ?? undefined} alt="">
            {user?.displayName?.[0] ?? '?'}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600 }}>
              {user?.displayName ?? 'Signed in'}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Google OAuth access token
        </Typography>

        {accessToken ? (
          <Box
            component="code"
            sx={{
              display: 'block',
              p: 2,
              borderRadius: 2,
              bgcolor: '#F5F8F4',
              border: '1px solid',
              borderColor: 'divider',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: '0.75rem',
              lineHeight: 1.7,
              wordBreak: 'break-all',
            }}
          >
            {accessToken}
          </Box>
        ) : (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            The token is held for this browser tab only and was cleared on
            reload. Sign in again to get a fresh one.
          </Alert>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon fontSize="small" />}
            onClick={handleCopy}
            disabled={!accessToken}
          >
            Copy token
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message="Token copied"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
