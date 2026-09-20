import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import illustration from '../assets/illustration.svg';
import { tokens } from '../theme/theme';

const COMPLETION = 84;

function ProgressRing() {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={40}
        thickness={4}
        sx={{ color: '#E4EFE2' }}
      />
      <CircularProgress
        variant="determinate"
        value={COMPLETION}
        size={40}
        thickness={4}
        sx={{ color: tokens.accent, position: 'absolute', left: 0 }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '0.5rem', fontWeight: 600 }}>
          {COMPLETION}%
        </Typography>
      </Box>
    </Box>
  );
}

function FloatingAvatar({
  initials,
  sx,
}: {
  initials: string;
  sx: object;
}) {
  return (
    <Avatar
      sx={{
        position: 'absolute',
        width: 50,
        height: 50,
        bgcolor: '#CFE6CB',
        color: tokens.graphite,
        fontSize: '0.875rem',
        fontWeight: 600,
        border: '4px solid #fff',
        ...sx,
      }}
    >
      {initials}
    </Avatar>
  );
}

export default function ShowcasePanel() {
  return (
    <Box
      aria-hidden
      sx={{
        display: { xs: 'none', md: 'flex' },
        flex: '1 1 52%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        bgcolor: tokens.panel,
        borderRadius: '24px',
        px: 5,
        py: 5,
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
        <Box
          component="img"
          src={illustration}
          alt=""
          sx={{ display: 'block', width: '100%' }}
        />

        <FloatingAvatar initials="AN" sx={{ top: '16%', left: '4%' }} />
        <FloatingAvatar initials="KV" sx={{ top: '46%', right: '4%' }} />

        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            left: '-5%',
            bottom: '-2%',
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 12px 28px rgba(20, 45, 25, 0.12)',
          }}
        >
          <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
            <Box>
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                Canva Design
              </Typography>
              <Typography
                sx={{ fontSize: '0.6875rem', color: 'text.secondary', mb: 1 }}
              >
                10 Task
              </Typography>
              <Chip
                label="Design"
                size="small"
                variant="outlined"
                sx={{
                  height: 22,
                  borderRadius: 99,
                  borderColor: tokens.line,
                  fontSize: '0.6875rem',
                }}
              />
            </Box>
            <ProgressRing />
          </Stack>
        </Paper>
      </Box>

      <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
        <Box sx={{ width: 6, height: 6, borderRadius: 99, bgcolor: '#BFD6BC' }} />
        <Box sx={{ width: 6, height: 6, borderRadius: 99, bgcolor: '#BFD6BC' }} />
        <Box sx={{ width: 20, height: 6, borderRadius: 99, bgcolor: tokens.graphite }} />
      </Stack>

      <Typography variant="h2" align="center" sx={{ maxWidth: 380 }}>
        Make your work easier and organized with{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          Tuga&rsquo;s App
        </Box>
      </Typography>
    </Box>
  );
}
