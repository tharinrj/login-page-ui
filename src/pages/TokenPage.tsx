import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../hooks/useAuth';

export default function TokenPage() {
  const navigate = useNavigate();
  const { accessToken, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h1" sx={{ fontSize: '1.5rem', mb: 2 }}>
        Access Token
      </Typography>

      <Box
        component="pre"
        sx={{
          p: 2,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          overflowX: 'auto',
          fontSize: '0.8rem',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
        }}
      >
        {accessToken ?? 'No token — sign in again.'}
      </Box>

      <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 3 }}>
        Sign out
      </Button>
    </Box>
  );
}
