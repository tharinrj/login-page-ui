import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import browsing from '../assets/browsing.svg';
import { tokens } from '../theme/theme';

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
          src={browsing}
          alt=""
          sx={{ display: 'block', width: '100%' }}
        />
      </Box>

      <Typography variant="h2" align="center" sx={{ maxWidth: 380 }}>
        Make your work easier and organized with{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          Tuga&rsquo;s App
        </Box>
      </Typography>
    </Box>
  );
}
