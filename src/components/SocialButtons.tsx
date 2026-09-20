import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';

const circle: SxProps<Theme> = {
  width: 46,
  height: 46,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': { bgcolor: '#1F1F1F' },
  '&.Mui-disabled': { bgcolor: '#3A3A3A', color: 'rgba(255,255,255,0.6)' },
};

type Props = {
  onGoogle: () => void;
  onUnavailable: (provider: string) => void;
  loading?: boolean;
};

export default function SocialButtons({
  onGoogle,
  onUnavailable,
  loading = false,
}: Props) {
  return (
    <Stack direction="row" spacing={1.75} sx={{ justifyContent: 'center' }}>
      <IconButton
        aria-label="Continue with Google"
        onClick={onGoogle}
        disabled={loading}
        sx={circle}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: 'inherit' }} />
        ) : (
          <GoogleIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton
        aria-label="Continue with Apple"
        onClick={() => onUnavailable('Apple')}
        sx={circle}
      >
        <AppleIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label="Continue with Facebook"
        onClick={() => onUnavailable('Facebook')}
        sx={circle}
      >
        <FacebookIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
